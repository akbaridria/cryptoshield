// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {LinkTokenInterface} from "./interfaces/LinkTokenInterface.sol";
import {AutomationRegistrarInterface} from "./interfaces/AutomationRegistrar.sol";
import "../types.sol";

/**
 * string name = "test upkeep";
 * bytes encryptedEmail = 0x;
 * address upkeepContract = 0x...;
 * uint32 gasLimit = 500000;
 * address adminAddress = 0x....;
 * uint8 triggerType = 0;
 * bytes checkData = 0x;
 * bytes triggerConfig = 0x;
 * bytes offchainConfig = 0x;
 * uint96 amount = 1000000000000000000;
 */

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
