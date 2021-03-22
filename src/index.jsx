import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Spin } from 'antd';
import "./index.css";

let subgraphUri = "http://localhost:8000/subgraphs/name/scaffold-eth/your-contract"

const client = new ApolloClient({
  uri: subgraphUri,
  cache: new InMemoryCache()
});
const App = React.lazy(() => import('./App'));
ReactDOM.render(
  <ApolloProvider client={client}>
    <Suspense fallback={<Spin />}>
    <App subgraphUri={subgraphUri}/>
    </Suspense>
  </ApolloProvider>,
  document.getElementById("root"),
);
