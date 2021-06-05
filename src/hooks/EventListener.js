import { useState, useEffect } from 'react'

export default function useEventListener (contracts, contractName, eventName, provider, startBlock, args) {
  const [updates, setUpdates] = useState([])

  useEffect(() => {
    if (typeof provider !== 'undefined' && typeof startBlock !== 'undefined') {
      // if you want to read _all_ events from your contracts, set this to the block number it is deployed
      provider.resetEventsBlock(startBlock)
    }
    if (contracts && contractName && contracts[contractName]) {
      try {
        contracts[contractName].on(eventName, (...args) => {
          const blockNumber = args[args.length - 1].blockNumber
          console.log('event happened!')
          console.log(Object.assign({ blockNumber }, args.pop().args))
          setUpdates(messages => [Object.assign({ blockNumber }, args.pop().args), ...messages])
        })
        return () => {
          contracts[contractName].removeListener(eventName)
        }
      } catch (e) {
        console.log('something went wrong')
        console.log(e)
      }
    }
  }, [provider, startBlock, contracts, contractName, eventName])

  return updates
}
