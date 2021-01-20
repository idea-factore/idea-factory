pragma solidity ^0.7.4;

import './interface/IPoolFactory.sol';

library CommonStructs {
      struct Idea {
        string name;
        string description;
        address owner;
    }
    struct ChildPool {
        address parentPool;
        string name;
        string description;
        mapping(address => Idea) ideas;
        address[] users;
        uint256 collateral;
        bool isSet;
    }

    struct Pool {
        address pool;
        string name;
        string description;
        mapping(address => Idea) ideas;
        mapping(address => ChildPool) childPools;
        address[] users;
        uint256 collateral;
        bool isParent;
    }

    struct User {
          address userAddress;
          mapping(address => uint256) collateralPerChildPool;
          mapping(address => uint256) collateralPerPool;
          uint256 TVL;
          bool exist;
     }
}

contract PoolCoordinator is IPoolFactory {
    


    mapping(address => CommonStructs.Pool) public mappedPools;

    address[] public existingPools;

    string _poolType;
    constructor() {
        
    }
    //calculate voting power for user in pool
    /**
    how voting and voting power works:
    For idea-factory, users deposit collateral into a pool using IDEA tokens, which gives them a certain amount of Governance tokens.
    Their voting power, however is based on their collateral locked in  versus TVL for that pool.

    We only calculate voting power when a user puts collateral into a pool, even if its not staked
    Probably make a seperate voting controller that would calculate voting power for a user

     */
    function getVotingPower(address votingPool, bool isChild) public returns(uint) {
        // this will have to change based on how they added collateral
        if(isChild) {
            for(uint i=0; i<=existingPools.length; i++) {
                CommonStructs.Pool storage parent = mappedPools[existingPools[i]];
                if(parent.childPools[votingPool].parentPool == parent.pool) {
                    //calculate voting power for all users only in child pool
                    //best practice for storing users?
                    //we probably don't want to store users at a pool level
                    //how do other projects calculate voting power for a user?
                }
            }
        } else {
            //calculate voting power for all users in parent and child mappedPools
        }
    }
    function createPool(string memory name, string memory description) public override returns(address) {
        CommonStructs.Pool storage newPool = mappedPools[address(this)];
        newPool.name = name;
        newPool.description = description;
        newPool.users.push(msg.sender);
        newPool.isParent = true;
        existingPools.push(address(this));
        //will address(this) always be different? or the same
        return address(this);
    }
    function updatePool(address pool) public {
        //update pool data across contracts
        //I guess we need one for childPool as well
        require(mappedPools[pool].isParent, "This pool is not deinfed");
        CommonStructs.Pool storage poolToUpdate = mappedPools[pool];
        //pass in data to update it with. Look up how to do this in solidity


    }
    function addIdeaToPool(address pool, address idea) public override returns(bool) {
        CommonStructs.Pool storage currentPool = mappedPools[pool];
        CommonStructs.Idea storage ideaToAdd = currentPool.ideas[idea];

        return true;
    }
    function createSubPool(string memory name, string memory description, address parentPool) public override returns(address) {
        CommonStructs.Pool storage parent = mappedPools[parentPool];

        CommonStructs.ChildPool storage child = parent.childPools[address(this)];
        child.name = name;
        child.description = description;
        child.parentPool = parentPool;
        child.users.push(msg.sender);
        child.isSet = true; 
        parent.users.push(msg.sender);
        return address(this); 
    }
    //amount is gov tokens, idea is idea duh
    function voteInPool(address ideaToVote, uint amount) public override returns(uint) {
        //call get voting power
    }

    function transferCollateral(address receiver, uint amount) public override returns(bool) {

    }

    function withdrawCollateral(address withdrawer, uint amount) public override returns(bool) {
        
    }


}