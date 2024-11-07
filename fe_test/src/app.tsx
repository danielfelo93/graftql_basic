import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_POKEMON } from './queries/pokemonQuery'
const App: React.FC = () => {
    const { loading, error, data } = useQuery(GET_POKEMON);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;
    const pokemons: any[] = data?.getEmployees;
    return (
        <>
            <h2>Nuevo app</h2>
            {pokemons.map((pokemon: any) => (
                <div key={pokemon?._id}>
                    <p>{pokemon?.name}</p>
                </div>
            )
            )
            }
        </>
    )
}

export default App;