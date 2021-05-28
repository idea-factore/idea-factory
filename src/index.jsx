import React from 'react'
import ReactDOM from 'react-dom'
import { StyledProvider } from 'components-extra'
import { UseWalletProvider } from 'use-wallet'
import './index.css'
import './models/init'
import App from './App'
import { themeOptions } from './components/Theme'
import {
  Root,
  getContentBasedScheme
} from '@mui-treasury/layout'

const contentBasedScheme = getContentBasedScheme()

ReactDOM.render(
  <StyledProvider theme={themeOptions}>
    <UseWalletProvider chainId={80001}>
      <Root theme={themeOptions} scheme={contentBasedScheme}>
        <App />
      </Root>
    </UseWalletProvider>
  </StyledProvider>,
  document.getElementById('root')
)
