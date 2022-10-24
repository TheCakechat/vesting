pragma solidity ^0.8.0;

import "./DesupTokenVesting.sol";

/**
 * @title MockTokenVesting
 * WARNING: use only for testing and debugging purpose
 */
contract MockDesupTokenVesting is DesupTokenVesting {
    constructor(address token_) DesupTokenVesting(token_) {}

    function movePublishedDateBack(uint256 timespan) public onlyOwner {
        published_date -= timespan;
    }
}
