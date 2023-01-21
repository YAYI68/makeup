import { getUserToken } from './utils/auth';

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloServerPluginInlineTraceDisabled } from '@apollo/server/plugin/disabled';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { shippingResolvers, shippingTypeDefs } from './schema/shipping';
import { userResolvers, userTypeDefs } from './schema/user';
import { productResolvers, productTypeDefs } from './schema/product';
import { orderResolvers, orderTypeDefs } from './schema/order';
import { productModel,userModel,orderModel,shippingModel } from './models';

const schema = buildSubgraphSchema([
  { typeDefs:userTypeDefs, resolvers:userResolvers },
  { typeDefs:productTypeDefs, resolvers:productResolvers },
   {typeDefs:orderTypeDefs, resolvers:orderResolvers},
   {typeDefs:shippingTypeDefs, resolvers:shippingResolvers}
])


const server = new ApolloServer({
      schema,
      plugins: [ApolloServerPluginInlineTraceDisabled()],
  });
  
  
const runserver = async() => {
    const { url } = await startStandaloneServer(server, {
      context: async ({ req }) =>{
        let auth;
        if(req.headers.authorization){
          const [_,token]= req.headers.authorization.split(' ')
          auth = getUserToken(token)
        }
        
        return({
          auth:auth,
          user: userModel,
          product:productModel,
          order:orderModel,
          shipping:shippingModel,
        })
        
      },
        listen: { port: 4000 },
      });
      console.log(`🚀  Server ready at: ${url}`);
}

runserver();







  // const schema = makeExecutableSchema({
  //   typeDefs: [userTypeDefs,productTypeDefs],
  //   resolvers:merge(userResolvers,productResolvers),
  // })