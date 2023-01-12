import { userModel } from './models/user';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloServerPluginInlineTraceDisabled } from '@apollo/server/plugin/disabled';
import { productModel } from './models/product';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { userResolvers, userTypeDefs } from './schema/user';
import { productResolvers, productTypeDefs } from './schema/product';
import { merge } from 'lodash' 
import { makeExecutableSchema } from '@graphql-tools/schema'


const schema = buildSubgraphSchema([
  { typeDefs:userTypeDefs, resolvers:userResolvers },
  { typeDefs:productTypeDefs, resolvers:productResolvers },
])


const server = new ApolloServer({
      schema,
      plugins: [ApolloServerPluginInlineTraceDisabled()],
  });
  
  
const runserver = async() => {
    const { url } = await startStandaloneServer(server, {
      context: async ({ req, res }) => ({
        user: userModel,
        product:productModel,
      }),
        listen: { port: 4000 },
      });
      console.log(`🚀  Server ready at: ${url}`);
}

runserver();







  // const schema = makeExecutableSchema({
  //   typeDefs: [userTypeDefs,productTypeDefs],
  //   resolvers:merge(userResolvers,productResolvers),
  // })