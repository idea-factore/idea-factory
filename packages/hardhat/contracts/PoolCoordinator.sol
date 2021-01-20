pragma solidity ^0.7.4;

import './interface/IPoolFactory.sol';

contract PoolCoordinator is IPoolFactory {
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
        uint collateral;
    }

    struct Pool {
        address pool;
        string name;
        string description;
        mapping(address => Idea) ideas;
        mapping(address => ChildPool) childPools;
        uint collateral;
    }
    mapping(address => Pool) pools;

    address[] exsistingPools;

    string _poolType;
    constructor(string memory poolType) {
        _poolType = poolType;
    }
    //calculate voting power for user in pool
    /**
    how voting and voting power works:
    For idea-factory, users deposit collateral into a pool using IDEA tokens, which gives them a certain amount of Governance tokens for that pool
    The governance token value is based on the TVL across the whole protocol but im not certain how. See below for why
    For each idea, you can use governance tokens to stake an idea with a certain amount of collateral
    For example, lets say the TVL is 200 dollars and the number of users that have locked in is 4. The governance token value will be 50 dollars using tvl/users
    So lets say that user A has locked in 100 dollars, user b and c have locked in 25 dollars, and user d has locked in 50 dollars.
    this will give user A 2 GOV tokens, user b and c 0.5 gov tokens and user d 1 gov token
    Lets assume that there are two ideas to vote on, idea a and idea b
    User a uses 1.5 gov tokens on idea a, and .5 on b. 
    User b uses 0.5 on idea a and user c uses 0.5 on idea b.
    User d users 1 gov token on idea a.

    So, to recap:

    1 gov token = 50 dollars
    idea a has 3 gov tokens staked
    idea b has 1 gov token staked

    So the amount of funds available to idea a is 150
    and idea b has 50
    Now lets say that user e puts in 100 dollars to the pool.
    so now tvl is 300 dollar
    so now we recalculate how much the votes are worths.
    Important that we still want user a to have 2 gov, user b to have 0.5 gov and user d to have 1 gov.
    So now gov token based on tvl/users is 60. So user a has 120 , b and d have 30 and d has 60.
    user e has 1.666667 gov which is 100 dollars.
    So for user a, b, c, and d we take the difference between inital and new and put that in wallet, with the rest still staked?
    So we say that user a, b, c, and d have the same amount locked in, and we subtract the difference in gov tokens and add to wallet.
    So user a still has 100 staked with 20 in wallet (so 1.66667 staked and 2-1.66667 in wallet)
    and so on. I think.

    We only calculate voting power when a puts collateral into a pool, even if its not staked

     */
    function getVotingPower(address pool, bool isChild) public returns(uint) {
        // this will have to change based on how they added collateral
        if(isChild) {
            for(uint i=0; i<=exsistingPools.length; i++) {
                Pool storage parent = pools[exsistingPools[i]];
                if(parent.childPools[pool].parentPool == parent.pool) {
                    //calculate voting power for all users only in child pool
                }
            }
        } else {
            //calculate voting power for all users in parent and child pools
        }
    }
    function createPool(string memory name, string memory description) public override returns(address) {
        Pool storage newPool = pools[address(this)];
        newPool.name = name;
        newPool.description = description;
        exsistingPools.push(address(this));
        //will address(this) always be different? or the same
        return address(this);
    }

    function addIdeaToPool(address pool, address idea) public override returns(bool) {
        Pool storage currentPool = pools[pool];
        Idea storage ideaToAdd = currentPool.ideas[idea];

        return true;
    }
    function createSubPool(string memory name, string memory description, address parentPool) public override returns(address) {
        Pool storage parent = pools[parentPool];

        ChildPool storage pool = parent.childPools[address(this)];
        pool.name = name;
        pool.description = description;
        pool.parentPool = parentPool;
        return address(this); 
    }
    //amount is gov tokens, idea is idea duh
    function voteInPool(address idea, uint amount) public override returns(uint) {
        //call get voting power
    }

    function transferCollateral(address receiver, uint amount) public override returns(bool) {

    }

    function withdrawCollateral(address withdrawer, uint amount) public override returns(bool) {
        
    }


}