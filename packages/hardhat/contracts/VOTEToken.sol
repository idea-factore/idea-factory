pragma solidity ^0.6.0;

import './interface/IIdeaToken.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@uma/core/contracts/financial-templates/common/SyntheticToken.sol';

//import "@openzeppelin/contracts/access/Ownable.sol"; //https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

//Implemnt AAVE/ENS potentially chainlink and UMA as well

contract VOTEToken is SyntheticToken, IIdeaToken {
    //super basic tokenExpandedERC20(tokenName, tokenSymbol, tokenDecimals) nonReentrant() 
    bool _deployed;
    constructor(
        string memory tokenName,
        string memory tokenSymbol,
        uint8 tokenDecimals
    ) public SyntheticToken(tokenName, tokenSymbol, tokenDecimals) nonReentrant() {
        _deployed = true;
    }

    function randomFunction() private {
        _deployed = true;
    }

    event DepositedToPool(address pool, uint oldAmount, uint newAmount);


    //mint governance tokens based on liqudity provided to pool
    function mintGovernanceTokens(address sender, uint liquidity, address pool) external override returns(uint) {}

    //add liqudity to pool
    function depositToPool(address pool, uint amount) external override {}

    /**
    When a user votes on an idea, a corresponding amount of IdeaTokens are deposited to AAVE lending pool and borrowed by the idea
    This collateral earns interest which is stored and split among LPs, idea creators, contributors
    This way we use AAVE liquidation protocol stuff to handle all that
     */

    //should have permissions on this as this should only be called by the Pool
    function depositCollateral(address receiver, uint amount) external override returns(bool) {}

    function withdrawCollateral(address withdrawer, uint amount) external override returns(address, uint) {}
}