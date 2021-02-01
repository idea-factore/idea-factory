pragma solidity ^0.6.0;

import './interface/IIdeaToken.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@uma/core/contracts/financial-templates/common/SyntheticToken.sol';
import '@uma/core/contracts/financial-templates/common/TokenFactory.sol';
import '@uma/core/contracts/financial-templates/expiring-multiparty/PricelessPositionManager.sol';
import '@uma/core/contracts/financial-templates/common/WETH9.sol';

//import "@openzeppelin/contracts/access/Ownable.sol"; //https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

//Implemnt AAVE/ENS potentially chainlink and UMA as well

contract VOTEToken is IIdeaToken {
    using SafeMath for uint256;

    string public name = 'IdeaVoteToken';
    string public symbol = 'IVOTE';
    address public owner;
    uint256 public decimals = 18;
    uint256 public tokenRate = 1000;
    

    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
    event Transfer(address indexed from, address indexed to, uint tokens);
    mapping(address => uint256) balances;
    mapping(address => mapping (address => uint256)) allowed;
    uint256 totalSupply_;

    
    constructor(uint256 total) public {
      totalSupply_ = total;
      owner = msg.sender;
      balances[msg.sender] = totalSupply_;
    }

    //super basic tokenExpandedERC20(tokenName, tokenSymbol, tokenDecimals) nonReentrant() 
    event DepositedToPool(address pool, uint oldAmount, uint newAmount);


    //mint governance tokens based on liqudity provided to pool
    function mintGovernanceTokens(address sender, uint liquidity, address pool) external override returns(uint) {}

    //add liqudity to pool
    function depositToPool(address pool, uint amount) external override {}

    /**
    When a user votes on an idea, a corresponding amount of IdeaTokens are deposited to AAVE lending pool and borrowed by the idea
    This collateral earns interest which is stored and split among LPs, idea creators, contributors
    This way we use AAVE liquidation protocol stuff to handle all that
     */

    //should have permissions on this as this should only be called by the Pool
    function depositCollateral(address receiver, uint amount) external override returns(bool) {}

    function withdrawCollateral(address withdrawer, uint amount) external override returns(address, uint) {}

    function totalSupply() public view returns (uint256) {
      return totalSupply_;
    }

    function balanceOf(address tokenOwner) public view returns (uint256) {
        return balances[tokenOwner];
    }
    function transfer(address receiver, uint256 numTokens) public returns (bool) {
        require(numTokens <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender].sub(numTokens);
        balances[receiver] = balances[receiver].add(numTokens);
        emit Transfer(msg.sender, receiver, numTokens);
        return true;
    }
    function approve(address delegate, uint256 numTokens) public returns (bool) {
        allowed[msg.sender][delegate] = numTokens;
        emit Approval(msg.sender, delegate, numTokens);
        return true;
    }
    function allowance(address owner, address delegate) public  view returns (uint) {
        return allowed[owner][delegate];
    }
    function transferFrom(address owner, address buyer, uint256 numTokens) public returns (bool) {
        require(numTokens <= balances[owner]);
        require(numTokens <= allowed[owner][msg.sender]);
        balances[owner] = balances[owner].sub(numTokens);
        allowed[owner][msg.sender] = allowed[owner][msg.sender].sub(numTokens);
        balances[buyer] = balances[buyer].add(numTokens);
        emit Transfer(owner, buyer, numTokens);
        return true;
    }

 
}