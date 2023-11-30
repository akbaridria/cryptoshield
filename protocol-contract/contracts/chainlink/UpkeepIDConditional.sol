// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {LinkTokenInterface} from "./interfaces/LinkTokenInterface.sol";
import {AutomationRegistrarInterface} from "./interfaces/AutomationRegistrar.sol";
import "../types.sol";

contract UpkeepIDConditional {
    LinkTokenInterface public immutable i_link;
    AutomationRegistrarInterface public immutable i_registrar;
    mapping(address => uint256[]) public listUpkeep;

    constructor(
        LinkTokenInterface link,
        AutomationRegistrarInterface registrar
    ) {
        i_link = link;
        i_registrar = registrar;
    }

    function registerAndPredictID(
        Types.RegistrationParams memory params,
        address user
    ) public {
        i_link.approve(address(i_registrar), params.amount);
        uint256 upkeepID = i_registrar.registerUpkeep(params);
        if (upkeepID != 0) {
            listUpkeep[user].push(upkeepID);
        } else {
            revert("auto-approve disabled");
        }
    }
}
