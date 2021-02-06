pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

import './interface/IPoolFactory.sol';
import './IDEAFactory.sol';
import './PoolFactory.sol';
import 'hardhat/console.sol';
import './VOTEToken.sol';

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
    using SafeMath for uint256;
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
    event createdChildPool(address childPool);
    event Bought(uint256 amount);

    uint256 _balanceOf;
    mapping(address => User) public users;

    mapping(address => CommonStructs.Pool) public mappedPools;

    ExistingPools[] public existingPools;
    IDEAFactory factory;

    VOTEToken public voteToken;
    address poolCoordinatorAddress;
    uint256 public tokensBought;
    uint256 public etherRaised;

    address[] add;
    uint256[] ideas;
    constructor(address factoryAddress) public {
        factory = IDEAFactory(factoryAddress);
        poolCoordinatorAddress = factoryAddress;
        voteToken = new VOTEToken(100e12);
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

    function getChildPools(address pool) public view returns(CommonStructs.ChildPool[] memory childPools) {
        CommonStructs.Pool storage parent = mappedPools[pool];
        return parent.childPools; 
    }

    function getChildPoolData(address pool) public view returns(CommonStructs.ChildPool memory childPool) {
        bool found = false;
        for(uint i=0;i<existingPools.length; i++) {
            CommonStructs.Pool storage parent = mappedPools[existingPools[i].pool];
            for(uint j=0; j<parent.childPools.length; j++) {
                CommonStructs.ChildPool storage childPool = parent.childPools[j];
                found = childPool.child == pool;
                console.logString("found child pool");
                if(found) return childPool; 
            }
        }
        console.log("found? ", found);
        return childPool; 
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
        bool found = false;
        for(uint i=0; i<existingPools.length; i++) {
                console.log("Checking parent pool ", i, " for child");
                CommonStructs.Pool storage parent = mappedPools[existingPools[i].pool];
                console.log("Checking parent: ", parent.pool);
                for(uint j=0; j<parent.childPools.length; j++) {
                    if(parent.childPools[j].child == child) {
                        CommonStructs.ChildPool storage currentChild = parent.childPools[j];
                        currentChild.ideas.push(id);
                        found = true;
                        break;
                    }
                }
                if(found) break;
        }
        console.logString("done");
    }

    function createChildPool(string memory name, string memory description, address parentPool) public override returns(address) {
        CommonStructs.Pool storage parent = mappedPools[parentPool];
        ChildPoolFactory childPool = new ChildPoolFactory(name, description, parentPool);
        parent.childPools.push(CommonStructs.ChildPool(childPool.getAddress(), name, description, ideas, add, 0, true));
        emit createdChildPool(childPool.getAddress());
        return childPool.getAddress();
    }
    //all this does is add collateral to a pool
    function stakeToIdea(address pool, uint256 amount, address origin, uint256 idea) public returns(uint256) {
         //todo
         //require that the user has the amount they are trying to add to a pool
         //Deposit VOTE tokens to IDEA synthetic
         User storage user = users[origin];
         user.exist = true;
         user.userAddress = origin;
         if(mappedPools[pool].isParent) {
            CommonStructs.Pool storage depositPool = mappedPools[pool];
            depositPool.collateral += amount;
            depositPool.users.push(origin);
            user.collateralPerPool[pool] += amount;
            factory.stakeIdea(amount, idea, origin, pool);

            // transfer Vote tokens held by poolcoordinator to the pool
            tranferVoteTokenToPool(origin, pool, amount);
         } else {
             for(uint i=0; i<=existingPools.length; i++) {
                CommonStructs.Pool storage parent = mappedPools[existingPools[i].pool];
                bool found = false;
                for(uint j=0; j<=parent.childPools.length; j++) {
                    CommonStructs.ChildPool storage child = parent.childPools[j];
                    if(child.child == pool) {
                        child.collateral += amount;
                        child.users.push(origin);
                        user.collateralPerChildPool[pool] += amount;
                        parent.collateral += amount;
                        parent.users.push(origin);
                        user.collateralPerPool[parent.pool] += amount;
                        factory.stakeIdea(amount, idea, origin, pool);

                        // transfer Vote tokens held by poolcoordinator to the right pool
                        tranferVoteTokenToPool(origin, pool, amount);

                        found = true;
                        break;
                    }
                }
                if(found) break; 
            }
         }
         return amount;
     }

     /* steps to test
     1. create pool, get pool address
     2. mint idea 0, add idea 0 to pool address
     3. send eth to pool coordinator with sendPaymentToPool()
     4. validate vote balance of user with getVoteTokenBalance(myAddress)
     5. send vote to pools either by stakeToIdea or tranferVoteTokenToPool
     6. validate vote balance of pool with getVoteTokenBalance(poolAddress)
     */

     // inner mapping of who controls vote tokens held by pool coordinator
    mapping(address => uint256) balancesInPoolCoordinator;

    // if private, then function can only be called within stakeToIdea, which requires a pool to have an idea
    // if public, then users can also add vote tokens to pools even if there is no idea 
    function tranferVoteTokenToPool(address sender, address receiver, uint256 amount) public {
        require(amount <= balancesInPoolCoordinator[sender]);
        balancesInPoolCoordinator[sender] = balancesInPoolCoordinator[sender].sub(amount);
        balancesInPoolCoordinator[receiver] = balancesInPoolCoordinator[receiver].add(amount);
    }

    // return vote token balance stored for each user inside pool coordinator
    // can be used to get vote token balance assigned to user or individual pools
    function getVoteTokenBalance(address addr) public view returns (uint256) {
      return balancesInPoolCoordinator[addr];
    }

    function getVoteBalanceOfPoolCoordinator() public view returns (uint256) {
        return voteToken.balanceOf(poolCoordinatorAddress);
    }

    fallback () external payable {
        sendPaymentToPool();
    }    

    // this function receives Ether from the caller, and sends Vote tokens to pool coordinator
    // pool coordinator holds tokens on behalf of caller in balancesInPoolCoordinator
    // all units are in WEI, todo: convert to ETH decimals
    function sendPaymentToPool() payable public {
        uint256 amountTobuy = msg.value;
        uint256 tokenBalance = voteToken.balanceOf(address(this));

        require(amountTobuy > 0, "You need to send some ether");
        require(amountTobuy <= tokenBalance, "Not enough tokens in the reserve");

        // Send Vote tokens from VoteToken contract to pool coordinator
        voteToken.sendVotesToPoolCoordinator(poolCoordinatorAddress, amountTobuy);

        // keep track of user holdings inside balancesInPoolCoordinator
        balancesInPoolCoordinator[msg.sender] += amountTobuy;

        console.log("balancesInPoolCoordinator[msg.sender]: ", balancesInPoolCoordinator[msg.sender]);

        emit Bought(amountTobuy);
        // keep track of vote token sales and eth deposits, right now they are 1:1 ratio
        tokensBought += amountTobuy;
        etherRaised += amountTobuy;
    }


    function transferCollateral(address receiver, uint amount) public override returns(bool) {

    }

    function withdrawCollateral(address withdrawer, uint amount) public override returns(bool) {
        
    }


}