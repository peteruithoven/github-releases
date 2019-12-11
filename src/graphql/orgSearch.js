import { gql } from 'apollo-boost';

const query = gql`
  query search($queryString: String!) {
    search(query: $queryString, type: USER, first: 10) {
      userCount
      nodes {
        ... on Organization {
          name
          login
        }
        ... on User {
          name
          login
        }
      }
    }
  }
`;
export default query;
