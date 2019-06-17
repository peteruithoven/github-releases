import { gql } from 'apollo-boost';

const query = gql`
  {
    viewer {
      organizations(last: 100) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
`;
export default query;
