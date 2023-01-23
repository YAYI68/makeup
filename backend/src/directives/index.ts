import { authenticationDirectiveTransformer, authorizationDirectiveTransformer } from "./auth";
import { lowerDirectiveTransformer, upperDirectiveTransformer } from "./utils";

export const transformers = [
    {
      name: 'lowercase',
      transformer:lowerDirectiveTransformer
    },
    {
      name: 'uppercase',
      transformer:upperDirectiveTransformer
    },
    {
      name:"authenticate",
      transformer:authenticationDirectiveTransformer
    },
    {
      name:"authorize",
      transformer:authorizationDirectiveTransformer
    }
 
  ]

  
