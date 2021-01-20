pragma solidity ^0.7.4;


interface IPoolFactory {
    


    function createPool(string memory name, string memory description) external returns(address);

    function addIdeaToPool(address pool, address idea) external returns(bool);

    function createSubPool(string memory name, string memory description, address parentPool) external returns(address);

    function voteInPool(address idea, uint amount) external returns(uint);

    function transferCollateral(address receiver, uint amount) external returns(bool);

    function withdrawCollateral(address withdrawer, uint amount) external returns(bool);
}