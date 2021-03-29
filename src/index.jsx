import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { UseWalletProvider } from "use-wallet";
import "./index.css";
import './models/init';
import App from "./App";

let subgraphUri = "http://localhost:8000/subgraphs/name/scaffold-eth/your-contract"

const client = new ApolloClient({
  uri: subgraphUri,
  cache: new InMemoryCache()
});
ReactDOM.render(
  <UseWalletProvider chainId={80001}>
  <ApolloProvider client={client}>
    <App subgraphUri={subgraphUri}/>
  </ApolloProvider>
  </UseWalletProvider>,
  document.getElementById("root"),
);
