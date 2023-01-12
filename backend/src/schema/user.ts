
import gql from "graphql-tag";

gql
export const userTypeDefs = gql`

 enum Role  {
  STAFF
  ADMIN
  CLIENT
 }

 type User {
  id    :    String
  createdAt: String
  firstName: String!
  lastName:  String!
  email :    String !  
  password:  String!
  role  :    Role     
 }

 type AuthPayload{
  token: String
 }

type Query {
  signup: AuthPayload
}
`;










export const userResolvers = {
    Query: {
      signup: (_,__,ctx) =>{
         ctx.user.signUp();
        return {token:'Hello from token'}
      },
    },
  };