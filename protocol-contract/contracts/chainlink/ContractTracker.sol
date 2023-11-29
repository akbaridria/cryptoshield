// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./AutomationCompatible.sol";
import "../ShieldHub.sol";
import "../FeedConsumer.sol";
import "../types.sol";

contract ContractTracker is AutomationCompatibleInterface {
    Types.Order order;
    FeedConsumer feedConsumer;
    ShieldHub shieldHub;

    constructor(Types.Order memory _order, address _feedConsumer) {
        order = _order;
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

      upkeepNeeded = order.expireTime > block.timestamp || price <= order.strikePrice;
    }

    function performUpkeep(bytes calldata /* performData */) external override {
      shieldHub.redeemInsurace(order.orderNumber);
    }
}
