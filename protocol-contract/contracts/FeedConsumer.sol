// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./chainlink/interfaces/AggregatorV3Interface.sol";

contract FeedConsumer {
  AggregatorV3Interface internal dataFeed;

  constructor(
    address source
  ) {
    dataFeed = AggregatorV3Interface(source);
  }

  function getLatestRoundData() public view returns (uint80, int, uint) {
    (
      uint80 roundID,
      int answer,
      /*uint startedAt*/,
      uint timeStamp,
      /*uint80 answeredInRound*/
    ) = dataFeed.latestRoundData();

    return (roundID, answer, timeStamp);
  }

  function getPrevRound(
    uint80 round
  ) public view returns (uint80, int, uint) {
    (
      uint80 roundID,
      int answer,
      /*uint startedAt*/,
      uint timeStamp,
      /*uint80 answeredInRound*/
    ) = dataFeed.getRoundData(round);

    return (roundID, answer, timeStamp);
  }
}