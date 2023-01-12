import { gql } from 'graphql-tag';

export const orderTypeDefs = gql`

type Order {
 name: String     
}

extend  type Query {
 allOrders: [Order]
}
`;

export const orderResolvers = {
    Query: {
        allOrders: (_,__,ctx) =>{
         ctx.product.allProduct();
        return [{name:'Order 1 '}]
      },
    },
  };