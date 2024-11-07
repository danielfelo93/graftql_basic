//import { gql, DocumentNode } from "apollo-boost";
import { gql, DocumentNode } from "@apollo/client";

export const GET_POKEMON: DocumentNode = gql`
{
  getpokemons{
    _id,
     name
  }
}
`;