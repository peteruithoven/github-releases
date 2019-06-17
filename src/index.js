import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import 'typeface-roboto';
import App from './components/App.js';
import * as serviceWorker from './serviceWorker';
import theme from './theme.js';
import { getLocalToken } from './hooks/useGithubToken';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  request: async operation => {
    const token = getLocalToken();
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={theme}>
      <>
        <CssBaseline />
        <App />
      </>
    </MuiThemeProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
