import {loadContractFx, $contracts } from './';
import { Contract } from "@ethersproject/contracts";

loadContractFx.use(async ({provider, address, ABI, name}) => {
    //load contract
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
          return {
              [name]: contract,
          }
        } catch (e) {
          console.log("ERROR LOADING EXTERNAL CONTRACT AT "+address+" (check provider, address, and ABI)!!", e);
        }
    }
});

$contracts.on(
    loadContractFx.doneData,
    (state, params) => ({
        ...state,
        ...params
    })
);
