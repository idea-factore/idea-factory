import React, { useCallback, useEffect, useState, Suspense } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import "antd/dist/antd.css";
import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import "./App.css";
import { Menu, Typography, Steps, Spin } from "antd";
import Web3Modal from "web3modal";
import { useUserAddress } from "eth-hooks";
import { useGasPrice, useUserProvider, useContractLoader, useBalance, useExternalContractLoader } from "./hooks";
import { Header, Account } from "./components";
import { Transactor } from "./helpers";
import { formatEther } from "@ethersproject/units";
import { INFURA_ID, FACTORY_ABI, pool_abi } from "./constants";
import {loadContractFx, $contracts } from './models/contracts/index';
import { useStore } from "effector-react";

// 😬 Sorry for all the console logging 🤡
const DEBUG = true

// 🔭 block explorer URL
const blockExplorer = "https://etherscan.io/" // for xdai: "https://blockscout.com/poa/xdai/"
const { Paragraph, Title } = Typography;

const { Step } = Steps;

// 🛰 providers
if(DEBUG) console.log("📡 Connecting to Mainnet Ethereum");
//const mainnetProvider = getDefaultProvider("mainnet", { infura: INFURA_ID, etherscan: ETHERSCAN_KEY, quorum: 1 });
// const mainnetProvider = new InfuraProvider("mainnet",INFURA_ID);
const mainnetProvider = new JsonRpcProvider("https://mainnet.infura.io/v3/"+INFURA_ID)
// ( ⚠️ Getting "failed to meet quorum" errors? Check your INFURA_ID)

// 🏠 Your local provider is usually pointed at your local blockchain
const localProviderUrl = "http://localhost:8545"; // for xdai: https://dai.poa.network
// as you deploy to other networks you can set REACT_APP_PROVIDER=https://dai.poa.network in packages/react-app/.env
const localProviderUrlFromEnv = process.env.NODE_ENV == "production" ? "https://rpc-mumbai.maticvigil.com/" : localProviderUrl;
if(DEBUG) console.log("🏠 Connecting to provider:", localProviderUrlFromEnv);
const localProvider = new JsonRpcProvider("https://rpc-mumbai.maticvigil.com/");
console.log("Our provider: ", localProvider);

const Pools = React.lazy(() => import('./views/Pools'));
const ChildPool = React.lazy(() => import('./views/ChildPool'));
const Ideas = React.lazy(() => import ('./views/Ideas'));

