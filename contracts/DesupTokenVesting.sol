pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "hardhat/console.sol";

import "./DesupToken.sol";

contract DesupTokenVesting is Ownable, ReentrancyGuard {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    struct Holder {
        uint256 total_amount;
        uint256 withdrawed_amount;
        HOLDERTYPE role;
    }

    struct VestingSchedule {
        uint256 duration;
        uint256 init_percentage;
    }

    enum HOLDERTYPE {
        INVESTOR, // 0
        PUBLIC, // 1
        TEAM_ADVISOR // 2
    }

    address private master;

    AggregatorV3Interface internal priceFeed;

    // address of the Desup(ERC20) token
    IERC20 private immutable _token;
    IERC20 public immutable TokenUSDT;

    bool public token_published;
    uint256 public published_date;

    uint16 public token_price_for_seedA;
    uint16 public token_price_for_public;
    uint8 public price_decimal;

    mapping(HOLDERTYPE => VestingSchedule) public vesting_schedules;

    mapping(address => Holder) public holders;

    address[] public holder_lists;

    event PublishToken(uint256 published_epoch);
    event SetTokenPriceForSeedA(uint16 price);
    // event SetMinSeedATokenPrice(uint256 min_price);
    event SetTokenPriceForPublic(uint16 price);
    event SetPriceDecimal(uint16 decimal);
    event SetVestingSchedule(
        HOLDERTYPE role,
        uint256 _duration,
        uint256 _percentage
    );
    event InvestWithEther(address investor, uint256 amount);
    event InvestWithUSDT(address investor, uint256 amount);
    event Withdraw(address holder, uint256 amount);

    /**
     * @dev Creates a vesting contract.
     * @param token_ address of the Desup(ERC20) token contract
     */
    constructor(address token_) {
        require(token_ != address(0x0));

        token_published = false;
        _token = DesupToken(token_);
        TokenUSDT = IERC20(0xdAC17F958D2ee523a2206206994597C13D831ec7);

        priceFeed = AggregatorV3Interface(
            0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e
        );

        price_decimal = 6;
        token_price_for_seedA = 2250; // $0.00225
        token_price_for_public = 6000; // $0.00600

        master = msg.sender;
    }

    /**
     * @dev Set our desup token status to PUBLISHED
     * admin should trigger this function after he publish Desup Token
     * After this function get triggered, vesting will be started
     */
    function publishToken() public onlyOwner {
        published_date = block.timestamp;
        token_published = true;

        emit PublishToken(block.timestamp);
    }

    function setTokenPriceForSeedA(uint16 price) public onlyOwner {
        token_price_for_seedA = price;

        emit SetTokenPriceForSeedA(price);
    }

    // function setMinSeedATokenPrice(uint256 min_price) public onlyOwner {
    //     seedA_token_price_min = min_price;

    //     emit SetMinSeedATokenPrice(min_price);
    // }

    function setTokenPriceForPublic(uint16 price) public onlyOwner {
        token_price_for_public = price;

        emit SetTokenPriceForPublic(price);
    }

    /**
     * @dev Set Desup token price decimal
     * @param decimal decimal for desup token
     */
    function setPriceDecimal(uint8 decimal) public onlyOwner {
        price_decimal = decimal;

        emit SetPriceDecimal(decimal);
    }

    /**
     * @dev Transfer all money to master's address
     * Ony admin can trigger this function
     */
    function harvestAll() public onlyOwner {
        (bool success, ) = master.call{value: address(this).balance}("");
        require(success, "Transfer failed!");
    }

    /**
     * @dev Invest to our Desup Token
     * Buy our desup token with Ether
     */
    function investWithEther() public payable {
        bool isHolder = isInHolderlists(msg.sender);

        holders[msg.sender].total_amount += getDesupTokenAmount(
            msg.value,
            token_price_for_seedA
        );
        if (!isHolder) {
            holder_lists.push(msg.sender);
            holders[msg.sender].role = HOLDERTYPE.INVESTOR;
        }

        emit InvestWithEther(
            msg.sender,
            getDesupTokenAmount(msg.value, token_price_for_seedA)
        );
    }

    /**
     * @dev Buy our desup token with USDT
     */
    function investWithUSDT(uint256 amount) public {
        bool success = TokenUSDT.transferFrom(
            msg.sender,
            master,
            amount.mul(10**6)
        );
        require(
            success == true,
            "You should approve first before buy Desup Tokens"
        );

        bool isHolder = isInHolderlists(msg.sender);
        holders[msg.sender].total_amount += amount / token_price_for_seedA;

        if (!isHolder) {
            holder_lists.push(msg.sender);
            holders[msg.sender].role = HOLDERTYPE.INVESTOR;
        }

        emit InvestWithUSDT(msg.sender, amount / token_price_for_seedA);
    }

    /**
     * @dev Withdraw Desup tokens
     * @param amount to withdraw, it should be less than withdrawable amount
     */
    function withdraw(uint256 amount) public {
        bool isHolder = isInHolderlists(msg.sender);
        require(isHolder, "Only holders can withdraw");

        uint256 withdrawable_amount = getWithdrawableAmount(msg.sender);

        require(amount <= withdrawable_amount, "Withdraw limitation");

        _token.transferFrom(master, msg.sender, amount.mul(10**18));

        holders[msg.sender].withdrawed_amount += amount;

        emit Withdraw(msg.sender, amount);
    }

    /**
     * @dev Set Vesting Schedules
     * @param role holder type => 0: INVESTOR, 1: PUBLIC
     * @param _duration lock duration by timestamp
     * @param _percentage initial percentage at TGE
     */
    function setVestingSchedule(
        HOLDERTYPE role,
        uint256 _duration,
        uint256 _percentage
    ) public onlyOwner {
        require(msg.sender == master, "Only admin can set the schedule");

        vesting_schedules[role] = VestingSchedule(_duration, _percentage);

        emit SetVestingSchedule(role, _duration, _percentage);
    }

    /**
     * @dev Total amount of desup token bought by holders
     */
    function getTotalMintedDesupTokenAmount() public view returns (uint256) {
        uint256 total_amount = 0;
        for (uint32 i = 0; i < holder_lists.length; i++) {
            total_amount += holders[holder_lists[i]].total_amount;
        }

        return total_amount;
    }

    function getVestingSchedule(HOLDERTYPE role)
        public
        view
        returns (VestingSchedule memory)
    {
        return vesting_schedules[role];
    }

    function isInHolderlists(address holder) public view returns (bool) {
        bool exist = false;
        for (uint256 i = 0; i < holder_lists.length; i++) {
            if (holder_lists[i] == holder) {
                exist = true;
                break;
            }
        }
        return exist;
    }

    /**
     * @dev Get the latest price of ETH
     */
    function getLatestPrice() public view returns (uint256) {
        (
            ,
            /*uint80 roundID*/
            int256 price, /*uint startedAt*/ /*uint timeStamp*/ /*uint80 answeredInRound*/
            ,
            ,

        ) = priceFeed.latestRoundData();
        return uint256(price);
    }

    function getUSDFromEther(uint256 amount) public view returns (uint256) {
        return (getLatestPrice().mul(amount)).div(10**18);
    }

    /**
     * @dev Get desup token amount from ETH
     * @param amount ETH amount by wei
     * @param token_price desup token price for round
     */
    function getDesupTokenAmount(uint256 amount, uint16 token_price)
        public
        view
        returns (uint256)
    {
        return (
            getUSDFromEther(amount).div(token_price).div(
                10**(8 - price_decimal)
            )
        ); // 8 : ether price decimal offset
    }

    /**
     * @dev Get total desup token amount of holder
     * @param holder_address token holder's address
     */
    function getTotalAmount(address holder_address)
        public
        view
        returns (uint256)
    {
        return holders[holder_address].total_amount;
    }

    /**
     * @dev Get allowed desup token amount of holder # based on TGE and vesting schedule
     * @param holder_address token holder's address
     */
    function getAllowedAmount(address holder_address)
        public
        view
        returns (uint256)
    {
        require(token_published, "Token is not published yet");
        require(vsDefined(holder_address), "Vesting Schedule is not set yet");

        uint256 passed_time = block.timestamp - published_date;
        if (
            passed_time >=
            vesting_schedules[holders[holder_address].role].duration
        ) {
            return holders[holder_address].total_amount;
        }

        uint256 allowed_percentage = vesting_schedules[
            holders[holder_address].role
        ].init_percentage +
            ((100 -
                vesting_schedules[holders[holder_address].role]
                    .init_percentage) * passed_time).div(
                    vesting_schedules[holders[holder_address].role].duration
                );
        uint256 allowed_amount = (holders[holder_address].total_amount *
            allowed_percentage).div(100);
        return allowed_amount;
    }

    /**
     * @dev Get withdrawable desup token amount of holder # allowed amount - withdrawed amount
     * @param holder_address token holder's address
     */
    function getWithdrawableAmount(address holder_address)
        public
        view
        returns (uint256)
    {
        require(token_published, "Token is not published yet");
        require(vsDefined(holder_address), "Vesting Schedule is not set yet");

        uint256 allowed_amount = getAllowedAmount(holder_address);
        return allowed_amount - holders[holder_address].withdrawed_amount;
    }

    /**
     * @dev Get withdrawed amount of token holder
     * @param holder_address token holder's address
     */
    function getWithdrawedAmount(address holder_address)
        public
        view
        returns (uint256)
    {
        require(isInHolderlists(holder_address), "Not a token holder");
        return holders[holder_address].withdrawed_amount;
    }

    // Private Functions

    function vsDefined(address holder_address) private view returns (bool) {
        if (
            vesting_schedules[holders[holder_address].role].duration != 0 ||
            vesting_schedules[holders[holder_address].role].init_percentage != 0
        ) {
            return true;
        }
        return false;
    }

    function getHolderRole(address holder_address)
        private
        view
        returns (HOLDERTYPE)
    {
        return holders[holder_address].role;
    }
}
