import { authenticate } from './../utils/auth';



import { GraphQLError } from "graphql";
import gql from "graphql-tag";


export const userTypeDefs = gql`
  directive @uppercase(text:String = "Hello") on FIELD_DEFINITION
  directive @lowercase on FIELD_DEFINITION

  directive @authenticate on FIELD_DEFINITION
  directive @authorize(role:[Role]) on FIELD_DEFINITION



 enum Role  {
  STAFF
  ADMIN
  CLIENT
 }

 type User {
  id    :    String
  createdAt: String  
  firstName: String!  @uppercase 
  lastName:  String!  @lowercase 
  email :    String !  
  password:  String!
  role  :    Role     
 }

 input  signUpInput {
   firstName: String!
   lastName: String!
   email: String!
   password: String!
 }

 input signInput {
     email: String!
     password: String!
 }

 type AuthPayload{
  token: String
  email: String
  role:String
 }

 input changePasswordInput{
  password: String!
 }

 input editUserInput{
  firstName: String
  lastName:  String
  email :    String 
 }

 type Success {
  message: String
 }

type Query {
  me(email:String!): User @authenticate 
  allUser:[User]!   @authorize(role:[ADMIN,STAFF]) @authenticate  
}
type Mutation {
  signup(input:signUpInput): AuthPayload!
  invite: User  @authorize(role:[ADMIN])  @authenticate
  logIn(input:signInput): AuthPayload!
  editUser(id:String,input:editUserInput): User! @authenticate
  changePassword(id:String,input:changePasswordInput): Success! @authenticate
}
`;


export const userResolvers = {
    Query: {
      me:async (_,{email},ctx) => {
        if(email !== ctx.auth.email){
          throw new GraphQLError("User cannot access this profile",{
            extensions: { code: 'AUTHORIZATION_ERROR' }
          })
        }
        const profile = await ctx.user.userProfile(ctx.auth.email)
        return profile
      },
      invite:async (_,__,ctx) => {
        const profile = await ctx.user.userProfile(ctx.auth.email)
        return profile
      },
      allUser: async(_,__,ctx)=>{
         const users = await ctx.user.getAllUser()
         return users
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
      },
      editUser: async(_,{id,input},ctx) =>{
        if(id !== ctx.auth.id){
          throw new GraphQLError("User cannot edit this profile ",{
            extensions: { code: 'AUTHORIZATION_ERROR' }
          })
        }
       const user = await ctx.user.editProfile(id,input)
       return user
      },
      changePassword: async(_,__,{id,input,ctx})=>{
        if(id !== ctx.auth.id){
          throw new GraphQLError("User cannot change Password ",{
            extensions: { code: 'AUTHORIZATION_ERROR' }
          })
        }
        const result = await ctx.user.changePassword(id,input)
        return result 
      }
    }
  };


 