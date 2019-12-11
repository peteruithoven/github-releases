import { gql } from 'apollo-boost';

const query = gql`
  {
    viewer {
      organizations(last: 100) {
        nodes {
          id
          name
        }
      }
    }
  }
`;
export default query;
