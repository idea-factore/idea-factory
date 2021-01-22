pragma solidity ^0.7.3;
//Interface for IDEA Token (which is not governance token)
interface IIdeaToken {
    
    event DepositedToPool(address pool, uint oldAmount, uint newAmount);


    //mint governance tokens based on liqudity provided to pool
    function mintGovernanceTokens(address sender, uint liquidity, address pool) external returns(uint);

    //add liqudity to pool
    function depositToPool(address pool, uint amount) external;

    /**
    When a user votes on an idea, a corresponding amount of IdeaTokens are deposited to AAVE lending pool and borrowed by the idea
    This collateral earns interest which is stored and split among LPs, idea creators, contributors
    This way we use AAVE liquidation protocol stuff to handle all that
     */

    //should have permissions on this as this should only be called by the Pool
    function depositCollateral(address receiver, uint amount) external returns(bool);

    function withdrawCollateral(address withdrawer, uint amount) external returns(address, uint);

}
