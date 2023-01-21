import { hash,compare } from 'bcryptjs';
import { GraphQLError } from 'graphql';
import  jwt  from 'jsonwebtoken';


export const hashPassword = async(password:string ) : Promise<string>=>{
    const hashedpassword = await hash(password,8)
    return hashedpassword
}

export const verifyPassword = (password:string,hashPassword:string) : boolean=>{
    const isValid = compare(password,hashPassword)
    return isValid
}

export const authenticate = (next)=>(root,args,context,info)=>{
    if(!context.auth){
        throw new GraphQLError("User needs to login ",{
            extensions: { code: 'UNAUTHENTICATED' }
        })
    }
  return  next(root,args,context,info)
}

export const authorize = (role,next)=>(root,args,context,info)=>{
    if(context.auth.role !== role){
        throw new GraphQLError(`User is not ${role}`,{
            extensions: { code: 'UNAUTHENTICATED' }
        })
    }
   return next(root,args,context,info)
}


export const createToken = (user) => jwt.sign({id:user.id, role:user.role,email:user.email}, process.env.JWT_SECRET)

export const getUserToken = (req) => {   
     const authorization = req.headers.authorization
     if (authorization){
       const [_,token] = authorization.split(' ')
       const user = jwt.verify(token, process.env.JWT_SECRET)
       if(!user){
        throw new GraphQLError("Invalid email/password",{
            extensions: { code: 'UNAUTHENTICATED' }
        })
       }
       return user
     }
     throw new GraphQLError("User needs to login",{
        extensions: { code: 'UNAUTHENTICATED' }
    })
  
  }