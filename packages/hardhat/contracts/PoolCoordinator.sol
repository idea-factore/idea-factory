pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

import './interface/IPoolFactory.sol';
import './IDEAFactory.sol';
import './PoolFactory.sol';
import 'hardhat/console.sol';

// move these to seperate file
library CommonStructs {
    struct Idea {
        uint256 id;
        string name;
        string description;
        address owner;
        uint256 votes;
    }
    struct ChildPool {
        address child;
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
        ChildPool[] childPools;
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

    //TODO get rid of struct and just make ExisitingPools[] into
    // address[]
    //If it is in this array it exists by default
    struct ExistingPools {
        address pool;
        bool exists;
    }
    event createdPool(address pool);
    uint256 _balanceOf;
    mapping(address => User) public users;

    mapping(address => CommonStructs.Pool) public mappedPools;

    ExistingPools[] public existingPools;
    IDEAFactory factory;
    constructor(address factoryAddress) public {
        factory = IDEAFactory(factoryAddress);
    }


    function getCollateral() public view returns(uint256) {
        return _balanceOf;
    }

    function getIdeas() public view returns(uint256) {
        uint256 ideas = 0;
        for(uint i=0; i<existingPools.length; i++) {
            CommonStructs.Pool storage parent = mappedPools[existingPools[i].pool];
            if(parent.ideas.length != 0) {
                ideas += parent.ideas.length;
            }
        }
        console.log("Number of ideas are ", ideas);

        return ideas;
    }
    function getPools() public view returns(ExistingPools[] memory) {
        return existingPools;
    }

    function getPoolData(address pool) public view returns(CommonStructs.Pool memory poolToReturn) {
        CommonStructs.Pool storage  poolToReturn = mappedPools[pool];
        return poolToReturn;
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
        emit createdPool((address(poolFactory)));
        return address(poolFactory);
    }
    /**
    function updatePool(address pool) view public {
        //update pool data across contracts
        //I guess we need one for childPool as well
        require(mappedPools[pool].isParent, "This pool is not deinfed");
        CommonStructs.Pool storage poolToUpdate = mappedPools[pool];
        //pass in data to update it with. Look up how to do this in solidity


    }*/
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
                //TODO
            }
        console.logString("done");
    }

    function createChildPool(string memory name, string memory description, address parentPool) public override returns(address) {
        CommonStructs.Pool storage parent = mappedPools[parentPool];
        ChildPoolFactory childPool = new ChildPoolFactory(name, description, parentPool);
        //TODO
        parent.childPools.push(childPool.getData());
        return childPool.getAddress();
    }
    // what's the difference between this and stakeToIdea?
    //Should deposit IDEA tokens?
    function stakeToPool(address pool, uint256 amount, address origin) public returns(uint256) {
         //todo
         //require that the user has the amount they are trying to add to a pool
         //transfer ideas token to PoolCoordinator
         User storage user = users[origin];
         user.exist = true;
         user.userAddress = origin;
         if(mappedPools[pool].isParent) {
            CommonStructs.Pool storage depositPool = mappedPools[pool];
            depositPool.collateral += amount;
            depositPool.users.push(origin);
            user.collateralPerPool[pool] += amount;
         } else {
             for(uint i=0; i<=existingPools.length; i++) {
                CommonStructs.Pool storage parent = mappedPools[existingPools[i].pool];
                //TODO
                bool found = false;
                for(uint j=0; j<=parent.childPools.length; j++) {
                    CommonStructs.ChildPool storage child = parent.childPools[j];
                    if(child.child == pool) {
                        child.collateral += amount;
                        child.users.push(origin);
                        user.collateralPerChildPool[pool] += amount;
                        found = true;
                        break;
                    }
                }
                if(found) break; 
            }
         }
         return amount;
     }
    //amount is gov tokens, id is idea id
    function voteInPool(address votingPool, uint256 id, uint amount) public override returns(uint256) {
        
    }

    function transferCollateral(address receiver, uint amount) public override returns(bool) {

    }

    function withdrawCollateral(address withdrawer, uint amount) public override returns(bool) {
        
    }


}