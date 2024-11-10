//import { gql, DocumentNode } from "apollo-boost";
import { gql, DocumentNode } from "@apollo/client";

export const GET_POKEMONS: DocumentNode = gql`
{
  getPokemons{
    _id,
     name,
     type
  }
}
`;