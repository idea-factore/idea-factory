pragma solidity ^0.7.4;

import 'hardhat/console.sol';
import './interface/ERC2917.sol';

//import "@openzeppelin/contracts/access/Ownable.sol"; //https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

// this is base governance token with reward system
// very important to note that this is essentially all pseudocode as the other intefaces that will interat with this are not in place

//this "works". you can add an idea, stake to an idea, deposit "tokens", withdraw "tokens"


struct Idea {
  string name;
  string description;
  uint stakedAmount;
  address creator;
}
contract IdeaInfo {
  mapping(address => Idea ) public ideas; 

  function addIdea(address creator, string memory name, string memory description) public returns(address newIdea){
      Idea storage idea = ideas[address(this)];
      idea.creator = creator;
      idea.name = name;
      idea.description = description;
      return address(this);
  }
  
  function stake(uint amount) public {
    ideas[address(this)].stakedAmount += amount;
  }
  // implement staking function in the idea itself? Or in the IDEA token/user contract
  // if we implement staking here, then we don't have any knowledge of who did the stak 

}
//TODO implement IERC2917 here. Think about how productivity is calculated. We could change productivity to be the amount of work done on an idea?
//TODO think about a wallet contract? Or how to mimic a wallet
//Since productivity should increase/decrease everytime a user stakes or liqudates an IDEA token.
//THe reason for this is that we want to encourage staking tokens to ideas. 
//Implemnt AAVE/ENS potentially chainlink and UMA as well
contract IDEA is IERC2917 {

  uint tokenSupply;

  struct UserInfo {
    uint tokenAmount;
    uint votingPower;
  }

  mapping(address => UserInfo ) public users;

  //get all ideas from the IdeaCreator
  /**
  so....the IDEA token is a governance token. IDEA token give holders a certain amount of voting power
   */
    /**
  TODO: 
  Setup rules for distrubtion of governance token
  Use Aave to setup a pool of collateral
  Give LP's token based on amount of collateral deposited
  */
  //deposit collateral into IDEA token and mint certain number of IDEA tokens
  // very basic implementation that will change
  //probably user Aave deposit and withdraw functions
  // anything that needs to know a user can just use msg.sender
  function deposit(uint amount, address user) public {
      tokenSupply += amount;
      UserInfo storage userInfo = users[user];
      userInfo.tokenAmount += amount;
      userInfo.votingPower += amount;

  }

  function withdraw(uint amount, address user) public {
      tokenSupply -= amount;
      UserInfo storage userInfo = users[user];
      userInfo.tokenAmount -= amount;
      userInfo.votingPower -= amount;

  }


  //big part: staking. A holder stakes a certain amount of tokens to an idea
  //TODO: Instead of staking directly to an idea, an IDEA holder instead stakes to a pool which is then staked to an idea, I think
  function stakeToIdea(uint amount, address user, address idea) public {
    IdeaInfo currentIdea = IdeaInfo(idea);
    currentIdea.stake(amount);
    UserInfo storage userInfo = users[user];
    userInfo.tokenAmount -= amount;
  }





}