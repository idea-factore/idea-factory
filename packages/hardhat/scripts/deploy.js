/* eslint no-use-before-define: "warn" */
const fs = require("fs");
const chalk = require("chalk");
const { config, ethers } = require("hardhat");
const { utils, AlchemyProvider } = require("ethers");
const R = require("ramda");
const { getAddress, getAbi } = require("@uma/core");
const Store = require("@uma/core/build/contracts/Store.json");
const ExpiringMultiPartyCreator = require("@uma/core/build/contracts/ExpiringMultiPartyCreator.json");
const ExpiringMultiParty = require("@uma/core/build/contracts/ExpiringMultiParty.json");
const web3 = require("web3");

const main = async () => {
  // To deploy our synthetic just go to this address: 0x1082C1878FAeAC03310468A379cf4D159939FA42
  // and connect your metamask account, go to write, and go to createExpiringMultiParty or whatever
  // and enter the following parameters (with changes if needed)
  /**
   {   expirationTimestamp: "1706780800",   
   collateralAddress: "0xC4375B7De8af5a38a93548eb8453a498222C4fF2",   
   priceFeedIdentifier: "0x555344455448",   
   syntheticName: "idea-factory voteFeb",   
   syntheticSymbol: "VOTEFEB21",   
   collateralRequirement: { rawValue: '1500000000000000000' },   
   disputeBondPct: { rawValue: '100000000000000000' },   
   sponsorDisputeRewardPct: { rawValue: '50000000000000000' },   
   disputerDisputeRewardPct: { rawValue: '200000000000000000' },   
   minSponsorTokens: { rawValue: '100000000000000000000' },   
   withdrawalLiveness: 7200,   
   liquidationLiveness: 7200,   
   excessTokenBeneficiary: '0x41AF40Eb92Bec4dD8DA77103597838b3dBBD3B6f' }
   */
  const idea = await (await deploy("IDEAFactory", ["somefile.json"])).deployTransaction.wait();
  //const ideaToken = await (await deploy("VOTEToken", ["VOTE governance token for idea-factory", "VOTE", 18 ])).deployTransaction.wait();
  //const voteManager = await (await deploy("PricelessPositionManagerForVote", [ "1640995200", 7200, "0x462303f77a3f17Dbd95eb7bab412FE4937F9B9CB", ideaToken.contractAddress, 
                              //finder, padRight(utf8ToHex("USDETH"), 64), toWei("100"), ideaToken.contractAddress, finacialProduct])).deployTransaction.wait();
  //console.log(idea.address);
  //console.log(idea.contractAddress);{   expirationTimestamp: '1706780800',   collateralAddress: '0xd0A1E359811322d97991E03f863a0C30C2cF029C',   priceFeedIdentifier: '0x555344455448',   syntheticName: 'idea-factory synthetic token kovan test deploy',   syntheticSymbol: 'testVOTE',   collateralRequirement: { rawValue: '150000000000000000' },   disputeBondPct: { rawValue: '100000000000000000' },   sponsorDisputeRewardPct: { rawValue: '50000000000000000' },   disputerDisputeRewardPct: { rawValue: '200000000000000000' }
  const PoolCoordinator = await deploy("PoolCoordinator", [idea.contractAddress]);

   // <-- add in constructor args like line 16 vvvv



  // const exampleToken = await deploy("ExampleToken")
  // const examplePriceOracle = await deploy("ExamplePriceOracle")
  // const smartContractWallet = await deploy("SmartContractWallet",[exampleToken.address,examplePriceOracle.address])

  /*

  //If you want to send some ETH to a contract on deploy (make your constructor payable!)

  const yourContract = await deploy("YourContract", [], {
  value: ethers.utils.parseEther("0.05")
  });
  */


  /*

  //If you want to send value to an address from the deployer

  const deployerWallet = ethers.provider.getSigner()
  await deployerWallet.sendTransaction({
    to: "0x34aA3F359A9D614239015126635CE7732c18fDF3",
    value: ethers.utils.parseEther("0.001")
  })
  */


  console.log(
    " 💾  Artifacts (address, abi, and args) saved to: ",
    chalk.blue("packages/hardhat/artifacts/"),
    "\n\n"
  );
};

const deploy = async (contractName, _args = [], overrides = {}) => {
  console.log(` 🛰  Deploying: ${contractName}`);

  const contractArgs = _args || [];
  const contractArtifacts = await ethers.getContractFactory(contractName);
  const deployed = await contractArtifacts.deploy(...contractArgs, overrides);
  const encoded = abiEncodeArgs(deployed, contractArgs);
  fs.writeFileSync(`artifacts/${contractName}.address`, deployed.address);

  console.log(
    " 📄",
    chalk.cyan(contractName),
    "deployed to:",
    chalk.magenta(deployed.address),
  );

  if (!encoded || encoded.length <= 2) return deployed;
  fs.writeFileSync(`artifacts/${contractName}.args`, encoded.slice(2));

  return deployed;
};

// ------ utils -------

// abi encodes contract arguments
// useful when you want to manually verify the contracts
// for example, on Etherscan
const abiEncodeArgs = (deployed, contractArgs) => {
  // not writing abi encoded args if this does not pass
  if (
    !contractArgs ||
    !deployed ||
    !R.hasPath(["interface", "deploy"], deployed)
  ) {
    return "";
  }
  console.log("Trying to encode");
  console.log(deployed.interface.deploy.inputs);
  const encoded = utils.defaultAbiCoder.encode(
    deployed.interface.deploy.inputs,
    contractArgs
  );
  return encoded;
};

// checks if it is a Solidity file
const isSolidity = (fileName) =>
  fileName.indexOf(".sol") >= 0 && fileName.indexOf(".swp") < 0 && fileName.indexOf(".swap") < 0;

const readArgsFile = (contractName) => {
  let args = [];
  try {
    const argsFile = `./contracts/${contractName}.args`;
    if (!fs.existsSync(argsFile)) return args;
    args = JSON.parse(fs.readFileSync(argsFile));
  } catch (e) {
    console.log(e);
  }
  return args;
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
