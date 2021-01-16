pragma solidity ^0.7.4;

import 'hardhat/console.sol';
import './interface/ERC2917.sol';

//import "@openzeppelin/contracts/access/Ownable.sol"; //https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

// this is base governance token with reward system
// very important to note that this is essentially all pseudocode as the other intefaces that will interat with this are not in place
contract IDEA is IERC2917 {
  /**
  TODO: 
  Setup rules for distrubtion of governance token
  Use Aave to setup a pool of collateral
  Give LP's token based on amount of collateral deposited
  */
  uint tokenSupply;

  struct UserInfo {
    uint tokenAmount;
    uint votingPower;
  }

  struct IdeaInfo {
    uint currentStake;
  }

  mapping(uint => IdeaInfo) public ideas;

  mapping(address => UserInfo ) public users;

  //get all ideas from the IdeaCreator
  /**
  so....the IDEA token is a governance token. IDEA token give holders a certain amount of voting power
   */
  //deposit collateral into IDEA token and mint certain number of IDEA tokens
  // very basic implementation that will change
  //probably user Aave deposit and withdraw functions
  function deposit(uint memory amount, address user) public {
      tokenSupply += amount;
      UserInfo storage userInfo = users[user];
      userInfo.tokenAmount += amount;
      userInfo.votingPower += amount;

  }

  function withdraw(uint memory amount, address user) public {
      tokenSupply -= amount;
      UserInfo storage userInfo = users[user];
      userInfo.tokenAmount -= amount;
      userInfo.votingPower -= amount;

  }


  //big part: staking. A holder stakes a certain amount of tokens to an idea
  function stakeToIdea(uint memory amount, address user, uint idea) public {
    IdeaInfo storage ideaInfo = ideas[idea];
    UserInfo storage userInfo = users[user];
    ideaInfo.currentStake += amount;
    userInfo.tokenAmount -= amount;
  }





}