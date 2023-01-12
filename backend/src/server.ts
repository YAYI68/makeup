import { userModel } from './models/user';
import { resolvers } from './resolvers/user';
import { typeDefs } from './typeDefs/user';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { productModel } from './models/product';





const server = new ApolloServer({
    typeDefs,
    resolvers,
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