import { loadContractEventsFx } from './'

/**
 * Create effector store for contract events
 *
 *  1. Create store for events of form:
 *      {
 *      contractName: {
 *          eventName: []
 *  }
 *  }
 *  2. Get events from contract store?
 */

loadContractEventsFx.use((contract) => {
  return {
    [contract.name]: contract.contract.interface.events
  }
})

loadContractEventsFx.done.watch(payload => {
  console.log('Events loaded: ', payload)
})

loadContractEventsFx.fail.watch(({ params, error }) => {
  console.log('Fail with params', params, 'and error', error)
})
