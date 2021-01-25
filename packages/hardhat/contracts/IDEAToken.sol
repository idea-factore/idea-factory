pragma solidity ^0.7.3;

import './interface/IIdeaToken.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

//import "@openzeppelin/contracts/access/Ownable.sol"; //https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

//Implemnt AAVE/ENS potentially chainlink and UMA as well

contract IDEA is ERC20 {
    //super basic token
    constructor(uint256 initialSupply) ERC20("Idea-factory", "IDEA") {
        _mint(msg.sender, initialSupply);
    }


}