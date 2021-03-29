import React, { useEffect, useState, Suspense } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import "antd/dist/antd.css";
import "./App.css";
import { Menu, Typography, Spin } from "antd";
import Web3Modal from "web3modal";
import { useGasPrice, useUserProvider, useContractLoader, useBalance, useExternalContractLoader } from "./hooks";
import { Header, Account } from "./components";
import { Transactor } from "./helpers";
import { formatEther } from "@ethersproject/units";
import {loadContractFx, $contracts } from './models/contracts/index';
import { getProviderFx, getGasPriceFx, getAddressFx } from './models/eth-hooks/index';
import { $eth_hooks } from './models/eth-hooks/init';
import { useStore } from "effector-react";
import { useWallet } from 'use-wallet'

// 😬 Sorry for all the console logging 🤡
const DEBUG = true
const { Paragraph, Title } = Typography;

const Pools = React.lazy(() => import('./views/Pools'));
const ChildPool = React.lazy(() => import('./views/ChildPool'));
const Ideas = React.lazy(() => import ('./views/Ideas'));
/**
 * TODO:
 *  Get rid of unused imports
 *  Refactor Pool view, Idea view, and ChildPool view
 *  More state stuff as needed
 *  Refactor UI
 *  Better Wallet connecting experience
 */



function App(props) {
  const contracts = useStore($contracts);
  const eth_hooks = useStore($eth_hooks);
  const wallet = useWallet();

  useEffect(() => {
    //load contracts once on page load
    //this should be fine, because if a new contract is deployed, we have to manually change the address and abi, etc
    getProviderFx();
    getGasPriceFx();
    //loadContractFx({provider: eth_hooks.provider, address: "0x3d56083D8A42326caf31FfdE98A9A112D6080176", ABI: FACTORY_ABI, name: 'ideaFactory'});
    //loadContractFx({provider: eth_hooks.provider, address: "0x2B193D5016981EEEbd3F663aC7ecA52e85d31325", ABI: pool_abi, name: 'poolCoordinator'});
  }, []);
  //Grab user address and balance when they connect a wallet
  useEffect(() => {
    getAddressFx({ account: wallet.account, balance: wallet.balance});
  }, [wallet])
  //I don't believe we need this, as we use eth-provider to load providers
  //Right now all this does is return the provider we pass in.
  const userProvider = useUserProvider(eth_hooks.provider);
  //make our own address hook using useWallet
  // The transactor wraps transactions and provides notificiations
  const tx = Transactor(userProvider, eth_hooks.gasPrice);

  
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
          </Route>
          <Suspense fallback={<Spin />}>
          <Route path="/pools">
            { contracts.poolCoordinator && 
              <Pools
                address={eth_hooks.address}
                userProvider={userProvider}
                localProvider={eth_hooks.provider}
                tx={tx}
                poolCoordinator={contracts.poolCoordinator}
              />
            }
          </Route>
          <Route path="/childpools/:address">
          { contracts.poolCoordinator && contracts.ideaFactory &&
            <ChildPool
              userProvider={userProvider}
              localProvider={eth_hooks.provider}
              tx={tx}
              poolCoordinator={contracts.poolCoordinator}
              ideaFactory={contracts.ideaFactory}
            />
          }
          </Route>
          <Route path="/ideas/:address">
          { contracts.poolCoordinator && contracts.ideaFactory && 
            <Ideas
              userAddress={eth_hooks.address}
              userProvider={userProvider}
              localProvider={eth_hooks.provider}
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
           address={eth_hooks.address}
           localProvider={eth_hooks.provider}
           userProvider={userProvider}
           wallet={wallet}
           isMenu={true}
         />

      </div>
    </div>
  );
}

export default App;
