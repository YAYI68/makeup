
import gql from "graphql-tag";


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

 input  signUpInput {
   firstName: String
   lastName: String
   email: String
   password: String
 }

 input signInput {
     email: String
     password: String
 }

 type AuthPayload{
  token: String
  email: String
  role:String
 }

type Query {
  me: User
}
type Mutation {
  signup(input:signUpInput): AuthPayload
  logIn(input:signInput): AuthPayload
}
`;


export const userResolvers = {
    Query: {
      me: async (_,__ ,ctx) => {
        console.log({user:ctx.auth})
        const profile = await ctx.user.singleUser(ctx.auth.email)
        return profile
      }
    },
    Mutation:{
      signup: async(_,{input},ctx) =>{
        const user = await ctx.user.signUp(input);
        return user
      },
      logIn: async(_,{input},ctx) =>{
        const user = await ctx.user.signIn(input)
       return user
      }
    }
  };