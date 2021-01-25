pragma solidity ^0.7.3;

import './PoolCoordinator.sol';
import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import 'hardhat/console.sol';

//this represents a NFT idea
// this idea is minted for the creator of an idea and is rewarded to stakers
contract IDEAFactory is ERC1155 {
    event mintedIdea(address owner, uint256 id, string name);
    string private _uri;

    CommonStructs.Idea[] public ideas;

    uint256 private currentIdea = 0;

    constructor (string memory uri_) ERC1155(uri_) {
        _uri = uri_;
    }

    function mintIdea(string memory name, string memory description) public {
        console.log("Minting new idea with ", name, " and id", currentIdea);
        _mint(msg.sender , currentIdea, 1, "");
        emit mintedIdea(msg.sender, currentIdea, name);
        CommonStructs.Idea memory idea = CommonStructs.Idea({
            id: currentIdea,
            name: name,
            description: description,
            owner: msg.sender,
            votes: 0
        });
        console.log("Created Idea", idea.name, " which was created by ", idea.owner);
        console.logUint(currentIdea);
        ideas.push(idea);
        _incrementIdea();
        console.logUint(currentIdea);
    }


    function stakeIdea(uint256 stake, uint256 id, address sender) public {
        console.log("Staking ", stake, " idea");
        setVotes(stake, id);
        _mint(sender, id, stake, "");
    }
    function _incrementIdea() private {
        currentIdea++;
    }

    /**
    function findIdea(address idea) public view returns(int id) {
        for(uint256 i=0; i<=ideas.length; i++) {
            if(ideas[i].owner == idea) {
                return int256(i);
            }
        }

        return -1;
    }*/

    function setVotes(uint256 votes, uint256 id) public {
        ideas[id].votes += votes;
    }

    function getVotes(uint256 id) public view returns(uint256){
        return ideas[id].votes;
    }
    function setName(string memory name, uint256 id) public {
        ideas[id].name = name;
    }

    function getName(uint256 id) public view returns(string memory){
        return ideas[id].name;
    }
}