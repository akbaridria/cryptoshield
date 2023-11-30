// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./AutomationCompatible.sol";
import "../ShieldHub.sol";
import "../FeedConsumer.sol";
import "../types.sol";

contract ContractTracker is AutomationCompatibleInterface {
    FeedConsumer feedConsumer;
    ShieldHub shieldHub;
    uint256 orderNumber;

    constructor(uint256 _orderNumber, address _feedConsumer) {
        orderNumber = _orderNumber;
        feedConsumer = FeedConsumer(_feedConsumer);
        shieldHub = ShieldHub(msg.sender);
    }

    function checkUpkeep(
      bytes calldata /* checkData */
    )
      external
      view
      override
      returns (bool upkeepNeeded, bytes memory /* performData */)
    {
      (, int price, ) = feedConsumer.getLatestRoundData();
      Types.Order memory order = shieldHub.getOrderByNumber(orderNumber);
      upkeepNeeded = (order.expireTime < block.timestamp || price <= order.strikePrice) && order.status == Types.StatusInsurance.ACTIVE;
    }

    function performUpkeep(bytes calldata /* performData */) external override {
      shieldHub.redeemInsurace(orderNumber);
    }
}
