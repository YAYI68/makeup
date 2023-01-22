import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { defaultFieldResolver } from "graphql";


function upperDirectiveTransformer(schema,directiveName){

    return mapSchema(schema,{
        [MapperKind.OBJECT_FIELD]: (fieldConfig)=>{
            const upperDirective = getDirective(schema,fieldConfig,directiveName)?.[0]
            console.log({upperDirective})

            if(upperDirective){
                const { resolve = defaultFieldResolver } = fieldConfig;

                fieldConfig.resolve = async function (sources,args,context,info) {
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