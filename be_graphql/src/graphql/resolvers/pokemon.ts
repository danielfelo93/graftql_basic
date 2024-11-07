import { IResolvers } from '@graphql-tools/utils';
import { Db, ObjectId } from 'mongodb';

const pokemonResolver: IResolvers = {
    Query: {
        getPokemons: async (parent, args, context: Db) => {
            try {
                return await context.collection('pokemons').find().toArray() ?? [];
            } catch (error) {
                console.log(error);
            }
        }
    },
    Mutation: {
        createPokemon: async (parent, args, context: Db) => {
            try {
                const reg_ex = new RegExp(args?.pokemon?.name, 'i');
                const pokemonColl = await context.collection('pokemons').findOne({ name: reg_ex });
                console.log(pokemonColl);
                if (pokemonColl) throw new Error("Employee already exists");

                await context.collection('pokemons').insertOne(args.pokemon);
                return "Pokemon entry created successfully";
            } catch (error) {
                console.log(error);
                return error;
            }
        },
        updatePokemon: async (parent, args, context: Db) => {
            try {
                const { input } = args;
                const pokemonColl = await context.collection('pokemons').findOne({ _id: new ObjectId(args._id) });
                if (!pokemonColl) throw new Error("Pokemon not found");

                await context.collection('pokemons').updateOne(
                    { _id: new ObjectId(args._id) },
                    { $set: args.pokemon }
                );

                return "Pokemon updated successfully";
            } catch (error) {
                console.log(error);
            }
        },

    },
    Pokemon: {
        async skills(parent, args, context: Db) {
            try {
                const skillsList = parent.skills.map(async (id: String) => {
                    return await context.collection('Skills').findOne({ _id: new ObjectId(id.toString()) });
                });
                return skillsList;

            } catch (error) {
                console.log(error);
            }
        }
    }
}

export default pokemonResolver;