pragma solidity ^0.7.4;

import './interface/IIdeaToken.sol';
import './Funder.sol';
import './PoolCoordinator.sol'

//import "@openzeppelin/contracts/access/Ownable.sol"; //https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

//TODO implement IERC2917 here. Think about how productivity is calculated. We could change productivity to be the amount of work done on an idea?
//TODO think about a wallet contract? Or how to mimic a wallet
//Since productivity should increase/decrease everytime a user stakes or liqudates an IDEA token.
//THe reason for this is that we want to encourage staking tokens to ideas. 
//Implemnt AAVE/ENS potentially chainlink and UMA as well
contract IDEA is IIdeaToken {
 //Once we deploy PoolCoordinator contract, we will just use deployed version.
 //For now we'll just make a new PoolCoordinator;
  address funderAddress;

  function mintGovernanceToken(address sender, uint liquidity, address pool) internal returns(uint) {

  }

  function depositToPool(address pool, uint256 amount) public override{
    Funder funds = Funder(funderAddress);
    CommonStructs.User user = funds.users[msg.sender];
    require(user.exists, "No user found. Please deposit collateral");
    funds.depositToPool(pool, amount, msg.sender);
  }

  function depositCollateral(address receiver, uint256 amount) public override returns(bool) {
    //mint IDEA token

    //add IDEA token to user funds

    //mint governance tokens based on collateral deposited
    
  }


  






}