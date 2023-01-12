import { gql } from 'graphql-tag';

export const productTypeDefs = gql`

type Product {
 name: String     
}

extend  type Query {
 allProduct: [Product]
}
`;

export const productResolvers = {
    Query: {
        allProduct: (_,__,ctx) =>{
         ctx.product.allProduct();
        return [{name:'yayi'}]
      },
    },
  };