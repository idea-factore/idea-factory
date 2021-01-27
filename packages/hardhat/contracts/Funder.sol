pragma solidity ^0.6.0;

import './PoolCoordinator.sol';
// Don't think we need this anymore
contract Funder {
     struct User {
          address userAddress;
          mapping(address => uint256) collateralPerChildPool;
          mapping(address => uint256) collateralPerPool;
          uint256 TVL;
          bool exist;
     }

     mapping(address => User) public users;
     address factoryAddress; 
     PoolCoordinator poolFactory; 
     constructor(address factory) public {
         factoryAddress = factory;
     }
    /**
     function depositToPool(address pool, uint256 amount, address origin) public returns(uint256) {
         //todo
         //require that the user has the amount they are trying to add to a pool
         poolFactory = PoolCoordinator(factoryAddress);
         User storage user = users[origin];
         user.exist = true;
         user.userAddress = origin;
         bool isParent = true;
         if(isParent) {
            //CommonStructs.Pool storage depositPool = poolFactory.mappedPools(pool);
            depositPool.collateral = amount;
            depositPool.users.push(origin);
            user.collateralPerPool[pool] += amount;
            user.TVL += amount;
         } else {
             for(uint i=0; i<=poolFactory.existingPools.length; i++) {
                CommonStructs.Pool storage parent = poolFactory.mappedPools[poolFactory.existingPools[i]];
                CommonStructs.ChildPool storage child = parent.childPools[pool];
                if(child.isSet) {
                    child.collateral += amount;
                    child.users.push(origin);
                    child.collateral += amount;
                    user.collateralPerChildPool[pool] += amount;
                    user.TVL += amount;
                    break;
                }

            }
         }
     } */
}