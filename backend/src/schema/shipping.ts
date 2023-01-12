import { gql } from 'graphql-tag';

export const shippingTypeDefs = gql`

type Shipping {
 city: String     
}

extend  type Query {
 allAddress: [Shipping]
}
`;

export const shippingResolvers = {
    Query: {
        allAddress: (_,__,ctx) =>{
        return [{city:'Lagos'}]
      },
    },
  };