function App(props) {

  const [injectedProvider, setInjectedProvider] = useState();
  const [step, setStep] = useState(0);
  const contracts = useStore($contracts);
  const onChange = current => {
    setStep(current);
  };

  /* 🔥 this hook will get the price of Gas from ⛽️ EtherGasStation */
  const gasPrice = useGasPrice("fast"); //1000000000 for xdai
  // For more hooks, check out 🔗eth-hooks at: https://www.npmjs.com/package/eth-hooks

  // Use your injected provider from 🦊 Metamask or if you don't have it then instantly generate a 🔥 burner wallet.
  const userProvider = useUserProvider(injectedProvider, localProvider);
  const address = useUserAddress(userProvider);
  // The transactor wraps transactions and provides notificiations
  const tx = Transactor(userProvider, gasPrice)

  // 🏗 scaffold-eth is full of handy hooks like this one to get your balance:
  const yourLocalBalance = useBalance(localProvider, address);
  if(DEBUG) console.log("💵 yourLocalBalance",yourLocalBalance?formatEther(yourLocalBalance):"...")

  // just plug in different 🛰 providers to get your balance on different chains:
  const yourMainnetBalance = useBalance(mainnetProvider, address);
  if(DEBUG) console.log("💵 yourMainnetBalance",yourMainnetBalance?formatEther(yourMainnetBalance):"...")
/**
  // Load in your local 📝 contract and read a value from it:
  console.log("Loading contracts");
  const readContracts = useContractLoader(localProvider)
  if(DEBUG) console.log("📝 readContracts",readContracts)

  // If you want to make 🔐 write transactions to your contracts, use the userProvider:
  const writeContracts = useContractLoader(userProvider)
  if(DEBUG) console.log("🔐 writeContracts",writeContracts)
  //const voteToken = useExternalContractLoader(localProvider, "0xcE04a6dE48a45398836ddA9555b2cAC68e3D705c", VOTE_ABI);
  //this should fail on local but I'm hoping it won't actually cause anything to break
  */



  const loadWeb3Modal = useCallback(async () => {
    const provider = await web3Modal.connect();
    setInjectedProvider(new Web3Provider(provider));
  }, [setInjectedProvider]);
  
  useEffect(() => {
    //load contracts once on page load
    //this should be fine, because if a new contract is deployed, we have to manually change the address and abi, etc
    loadContractFx({provider: localProvider, address: "0x3d56083D8A42326caf31FfdE98A9A112D6080176", ABI: FACTORY_ABI, name: 'ideaFactory'});
    loadContractFx({provider: localProvider, address: "0x2B193D5016981EEEbd3F663aC7ecA52e85d31325", ABI: pool_abi, name: 'poolCoordinator'});
  }, []);
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    }
  }, [loadWeb3Modal]);

  const [route, setRoute] = useState();
  useEffect(() => {
    setRoute(window.location.pathname)
  }, [setRoute]);

  return (
    <div className="App">
      <Header />

      <BrowserRouter>

        <Menu style={{ textAlign:"center" }} selectedKeys={[route]} mode="horizontal">
          <Menu.Item key="/">
            <Link onClick={()=>{setRoute("/")}} to="/">idea-factory</Link>
          </Menu.Item>
          <Menu.Item key="/pools">
            <Link onClick={()=>{setRoute("/pools")}} to="/pools">Pools</Link>
          </Menu.Item>
        </Menu>

        <Switch>
          <Route exact path="/">
            <Title level={3}>Welcome to the Idea Factory App!</Title>
            <Paragraph>
            Now Deployed to MATIC (Polygon)!
            </Paragraph>
            <Paragraph>
            To start, follow to short guide below. In future iterations, this will be a lot more interactive!
            </Paragraph>
            <Steps current={step} onChange={onChange}>
              <Step title="Step 1" description="First, Add some VOTE tokens using Wrapped Ether" />
              <Step title="Step 2" description="Next, Click on the Pool tab and Browse Ideas or Add your own" />
              <Step title="Step 3" description="Last but not lest, VOTE for ideas you like using your tokens." />
            </Steps>
          </Route>
          <Suspense fallback={<Spin />}>
          <Route path="/pools">
            { contracts.poolCoordinator && 
              <Pools
                address={address}
                userProvider={userProvider}
                mainnetProvider={mainnetProvider}
                localProvider={localProvider}
                yourLocalBalance={yourLocalBalance}
                tx={tx}
                poolCoordinator={contracts.poolCoordinator}
              />
            }
          </Route>
          <Route path="/childpools/:address">
          { contracts.poolCoordinator && contracts.ideaFactory &&
            <ChildPool
              userProvider={userProvider}
              mainnetProvider={mainnetProvider}
              localProvider={localProvider}
              yourLocalBalance={yourLocalBalance}
              tx={tx}
              poolCoordinator={contracts.poolCoordinator}
              ideaFactory={contracts.ideaFactory}
            />
          }
          </Route>
          <Route path="/ideas/:address">
          { contracts.poolCoordinator && contracts.ideaFactory && 
            <Ideas
              userAddress={address}
              userProvider={userProvider}
              mainnetProvider={mainnetProvider}
              localProvider={localProvider}
              yourLocalBalance={yourLocalBalance}
              tx={tx}
              poolCoordinator={contracts.poolCoordinator}
              ideaFactory={contracts.ideaFactory}
            />
          }
          </Route>
          </Suspense>
        </Switch>
      </BrowserRouter>


      {/* 👨‍💼 Your account is in the top right with a wallet at connect options */}
      <div style={{ position: "fixed", textAlign: "right", right: 0, top: 0, padding: 10 }}>
         <Account
           address={address}
           localProvider={localProvider}
           userProvider={userProvider}
           mainnetProvider={mainnetProvider}
           web3Modal={web3Modal}
           loadWeb3Modal={loadWeb3Modal}
           logoutOfWeb3Modal={logoutOfWeb3Modal}
           blockExplorer={blockExplorer}
           isMenu={true}
         />

      </div>
    </div>
  );
}


/*
  Web3 modal helps us "connect" external wallets:
*/
const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions: {
    injected: {
      package: null, // required
    },
  },
});

const logoutOfWeb3Modal = async () => {
  await web3Modal.clearCachedProvider();
  setTimeout(() => {
    window.location.reload();
  }, 1);
};

export default App;
