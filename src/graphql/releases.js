import { gql } from "apollo-boost";

const query = gql`
query Releases ($organization: String!) {
  organization (login: $organization) {
    repositories (last: 100) {
      edges {
        node {
          id
          name
          url
          releases (last: 10){
            edges {
              node {
                id
                name
                tagName
                createdAt
                url
                description
              }
            }
          }
        }
      }
    }
  }
}
`
export default query;
