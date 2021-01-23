pragma solidity ^0.7.3;

import './interface/IPoolFactory.sol';
import './IDEAFactory.sol';
import './PoolFactory.sol';
import 'hardhat/console.sol';

library CommonStructs {
    struct Idea {
        uint256 id;
        string name;
        string description;
        address owner;
        uint256 votes;
    }
    struct ChildPool {
        address parentPool;
        string name;
        string description;
        uint256[] ideas;
        address[] users;
        uint256 collateral;
        bool isSet;
    }

    struct Pool {
        address pool;
        bytes32 name;
        bytes32 description;
        uint256[] ideas;
        mapping(address => ChildPool) childPools;
        address[] users;
        uint256 collateral;
        bool isParent;
    }

}

contract PoolCoordinator is IPoolFactory {
    struct User {
          address userAddress;
          mapping(address => uint256) collateralPerChildPool;
          mapping(address => uint256) collateralPerPool;
          uint256 TVL;
          bool exist;
     }
    struct ExistingPools {
        address pool;
        bool exists;
    }

    uint256 _balanceOf;
    mapping(address => User) public users;

    mapping(address => CommonStructs.Pool) public mappedPools;

    ExistingPools[] public existingPools;
    IDEAFactory factory;
    constructor(address factoryAddress) {
        factory = IDEAFactory(factoryAddress);
    }
    /**
        Next big question:

        Collateral per Parent vs Collateral Per child.
        When does it overlap vs when does it not overlap...
        so we add child collateral to parent and thats it
     */
    //calculate voting power for user in pool
    function getVotingPower(address votingPool, bool isChild, address voter) public returns(uint256) {
        // this will have to change based on how they added collateral
        User storage vote = users[voter];
        CommonStructs.Pool storage parent;
        uint256 collateralForPool;
        uint256 totalCollateral;
        if(isChild) {
            for(uint i=0; i<=existingPools.length; i++) {
                parent = mappedPools[existingPools[i].pool];
                if(parent.childPools[votingPool].isSet) {
                    console.logString("Found child!");
                    //calculate voting power for all users only in child pool
                    //best practice for storing users?
                    //we probably don't want to store users at a pool level
                    //how do other projects calculate voting power for a user?
                    collateralForPool = vote.collateralPerChildPool[votingPool];
                    console.log("Collateral for Voting Pool is ", collateralForPool);
                    totalCollateral = parent.childPools[votingPool].collateral;
                    return (collateralForPool/totalCollateral)*100;

                }
            }
        } else {
            //calculate voting power based on parent pool
            parent = mappedPools[votingPool];
            collateralForPool = vote.collateralPerPool[votingPool];
            totalCollateral = parent.collateral;
            return (collateralForPool/totalCollateral)*100;

        }
    }
    function createPool(bytes32 name, bytes32 description) public override returns(address) {
        PoolFactory poolFactory = new PoolFactory(name, description);

        CommonStructs.Pool storage newPool = mappedPools[address(poolFactory)];

        newPool.name = name;
        newPool.description = description;
        newPool.users.push(msg.sender);
        newPool.isParent = true;
        newPool.pool = address(poolFactory);

        existingPools.push(ExistingPools(address(poolFactory), true));
        console.log("New pool created with address", address(poolFactory));
        return address(poolFactory);
    }
    function updatePool(address pool) public {
        //update pool data across contracts
        //I guess we need one for childPool as well
        require(mappedPools[pool].isParent, "This pool is not deinfed");
        CommonStructs.Pool storage poolToUpdate = mappedPools[pool];
        //pass in data to update it with. Look up how to do this in solidity


    }
    function addIdeaToPool(address pool, uint256 id) public override returns(bool) {
        CommonStructs.Pool storage currentPool = mappedPools[pool];
        currentPool.ideas.push(id);
        console.log("Current Pool address is ", pool);
        console.log("Is the idea we just added in the pool? ", factory.getName(currentPool.ideas[0]));

        return true;
    }

    function addIdeaToChild (address child, uint256 id) public override {
        console.logString("Adding idea to child pool which also adds to parent");
        for(uint i=0; i<existingPools.length; i++) {
                console.log("Checking parent pool ", i, " for child");
                CommonStructs.Pool storage parent = mappedPools[existingPools[i].pool];
                console.log("Checking parent: ", parent.pool);
                if(parent.childPools[child].isSet) {
                        console.logString("found child!");
                        CommonStructs.ChildPool storage pool = parent.childPools[child];
                        pool.ideas.push(id);
                        console.logString("added idea to child");
                        console.log("Is it in child pool? ", factory.getName(pool.ideas[0]));
                        parent.ideas.push(id);
                        console.logString("added to parent");
                        break;
                }
            }
        console.logString("done");
    }

    function createSubPool(string memory name, string memory description, address parentPool) public override returns(address) {
        CommonStructs.Pool storage parent = mappedPools[parentPool];
        ChildPoolFactory childPool = new ChildPoolFactory(name, description, parentPool);
        CommonStructs.ChildPool storage child = parent.childPools[address(childPool)];
        child.name = name;
        child.description = description;
        child.parentPool = parentPool;
        child.users.push(msg.sender);
        child.isSet = true; 
        parent.users.push(msg.sender);
        console.log("Created child pool with address ", address(childPool));
        console.logString("Is child in parent?");
        console.logString(parent.childPools[address(childPool)].name);
        return address(childPool); 
    }
    //Should deposit IDEA tokens?
    function depositToPool(address pool, uint256 amount, address origin) public returns(uint256) {
         //todo
         //require that the user has the amount they are trying to add to a pool
         //transfer ideas token to PoolCoordinator
         User storage user = users[origin];
         user.exist = true;
         user.userAddress = origin;
         user.TVL += amount;
         _balanceOf += amount;
         if(mappedPools[pool].isParent) {
            CommonStructs.Pool storage depositPool = mappedPools[pool];
            depositPool.collateral += amount;
            depositPool.users.push(origin);
            user.collateralPerPool[pool] += amount;
         } else {
             for(uint i=0; i<=existingPools.length; i++) {
                CommonStructs.Pool storage parent = mappedPools[existingPools[i].pool];
                CommonStructs.ChildPool storage child = parent.childPools[pool];
                if(child.isSet) {
                    child.collateral += amount;
                    child.users.push(origin);
                    child.collateral += amount;
                    parent.collateral += amount;
                    user.collateralPerChildPool[pool] += amount;
                    user.collateralPerPool[parent.pool] += amount;
                    break;
                }

            }
         }
         return amount;
     }
    //amount is gov tokens, id is idea id
    function voteInPool(address votingPool, uint256 id, uint amount) public override returns(uint256) {
        //call get voting power
        uint256 votesToAdd = 0;
        bool foundPool;
        for(uint i=0; i<existingPools.length; i++) {
            if(existingPools[i].pool == votingPool) {
                votesToAdd = getVotingPower(votingPool, false, msg.sender);
                foundPool = true;
            }
         }
        if(!foundPool) {
            votesToAdd = getVotingPower(votingPool, true, msg.sender);
        }
        factory.stakeIdea(votesToAdd, id, msg.sender);
        console.log("Added votes", votesToAdd, " to idea ", id);
        return votesToAdd;
    }

    function transferCollateral(address receiver, uint amount) public override returns(bool) {

    }

    function withdrawCollateral(address withdrawer, uint amount) public override returns(bool) {
        
    }


}