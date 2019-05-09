import { gql } from "apollo-boost";

const query = gql`
{
  organization (login: "elementary") {
    repositories (first: 100) {
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
