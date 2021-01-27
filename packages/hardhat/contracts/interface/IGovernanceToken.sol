pragma solidity ^0.6.0;

interface GovernanceToken {

    event PropsedLiquidity(address idea, address user, address vote);

    function proposeLiquidity(address idea) external returns(address);

    function voteOnLiquidity(address vote) external;

    //vote on an idea in a pool. 
    function voteOnIdea(address idea, uint votes) external returns (uint);
    //get the amount of voting power a user has based on their contributioin to a pool
    function getVotingPowerInPool(address user, address pool) external returns(uint);
}