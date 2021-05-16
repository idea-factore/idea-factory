import {loadContractFx, $contracts } from './';
import { Contract } from "@ethersproject/contracts";
import { combine, forward } from "effector";
import { loadContractEventsFx } from '../events';

loadContractFx.use(async ({provider, address, ABI, name}) => {
    //load contract
    console.log("loading contract ", name);
    if (typeof provider !== "undefined" && address && ABI) {
        try {
          // we need to check to see if this provider has a signer or not
          let signer;
          const accounts = await provider.listAccounts();
          if (accounts && accounts.length > 0) {
            signer = provider.getSigner();
          } 
          else {
            signer = provider;
          }
          const contract = await new Contract(address, ABI, signer);
          /**
           * Probably change this to just return the contract
           * Since we manually pass in contracts to components?
           * Will look into it
           */
          return {
              name,
              [name]: { 
                contract 
              },
          }
        } catch (e) {
          console.log("ERROR LOADING EXTERNAL CONTRACT AT "+address+" (check provider, address, and ABI)!!", e);
        }
    }
});
const unsub = loadContractFx.watch(payload => {
  console.log("Load contract called with ", payload);
});
loadContractFx.doneData.watch(payload => {
  console.log("Contract loaded: ", payload);
})
$contracts.on(
    loadContractFx.doneData,
    (state, params) => ({
        ...state,
        ...params
    })
);

forward({
  from: loadContractFx.doneData.map((result) => ({
      name: result.name,
      contract: result[result.name].contract
  })),
  to: loadContractEventsFx
});

