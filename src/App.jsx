import React, { useEffect, useState, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "antd/dist/antd.css";
import "./App.css";
import CircularProgress from '@material-ui/core/CircularProgress';
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
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AccountCircle, Code, Email } from '@material-ui/icons';
import { Footer } from 'components-extra';

// 😬 Sorry for all the console logging 🤡
const DEBUG = true

const Pools = React.lazy(() => import('./views/Pools'));
const ChildPool = React.lazy(() => import('./views/ChildPool'));
const Ideas = React.lazy(() => import ('./views/Ideas'));
const Home = React.lazy(() => import ('./views/Home'));
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
  }, [wallet.status])
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
      <BrowserRouter>
        <Paper className="app">
        <CssBaseline/>
        <Grid container direction="column" wrap="nowrap">
          <Grid item>
            <Header address={eth_hooks.address} userProvider={userProvider} localProvider={eth_hooks.provider} wallet={wallet} />
          </Grid>
          {
            /**
             * TODO: 
             * Make mui menu and move this there
             * Make better homepage
             * Add above to storybook
             * fix bugs
             * etc...
             * 
             * 
             * Potential new pages:
             * Portfolio
             * Market
             * Use pools as a search tool and have a pools page
             * */
          }
          <Grid item>
            <ul>
            <Switch>
            <Suspense fallback={<CircularProgress />}>
              <Route exact path="/">
                <Home />
              </Route>
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
            </ul>
          </Grid>
        </Grid>
        <Footer title="Idea Factory">
          <Footer.Column isInline>
            <Footer.Item icon={<AccountCircle />} href="#">
              My Account
            </Footer.Item>
            <Footer.Item icon={<Code />} onClick={() => console.log('Starting coding now!')}>
              Start Coding
            </Footer.Item>
            <Footer.Item icon={<Email />} href="lelain-dot-alexandre-at-gmail-dot-com">
              Contact Us
            </Footer.Item>
          </Footer.Column>
        </Footer>
        </Paper>
      </BrowserRouter>
  );
}

export default App;
