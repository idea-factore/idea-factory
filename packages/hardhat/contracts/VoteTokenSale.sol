pragma solidity ^0.6.0;


import './VOTEToken.sol';


contract VoteTokenSale {

	  VOTEToken public token;

    event Bought(uint256 amount);
    event Sold(uint256 amount);

    address public owner;

   	uint256 public tokensBought;
   	uint256 public etherRaised;
   	uint256 public tokenRate = 1000;
    uint256 public totalSupply = 100e12;

   	modifier onlyOwner {
      require(msg.sender == owner);
      _;
   	}

   	constructor(address _tokenAddress) public {
      token = new VOTEToken("VoteToken", "IVTE", 18);
   	}
   	

   	fallback () external payable {
        buyVoteToken();
    }    

    function balanceOf(address addr) public view returns (uint256) {
      return token.balanceOf(addr);
   }


    function buyVoteToken() payable public {
        uint256 amountTobuy = msg.value;
        uint256 tokenBalance = token.balanceOf(address(this));

        require(amountTobuy > 0, "You need to send some ether");
        require(amountTobuy <= tokenBalance, "Not enough tokens in the reserve");

        // Send Vote tokens to buyer
        token.transfer(msg.sender, amountTobuy);
        emit Bought(amountTobuy);

        // keep track of token sales and eth deposits
        tokensBought += amountTobuy;
        etherRaised += amountTobuy;
    }
}