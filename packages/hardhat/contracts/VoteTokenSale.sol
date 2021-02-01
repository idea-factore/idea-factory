pragma solidity ^0.6.0;


import './VOTEToken.sol';


contract VoteTokenSale {

	  VOTEToken public token;
    address public owner;

   	uint256 public tokensBought;
   	uint256 public etherRaised;
   	uint256 public tokenRate = 1000;
    uint256 public totalSupply = 100e24;

   	modifier onlyOwner {
      require(msg.sender == owner);
      _;
   	}

   	constructor() public {
   	}
   	

   	fallback () external payable {
        buyVoteToken();
    }    

    function buyVoteToken() public payable {
        uint256 tokensToBuy;
        uint256 etherUsed = msg.value;
        tokensToBuy = etherUsed * tokenRate;

        // Send Vote tokens to buyer
        // token.buyTokens(msg.sender, tokensToBuy);

        // keep track of token sales and eth deposits
        tokensBought += tokensToBuy;
        etherRaised += etherUsed;
    }
}