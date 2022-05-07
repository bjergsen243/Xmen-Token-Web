pragma solidity 0.8.0;

// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract XmenToken is ERC20 {
    uint256 constant _initial_supply = 100 * (10**18);

    constructor() ERC20("XmenToken", "XM") {
        _mint(msg.sender, _initial_supply);
    }
}
