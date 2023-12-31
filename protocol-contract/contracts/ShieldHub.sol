// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

import "./FeedConsumer.sol";
import "./types.sol";
import "./chainlink/ContractTracker.sol";
import "./chainlink/UpkeepIDConditional.sol";

contract ShieldHub is Ownable, ReentrancyGuard  {
  
  // variables
  IERC20 internal erc20;
  UpkeepIDConditional upKeep;

  uint256 public orderNumbers;
  uint256 public totalCurrentPremium;
  uint256 aMonth = 30 * 24 * 60 * 60;
  uint256 public totalUnrealizedCoverAmount;
  uint256 public totalClaimed;

  mapping(uint256 => Types.Order) public orderTracker;
  mapping(address => uint256[]) public userOrders; 
  mapping(string => address) public marketAddress;

  // modifiers
  modifier orderExist(uint256 order) {
    require(orderTracker[order].isExist);
    _;
  }

  // events
  event OrderCreated(address indexed policyHolder, Types.InsuranceType indexed iType, string indexed market, uint256 amountPremium);
  event Claimed(address indexed policyHolder, Types.InsuranceType indexed iType, string indexed market, uint256 amountCover);

  // constructor

  constructor(
    address dUsdc,
    address upkeep
  ) Ownable(msg.sender){
    erc20 = IERC20(dUsdc);
    upKeep = UpkeepIDConditional(upkeep);
  }

  // users functions
  function buyInsurance(
    string memory market,
    uint256 premium,
    uint256 iType,
    int strikePrice
  ) external nonReentrant() {
    // 1. validation
    require(premium > 0, "premiums should be higher than 0");
    require(erc20.balanceOf(msg.sender) >= premium);
    
    // 2. checking market
    FeedConsumer feedConsumer = FeedConsumer(marketAddress[market]);
    if(address(feedConsumer) == address(0)) {
      revert();
    }

    // 3. set order

    // 3.1 transfer premium
    erc20.transferFrom(msg.sender, address(this), premium);
    totalCurrentPremium += premium;

    // 3.2 get price
    (, int price, ) = feedConsumer.getLatestRoundData();
    uint256 cover = calculateCoverAmount(premium, uint256(strikePrice), uint256(price));

    if(cover > erc20.balanceOf(address(this)) - totalUnrealizedCoverAmount) {
      revert("max limit has achieved");
    }

    totalUnrealizedCoverAmount += cover;

    // 3.3 store order
    orderTracker[orderNumbers] = Types.Order({
      isExist: true,
      policyHolder: msg.sender,
      amount: premium,
      iType: Types.InsuranceType(iType),
      market: market,
      price: price,
      strikePrice: strikePrice,
      coverAmount: cover,
      expireTime: block.timestamp + aMonth,
      status: Types.StatusInsurance(0),
      orderNumber: orderNumbers
    });
    userOrders[msg.sender].push(orderNumbers);

    // 4. create automation
    ContractTracker contractTracker = new ContractTracker(orderNumbers, address(feedConsumer));

    Types.RegistrationParams memory params = Types.RegistrationParams({
      name: "automation",
      encryptedEmail: "",
      upkeepContract: address(contractTracker),
      gasLimit: 1000000,
      adminAddress: owner(),
      triggerType: 0,
      checkData: "",
      triggerConfig: "",
      offchainConfig: "",
      amount: 2 * 1e18
    });

    upKeep.registerAndPredictID(params, msg.sender);

    // 5. emit event
    orderNumbers++;
    emit OrderCreated(msg.sender, Types.InsuranceType(iType), market, premium);
  }

  function redeemInsurace(
    uint256 orderNumber
  ) external orderExist(orderNumber) {
    // 1. validation
    if(orderTracker[orderNumber].expireTime < block.timestamp) {
      orderTracker[orderNumber].status = Types.StatusInsurance(2);
      totalCurrentPremium = totalCurrentPremium - orderTracker[orderNumber].amount;
      totalUnrealizedCoverAmount = totalUnrealizedCoverAmount - orderTracker[orderNumber].coverAmount;
    }

    // 2. execute
    // 2.1 check price
    int price = checkPrice(orderTracker[orderNumber].market);
    if(price <= orderTracker[orderNumber].strikePrice && orderTracker[orderNumber].status == Types.StatusInsurance.ACTIVE) {
      // 2.2 if strike price is hit then transfer cover amount
      erc20.transfer(orderTracker[orderNumber].policyHolder, orderTracker[orderNumber].coverAmount);

      // 2.3 change status insurance
      orderTracker[orderNumber].status = Types.StatusInsurance(1);
      totalCurrentPremium = totalCurrentPremium - orderTracker[orderNumber].amount;
      totalUnrealizedCoverAmount = totalUnrealizedCoverAmount - orderTracker[orderNumber].coverAmount;
      totalClaimed += orderTracker[orderNumber].coverAmount;

      // 2.4 emit event
      emit Claimed(orderTracker[orderNumber].policyHolder, orderTracker[orderNumber].iType, orderTracker[orderNumber].market, orderTracker[orderNumber].coverAmount);
    }
  }

  function checkPrice(
    string memory market
  ) public view returns(int) {
    FeedConsumer feedConsumer = FeedConsumer(marketAddress[market]);
    if(address(feedConsumer) == address(0)) {
      revert("market not exist");
    }
    ( , int answer , ) = feedConsumer.getLatestRoundData();
    return answer;
  }

  // helper function
  function getUserFullInfo(
    address user
  ) external view returns (Types.Order[] memory) {
    Types.Order[] memory t = new Types.Order[](userOrders[user].length);
    for(uint256 i = 0; i < userOrders[user].length; i++) {
      t[i] = orderTracker[userOrders[user][i]];
    }
    return t;
  }

  function calculateCoverAmount(
    uint256 premium, 
    uint256 strikePrice,
    uint256 currentPrice
  ) public view returns (uint256) {
    return ((((currentPrice - strikePrice) * 100) / currentPrice) * premium) * 2;
  }

  function getLimitCover() public view returns (uint256) {
    return erc20.balanceOf(address(this)) - totalUnrealizedCoverAmount;
  }

  function getOrderByNumber(
    uint256 number
  ) public view returns (Types.Order memory) {
    return orderTracker[number];
  }

  // admin function
  function addMarket(
    string memory key,
    address source
  ) public onlyOwner {
    FeedConsumer oracle = new FeedConsumer(source);
    marketAddress[key] = address(oracle);
  }

  function removeMarket(
    string memory key
  ) public onlyOwner {
    address oracle = marketAddress[key];
    if(oracle == address(0)) {
      revert();
    }
    delete marketAddress[key];
  }

}