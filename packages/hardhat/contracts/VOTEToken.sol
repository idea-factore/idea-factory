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
    event Transfer(address indexed from, address indexed to, uint256 value);

        mapping(address => uint256) balances;

    string public name = 'IdeaVoteToken';
    string public symbol = 'IVOTE';
    uint256 public decimals = 18;
    uint256 public tokenRate = 1000;
    uint256 public totalSupply_ = 100e24;

    constructor () public IIdeaToken() {
      totalSupply_ = 100e24;
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

    function transfer(address _to, uint256 _value) public returns (bool) {
      require(_value <= balances[msg.sender]);
      require(_to != address(0));
      balances[msg.sender] = balances[msg.sender].sub(_value);
      balances[_to] = balances[_to].add(_value);
      emit Transfer(msg.sender, _to, _value);
      return true;
   }

    function buyTokens(address _receiver, uint256 _amount) public  {
      require(_receiver != address(0));
      require(_amount > 0);
      transfer(_receiver, _amount);
   }
 
}