import {GraphQLSchema} from 'graphql';
import 'graphql-import-node';
import { makeExecutableSchema, mergeSchemas } from '@graphql-tools/schema';
import mergeTypeDefs from 'graphql-tools-merge-typedefs';
import  skillSchema from './schemas/skill.graphql';
import  pokemonSchema from './schemas/pokemon.graphql';
import  userSchema from './schemas/user.graphql';
import pokemonResolver from "./resolvers/pokemon";
import skillResolver from './resolvers/skill';
import userResolver from './resolvers/user';



export const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs: mergeTypeDefs ([
        pokemonSchema,
        skillSchema,
        userSchema,
    ]),
    resolvers: [pokemonResolver, skillResolver, userResolver]
});