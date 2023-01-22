Building a backend api for a ecommerce makeup projects 

Buiding multiple files schema in apollo server
-the typeDefs should be created with gql from graphql-tag
- Using buildSubgraphSchema 
  const schema = buildSubgraphSchema([
  { typeDefs:userTypeDefs, resolvers:userResolvers },
  { typeDefs:productTypeDefs, resolvers:productResolvers },
])

In this case the buildSubgraphSchema will takes in an array of objects containing the typeDefs and resolvers 
Once a type is defined in any of the  typeDefs it's can be redefined in another typeDefs with the same name. We can only extends from the typeDefs to another typeDef by using the extend keyword
- using makeExecutableSchema and merge from lodash 
  
  import { merge } from 'lodash' 
  import { makeExecutableSchema } from '@graphql-tools/schema'

    const schema = makeExecutableSchema({
    typeDefs: [userTypeDefs,productTypeDefs],
    resolvers:merge(userResolvers,productResolvers),
  })


Using authenticate a








