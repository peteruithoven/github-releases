import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const token = process.env.REACT_APP_GITHUB_TOKEN;
console.log('token: ', token);

const client = new ApolloClient({
  // uri: "https://48p1r2roz4.sse.codesandbox.io",
  uri: "https://api.github.com/graphql",
  // uri: "/graphql/v4/",
  request: async operation => {
    // const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
   }
});


client
  .query({
    query: gql`
      query {
        viewer {
          login
        }
      }
    `
  })
  .then(result => console.log(result));

ReactDOM.render((
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>)
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
