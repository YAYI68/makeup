import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { defaultFieldResolver,GraphQLString } from "graphql";


export function upperDirectiveTransformer(schema,directiveName){

    return mapSchema(schema,{
        [MapperKind.OBJECT_FIELD]: (fieldConfig)=>{
            const upperDirective = getDirective(schema,fieldConfig,directiveName)?.[0]
         
            if(upperDirective){
                const { resolve = defaultFieldResolver } = fieldConfig;
               const { text } = upperDirective
                if (!fieldConfig.args) {
                    throw new Error('Unexpected Error. args should be defined.')
                  }
                 
                // adding args comming from the client  
                  fieldConfig.args['clientText'] = {
                    type: GraphQLString
                  }
                  fieldConfig.type = GraphQLString

                fieldConfig.resolve = async function (sources,{clientText,...args},context,info) {
                    const newFormat = clientText || text
              
                    const result = resolve(sources,args,context,info)
                    if( typeof result === "string"){
                        return result.toUpperCase()
                    }
                    return result
                }
            }
            return fieldConfig
        }
    })
}


export function lowerDirectiveTransformer(schema,directiveName){

    return mapSchema(schema,{
        [MapperKind.OBJECT_FIELD]: (fieldConfig)=>{
            const upperDirective = getDirective(schema,fieldConfig,directiveName)?.[0]

            if(upperDirective){
                const { resolve = defaultFieldResolver } = fieldConfig;

                fieldConfig.resolve = async function (sources,args,context,info) {
            
                    const result = resolve(sources,args,context,info)
                    if( typeof result === "string"){
                        return result.toLowerCase()
                    }
                    return result
                }
            }
            return fieldConfig
        }
    })
}

