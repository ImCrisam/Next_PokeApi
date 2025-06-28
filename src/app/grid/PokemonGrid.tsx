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
    <div
      className="pokemon-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "2rem",
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {pokemons.map((p) => (
        <PokemonCard key={p.id} pokemon={p} onClick={handleClick} />
      ))}
    </div>
  );
}
