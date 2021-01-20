pragma solidity ^0.7.4;

import './PoolCoordinator.sol';

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

     function depositToPool(address pool, uint256 amount, address origin) public returns(uint256) {
         //todo
         //require that the user has the amount they are trying to add to a pool
         PoolCoordinator poolCoord = PoolCoordinator(factoryAddress);
         User storage user = users[origin];
         user.exist = true;
         user.userAddress = origin;
         bool isParent = poolCoord.mappedPools[pool].isParent;
         if(isParent) {
            CommonStructs.Pool storage depositPool = poolCoord.mappedPools[pool];
            depositPool.collateral = amount;
            depositPool.users.push(origin);
            user.collateralPerPool[pool] += amount;
            user.TVL += amount;
         } else {
             for(uint i=0; i<=poolCoord.existingPools.length; i++) {
                CommonStructs.Pool storage parent = poolCoord.mappedPools[poolCoord.existingPools[i]];
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
     } 
}