// where a is the previous directives and b is the next directives  and schema is the initial schema 
export const combineSchemaDirectives = (directiveTransformer,schema)=>{
    const newSchema = directiveTransformer.reduce((a,b)=>b.transformer(a,b.name),schema)
    return newSchema
}
