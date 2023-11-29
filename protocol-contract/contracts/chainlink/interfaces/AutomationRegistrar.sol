// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../../types.sol";

interface AutomationRegistrarInterface {
    function registerUpkeep(
        Types.RegistrationParams calldata requestParams
    ) external returns (uint256);
}