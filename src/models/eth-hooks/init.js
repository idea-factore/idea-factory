import { getAddressFx, getGasPriceFx, getProviderFx, $gasPrice, $address, $provider } from './'
import { loadContractFx } from '../contracts/index'
import { combine, forward } from 'effector'
import provider from 'eth-provider'
import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers'
import { FACTORY_ABI, pool_abi } from '../../constants'

/**
 * TODO:
 *
 *  1. use eth-providers to connect to our provider
 *  2. store connected providers in our store
 *  3. connect useWallet to app to allow users to connect to a wallet
 *  4.  That uses their own store but we should be able to connect that to our effector store???
 *  5. Connect everything to App and remove unneeded hooks
 */

// get latest gas price data from gas station
getGasPriceFx.use(async () => {
  const gasPrices = await fetch('https://gasstation-mumbai.matic.today')
    .then(response => response.json())

  return gasPrices
})

// store connected address
getAddressFx.use(async ({ account, balance }) => ({ account, balance }))

// might not need this
getProviderFx.use(async () => {
  return await new Web3Provider(provider(['https://rpc-mumbai.maticvigil.com/', 'injected']))
})
$address.on(
  getAddressFx.doneData,
  (_, payload) => payload
)
$gasPrice.on(
  getGasPriceFx.doneData,
  (state, payload) => ({
    ...state,
    ...payload
  })
)
$provider.on(
  getProviderFx.doneData,
  (_, payload) => payload
)

forward({
  from: getProviderFx.doneData.map((result) => ({
    provider: result,
    name: 'ideaFactory',
    address: '0x3d56083D8A42326caf31FfdE98A9A112D6080176',
    ABI: FACTORY_ABI
  })),
  to: loadContractFx
})

forward({
  from: getProviderFx.doneData.map((result) => ({
    provider: result,
    name: 'poolCoordinator',
    address: '0x2B193D5016981EEEbd3F663aC7ecA52e85d31325',
    ABI: pool_abi
  })),
  to: loadContractFx
})

// combine above stores into single store
export const $eth_hooks = combine({
  gasPrice: $gasPrice,
  address: $address,
  provider: $provider
})
