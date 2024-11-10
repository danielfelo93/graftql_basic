import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_POKEMONS } from './queries/pokemonQuery'
const App: React.FC = () => {
    const { loading, error, data } = useQuery(GET_POKEMONS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;
    const pokemons: any[] = data?.getPokemons;
    return (
        <>
            <h2>New Pokemon app</h2>
            {pokemons.map((pokemon: any) => (
                <div key={pokemon?._id}>
                    <p>{pokemon?.name}</p>
                    <p>{pokemon?.type}</p>
                </div>
            )
            )
            }
        </>
    )
}

export default App;