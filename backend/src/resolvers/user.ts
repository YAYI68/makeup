
const books = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    },
  ];

  


export const resolvers = {
    Query: {
      signup: (_,__,ctx) =>{
         ctx.user.signUp();
        return {token:'Hello from token'}
      },
    },
  };