/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import { Contract } from '@ethersproject/contracts'
import { useState, useEffect } from 'react'

const loadContract = async (contractName, signer) => {
  const newContract = await new Contract(
    require(`../contracts/${contractName}.address.js`),
    require(`../contracts/${contractName}.abi.js`),
    signer
  )
  try {
    newContract.bytecode = require(`../contracts/${contractName}.bytecode.js`)
  } catch (e) {
    console.log(e)
  }
  return newContract
}

export default function useContractLoader (providerOrSigner) {
  const [contracts, setContracts] = useState()
  useEffect(() => {
    async function loadContracts () {
      console.log(providerOrSigner)
      if (typeof providerOrSigner !== 'undefined') {
        try {
          // we need to check to see if this providerOrSigner has a signer or not
          let signer
          let accounts
          if (providerOrSigner && typeof providerOrSigner.listAccounts === 'function') {
            accounts = await providerOrSigner.listAccounts()
          }

          if (accounts && accounts.length > 0) {
            signer = providerOrSigner.getSigner()
          } else {
            signer = providerOrSigner
          }

          const contractList = require('../contracts/contracts.js')

          const newContracts = await contractList.reduce((accumulator, contractName) => {
            accumulator[contractName] = loadContract(contractName, signer)
            return accumulator
          }, {})
          console.log('setting contracts', newContracts)
          setContracts(newContracts)
        } catch (e) {
          console.log('ERROR LOADING CONTRACTS!!', e)
        }
      }
    }
    loadContracts()
  }, [providerOrSigner])
  return contracts
}
