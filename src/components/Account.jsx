import React from 'react'
import TokenBalance from './TokenBalance'
import { useExternalContractLoader } from '../hooks'
import Button from '@material-ui/core/Button'
import { TOKEN_ABI } from '../constants'
// should just have wallet connect buttons that show current balance of VOTE
export default function Account ({
  address,
  userProvider,
  localProvider,
  mainnetProvider,
  wallet,
  minimized,
  web3Modal,
  loadWeb3Modal,
  logoutOfWeb3Modal,
  blockExplorer,
  voteToken,
  isMenu
}) {
  const tokenKovan = useExternalContractLoader(localProvider, '0xF792BcAa0c7cfFac6BDcBC5C647Ffe91758283FA', TOKEN_ABI)

  return (
    <span>
      {wallet.status === 'connected'
        ? (
          <div>
            <div>Account: {wallet.account}</div>
            <div>Balance: <TokenBalance address={address} contract={tokenKovan} /></div>
            <Button data-cy='wallet' onClick={() => wallet.reset()}>disconnect</Button>
          </div>
          )
        : (
          <div>
            <Button data-cy='wallet' color='secondary' variant='outlined' onClick={() => wallet.connect()}>Connect</Button>
          </div>
          )}
    </span>
  )
}
