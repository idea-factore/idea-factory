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
  const network = config.defaultNetwork;
  const actualNetwork = {
    name: network,
    chainId: 42,
    ensAddress: "0xB66B2f307B6e46a6D038a85997B401aE87455772"
  };
  const account = config.networks[network].accounts[0];
  const provider = await new ethers.providers.AlchemyProvider(actualNetwork, "MXViLblblc2XCNPjX4FMsvJ2wXDNgIRB");
  const wallet = await new ethers.Wallet(account, provider);
  console.log("\n\n 📡 Deploying...\n");
  //default price indentifier. Still really unsure whether we need our own or not
  const priceFeedIdentifier = web3.utils.utf8ToHex("USDETH");
  // default params besides syntheticName and symbol
  const constructorParams = {
    expirationTimestamp: '1706780800',
    collateralAddress: "0xd0A1E359811322d97991E03f863a0C30C2cF029C",
    priceFeedIdentifier: priceFeedIdentifier,
    syntheticName: 'idea-factory synthetic token kovan test deploy', 
    syntheticSymbol: 'testVOTE', 
    collateralRequirement: { rawValue: web3.utils.toWei("0.15") },
    disputeBondPct: { rawValue: web3.utils.toWei("0.1") },
    sponsorDisputeRewardPct: { rawValue: web3.utils.toWei("0.05")},
    disputerDisputeRewardPct: { rawValue: web3.utils.toWei("0.2")},
    minSponsorTokens: { rawValue: web3.utils.toWei("100")},
    withdrawalLiveness: 7200,
    liquidationLiveness: 7200,
    financialProductLibraryAddress: Store.networks[42].address
  }
  console.log("Deploying UMA EMP...\n");
  console.log(ExpiringMultiPartyCreator.networks[42].address)
  console.log(account);
  const empCreator = await ethers.getContractAt(ExpiringMultiPartyCreator.abi, ExpiringMultiPartyCreator.networks[42].address, wallet);
  const test = await empCreator.tokenFactoryAddress(); 
  console.log(test);
  console.log("Calling createExpiringMultiParty");
  console.log(empCreator);
  console.log(constructorParams);
  const result = await empCreator.createExpiringMultiParty(constructorParams);
  console.log(result);
  const emp = await new ethers.Contract(result.logs[0].args.expiringMultiPartyAddress, ExpiringMultiParty.abi);
  const idea = await (await deploy("IDEAFactory", ["somefile.json"])).deployTransaction.wait();
  //const ideaToken = await (await deploy("VOTEToken", ["VOTE governance token for idea-factory", "VOTE", 18 ])).deployTransaction.wait();
  //const voteManager = await (await deploy("PricelessPositionManagerForVote", [ "1640995200", 7200, "0x462303f77a3f17Dbd95eb7bab412FE4937F9B9CB", ideaToken.contractAddress, 
                              //finder, padRight(utf8ToHex("USDETH"), 64), toWei("100"), ideaToken.contractAddress, finacialProduct])).deployTransaction.wait();
  //console.log(idea.address);
  //console.log(idea.contractAddress);
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
