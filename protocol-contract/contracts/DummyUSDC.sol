// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DummyUsdc is ERC20, ERC20Burnable, Ownable {
    constructor()
        ERC20("Dummy USDC", "dUSDC")
        Ownable(msg.sender)
    {
      _mint(msg.sender, 100000000 * 10 ** decimals());
    }

    function faucet(address to) public {
        _mint(to, 200 * 10 ** decimals());
    }
}
