

import prisma from "../db";
import { createToken, hashPassword } from "../utils/auth";
import { GraphQLError } from 'graphql';
import { verifyPassword } from './../utils/auth';

export const userModel = {
    async signUp(data){
           const password = await hashPassword(data.password)
         const user = await prisma.user.create({
           data:{
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: password
           }
         })
         const token = createToken(user)
         return {token,role:user.role,email:user.email}
    },
    async signIn({email,password}){
        const user = await prisma.user.findUnique({
          where: {
            email:email,
          },
        })
        if (!user){
          throw new GraphQLError("Invalid email/password ",{
            extensions: { code: 'UNAUTHENTICATED' }
        })
        }
        const isValid = verifyPassword(password,user.password)
        if (!isValid){
          throw new GraphQLError("Invalid email/password ",{
            extensions: { code: 'UNAUTHENTICATED' }
        })
        }
        const token = createToken(user)
        return{token,email:user.email,role:user.role}
    },
   async singleUser(email){
    console.log(email)
      const user =  await prisma.user.findUnique({
        where: { email: email},
        select:{
          id:true,
          role:true,
          email:true,
          firstName:true,
          lastName:true
        }
      })
  
      return user
    }

}