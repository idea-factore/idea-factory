import React, { useEffect, Suspense } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useUserProvider } from './hooks'
import { Header } from './components'
import { Transactor } from './helpers'
import { $contracts } from './models/contracts/index'
import { getProviderFx, getGasPriceFx, getAddressFx } from './models/eth-hooks/index'
import { $ethHooks } from './models/eth-hooks/init'
import { useStore } from 'effector-react'
import { useWallet } from 'use-wallet'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import CssBaseline from '@material-ui/core/CssBaseline'
import { FaDiscord, FaTwitter } from 'react-icons/fa'
import { Footer } from 'components-extra'
import styled from 'styled-components'
import {
  getHeader,
  getContent,
  getFooter
} from '@mui-treasury/layout'

const HeaderLayout = getHeader(styled)
const Content = getContent(styled)
const FooterLayout = getFooter(styled)

const Pools = React.lazy(() => import('./views/Pools'))
const ChildPool = React.lazy(() => import('./views/ChildPool'))
const Ideas = React.lazy(() => import('./views/Ideas'))
const Home = React.lazy(() => import('./views/Home'))
const CreateIdea = React.lazy(() => import('./views/CreateIdea'))
/**
 * TODO:
 *  Get rid of unused imports
 *  Refactor Pool view, Idea view, and ChildPool view
 *  More state stuff as needed
 *  Refactor UI
 *  Better Wallet connecting experience
 *
 * Look at using mui-treasury for better Layout
 *
 * Need to remove antd next I think
 */

function App (props) {
  const contracts = useStore($contracts)
  const ethHooks = useStore($ethHooks)
  const wallet = useWallet()

  useEffect(() => {
    // load contracts once on page load
    // this should be fine, because if a new contract is deployed, we have to manually change the address and abi, etc
    getProviderFx()
    getGasPriceFx()
    // loadContractFx({provider: eth_hooks.provider, address: "0x3d56083D8A42326caf31FfdE98A9A112D6080176", ABI: FACTORY_ABI, name: 'ideaFactory'});
    // loadContractFx({provider: eth_hooks.provider, address: "0x2B193D5016981EEEbd3F663aC7ecA52e85d31325", ABI: pool_abi, name: 'poolCoordinator'});
  }, [])
  // Grab user address and balance when they connect a wallet
  useEffect(() => {
    getAddressFx({ account: wallet.account, balance: wallet.balance })
  }, [wallet])
  // I don't believe we need this, as we use eth-provider to load providers
  // Right now all this does is return the provider we pass in.
  const userProvider = useUserProvider(ethHooks.provider)
  // make our own address hook using useWallet
  // The transactor wraps transactions and provides notificiations
  const tx = Transactor(userProvider, ethHooks.gasPrice)

  return (
    <BrowserRouter>
      <Paper className='app'>
        <CssBaseline />
        <Grid container direction='column' wrap='nowrap'>
          <Grid item>
            <HeaderLayout>
              <Header address={ethHooks.address} userProvider={userProvider} localProvider={ethHooks.provider} wallet={wallet} />
            </HeaderLayout>
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
            <Content>
              <Switch>
                <Suspense fallback={<CircularProgress />}>
                  <Route exact path='/'>
                    <Home />
                  </Route>
                  <Route path='/pools'>
                    {contracts.poolCoordinator &&
                      <Pools
                        address={ethHooks.address}
                        userProvider={userProvider}
                        localProvider={ethHooks.provider}
                        tx={tx}
                        poolCoordinator={contracts.poolCoordinator}
                      />}
                  </Route>
                  <Route path='/childpools/:address'>
                    {contracts.poolCoordinator && contracts.ideaFactory &&
                      <ChildPool
                        userProvider={userProvider}
                        localProvider={ethHooks.provider}
                        tx={tx}
                        poolCoordinator={contracts.poolCoordinator}
                        ideaFactory={contracts.ideaFactory}
                      />}
                  </Route>
                  <Route path='/ideas/:address'>
                    {contracts.poolCoordinator && contracts.ideaFactory &&
                      <Ideas
                        userAddress={ethHooks.address}
                        userProvider={userProvider}
                        localProvider={ethHooks.provider}
                        tx={tx}
                        poolCoordinator={contracts.poolCoordinator}
                        ideaFactory={contracts.ideaFactory}
                      />}
                  </Route>
                  <Route path='/createidea'>
                    {contracts.ideaFactory &&
                      <CreateIdea
                        address={ethHooks.address}
                        userProvider={userProvider}
                        ideaFactory={contracts.ideaFactory}
                      />}
                  </Route>
                </Suspense>
              </Switch>
            </Content>
          </Grid>
        </Grid>
        <FooterLayout>
          <Footer title='Connect with Us'>
            <Footer.Column>
              <Footer.Item data-cy='twitter' icon={<FaTwitter />} href='https://twitter.com/IdeaFactoryIdea'>
                Twitter
              </Footer.Item>
              <Footer.Item data-cy='discord' icon={<FaDiscord />} href='https://discord.gg/rv9sJxSuWs'>
                Discord
              </Footer.Item>
            </Footer.Column>
          </Footer>
        </FooterLayout>
      </Paper>
    </BrowserRouter>
  )
}

export default App
