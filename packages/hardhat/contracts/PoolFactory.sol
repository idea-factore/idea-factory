pragma solidity ^0.7.3;

import './PoolCoordinator.sol';

contract PoolFactory {
    CommonStructs.Pool public pool;

    constructor(bytes32 name, bytes32 description) {
        pool.name = name;
        pool.description = description;
        pool.pool = address(this);
    }
}

contract ChildPoolFactory {
    CommonStructs.ChildPool public childPool;

    constructor(string memory name, string memory description, address parent) {
        childPool.name = name;
        childPool.description = description;
        childPool.isSet = true;
        childPool.parentPool = parent;
    }

    function getAddress() public view returns(address) {
        return address(this);
    }

}