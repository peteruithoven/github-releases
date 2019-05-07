const gql = require('graphql-tag');
const ApolloClient = require('apollo-boost').ApolloClient;
const fetch = require('cross-fetch/polyfill').fetch;
const createHttpLink = require('apollo-link-http').createHttpLink;
const InMemoryCache = require('apollo-cache-inmemory').InMemoryCache;
const setContext = require('apollo-link-context').setContext;
require('dotenv').config();

const httpLink = createHttpLink({
    uri: "https://api.github.com/graphql",
    fetch: fetch
});

const token = process.env.REACT_APP_GITHUB_TOKEN;
console.log('token: ', token);

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
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
  .then(result => console.log(result))
  .catch(error => console.log(error));
