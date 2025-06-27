"use client";

import { usePokemonContext } from "../context/PokemonContext";
import { PokemonCard } from "./PokemonCard";

export default function PokemonGrid() {
  const { pokemons, isLoading, error } = usePokemonContext();

  const handleClick = (pokemon: any) => {
    console.log("Click en:", pokemon.name);
    // Aquí más adelante abriremos el Modal con detalles
  };

  if (isLoading) return <p>Cargando Pokémon...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
      {pokemons.map((p) => (
        <PokemonCard key={p.id} pokemon={p} onClick={handleClick} />
      ))}
    </div>
  );
}
