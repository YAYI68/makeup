

export const resolvers = {
    Query: {
      signup: (_,__,ctx) =>{
         ctx.user.signUp();
        return {token:'Hello from token'}
      },
    },
  };