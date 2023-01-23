

import prisma from "../db";
import { GraphQLError } from 'graphql';
import { verifyPassword, hashPassword,createToken } from './../utils/auth';

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
   async userProfile(email){
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
    },

    async getAllUser (){
      const users = await prisma.user.findMany({
        select:{
          id:true,
          role:true,
          email:true,
          firstName:true,
          lastName:true
        }
      })
      return users
    },

    async editProfile (id,input){
      const user = await prisma.user.update({
        where:{
          id:id,
        },
        data:{
         firstName:input.firstName,
         lastName:input.lastName,
         email:input.email 
        },
        select:{
          id:true,
          firstName:true,
          lastName:true,
          email:true,
        }
      })
      return user
    },
    async changeUserRole (id,input){
      const user = await prisma.user.update({
        where:{id:id},
        data:{
          role:input.role
        },
        select:{
          id:true,
          firstName:true,
          lastName:true,
          email:true,
          role:true
        }
      })
    },
    async changepassword (id,input){
      const password = await hashPassword(input.password)
      const user = await prisma.user.update({
        where:{id:id},
        data:{
          password:password
        }
      })
      return {message:'User password change successfully'}
    }

}