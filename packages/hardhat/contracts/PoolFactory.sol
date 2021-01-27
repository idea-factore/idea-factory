pragma solidity ^0.6.0;

import './PoolCoordinator.sol';

//Base contracts to create Pools with
// should extend the functionality of these so that they hold most data for pools
// and then in PoolCoordinator we can just hold references to these factories
contract PoolFactory {
    CommonStructs.Pool public pool;

    constructor(bytes32 name, bytes32 description) public {
        pool.name = name;
        pool.description = description;
        pool.pool = address(this);
    }
}

contract ChildPoolFactory {
    CommonStructs.ChildPool public childPool;

    constructor(string memory name, string memory description, address parent) public {
        childPool.name = name;
        childPool.description = description;
        childPool.isSet = true;
        childPool.parentPool = parent;
    }

    function getAddress() public view returns(address) {
        return address(this);
    }

}