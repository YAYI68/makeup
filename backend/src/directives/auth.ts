import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { defaultFieldResolver,GraphQLError,GraphQLString } from "graphql";


export function authenticationDirectiveTransformer(schema,directiveName){

    return mapSchema(schema,{
        [MapperKind.OBJECT_FIELD]:(fieldConfig)=>{
            const authenticationDirective = getDirective(schema,fieldConfig,directiveName)?.[0]
            if(authenticationDirective){
                const { resolve = defaultFieldResolver } = fieldConfig
                fieldConfig.resolve = async (root,args,context,info)=>{
                    if(!context.auth){
                        throw new GraphQLError("User needs to login first ",{
                            extensions: { code: 'UNAUTHENTICATED' }
                        })
                    }
                    const result = resolve(root,args,context,info)
                    return result
                }
            }
            return fieldConfig
        }


    })

}

export function authorizationDirectiveTransformer(schema,directiveName){

    return mapSchema(schema,{
        [MapperKind.OBJECT_FIELD]:(fieldConfig)=>{
            const authorizationDirective = getDirective(schema,fieldConfig,directiveName)?.[0]
            if(authorizationDirective){
                const { resolve = defaultFieldResolver } = fieldConfig

                // collect the role  args variables pass from the types definition
                const {role} = authorizationDirective
                console.log({role})
                fieldConfig.resolve = async (root,args,context,info)=>{
                      
                    if(context.auth && !role.includes(context.auth.role)){
                        throw new GraphQLError(`User is not ${role}`,{
                            extensions: { code: 'AUTHORIZATION_ERROR' }
                        })
                    }
                    const result = resolve(root,args,context,info)
                    return result
                }
            }
            return fieldConfig
        }


    })

}