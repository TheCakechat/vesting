pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DesupToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Desup", "DSP") {
        _mint(msg.sender, initialSupply);
    }
}
