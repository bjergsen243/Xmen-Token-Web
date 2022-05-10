pragma solidity 0.8.0;

// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract XmenToken is ERC20, Ownable {
    uint256 constant _initial_supply = 10 * (10**18);
    uint256 faucetLimit;

    constructor() ERC20("XmenToken", "XM") {
        setFaucetLimit(100 * (10**18));
        _mint(msg.sender, _initial_supply);
    }

    function setFaucetLimit(uint256 _limit) public onlyOwner {
        faucetLimit = _limit;
    }

    function mint(uint256 _amount) public onlyOwner {
        require(balanceOf(msg.sender) + _amount < faucetLimit, "Loi o day");

        _mint(msg.sender, _amount);
    }

    function burn(uint256 _amount) external {
        _burn(msg.sender, _amount);
    }
}
