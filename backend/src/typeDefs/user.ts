
export const typeDefs = `#graphql

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
