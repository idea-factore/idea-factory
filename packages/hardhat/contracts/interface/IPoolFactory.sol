pragma solidity ^0.6.0;


interface IPoolFactory {
    


    function createPool(bytes32 name, bytes32 description) external returns(address);

    function addIdeaToPool(address pool, uint256 id) external returns(bool);

    function addIdeaToChild(address child, uint256 id) external;

    function createChildPool(string memory name, string memory description, address parentPool) external returns(address);

    function transferCollateral(address receiver, uint amount) external returns(bool);

    function withdrawCollateral(address withdrawer, uint amount) external returns(bool);
}