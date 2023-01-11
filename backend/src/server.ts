import { resolvers } from './resolvers/user';
import { typeDefs } from './typeDefs/user';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';





const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  

const runserver = async() => {
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
      });
      console.log(`🚀  Server ready at: ${url}`);
}

runserver();