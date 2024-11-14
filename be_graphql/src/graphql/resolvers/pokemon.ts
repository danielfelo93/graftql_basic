import { IResolvers } from '@graphql-tools/utils';
import { Db, ObjectId } from 'mongodb';

const pokemonResolver: IResolvers = {
    Query: {
        getPokemons: async (parent, args, context: Db) => {
            try {
                return await context.collection('pokemons').find().toArray() ?? [];
            } catch (error) {
                console.log(error);
                return [];
            }
        }
    },
    Mutation: {
        createPokemon: async (parent, args, context: Db) => {
            try {
                const reg_ex = new RegExp(args?.pokemon?.name, 'i');
                const pokemonColl = await context.collection('pokemons').findOne({ name: reg_ex });
                console.log(pokemonColl);
                if (pokemonColl) throw new Error("Pokemon already registered");

                await context.collection('pokemons').insertOne(args.pokemon);
                return "Pokemon entry created successfully";
            } catch (error) {
                console.log(error);
                return error;
            }
        },
        updatePokemon: async (parent, args, context: Db) => {
            try {
                const { _id, pokemon } = args;
                
                // Verifica que el ID del Pokémon sea válido
                if (!ObjectId.isValid(_id)) {
                    throw new Error("Invalid Pokémon ID");
                }
        
                const result = await context.collection('pokemons').updateOne(
                    { _id: new ObjectId(_id) },
                    { $set: pokemon }
                );
        
                if (result.matchedCount === 0) {
                    throw new Error("Pokémon not found");
                }
        
                return "Pokémon updated successfully";
            } catch (error) {
                console.log(error);
                return "Error updating Pokémon";
            }
        },
        deletePokemon: async (parent, args, context: Db) => {
            try {
                const { _id } = args;
        
                // Verifica que el ID del Pokémon sea válido
                if (!ObjectId.isValid(_id)) {
                    throw new Error("Invalid Pokémon ID");
                }
        
                const result = await context.collection('pokemons').deleteOne({ _id: new ObjectId(_id) });
        
                if (result.deletedCount === 0) {
                    throw new Error("Pokémon not found");
                }
        
                return "Pokémon deleted successfully";
            } catch (error) {
                console.log(error);
                return "Error deleting Pokémon";
            }
        }

    },
    Pokemon: {
        async skills(parent, args, context: Db) {
            try {
                // Filtra y convierte solo los IDs válidos a ObjectId antes de hacer la búsqueda
                const validSkillsIds = parent.skills
                    .filter((id: string) => ObjectId.isValid(id))
                    .map((id: string) => new ObjectId(id));
    
                // Usa $in para buscar múltiples ObjectIds en una sola operación de base de datos
                return await context.collection('skills')
                    .find({ _id: { $in: validSkillsIds } })
                    .toArray();
            } catch (error) {
                console.log(error);
                throw new Error("Error retrieving skills");
            }
        }
    }
}

export default pokemonResolver;