import { Pokemon } from "../../models/Pokemon";

export const filterPokemonsByTypes = (pokemons: Pokemon[], selectedTypes: string[]): Pokemon[] => {
  if (selectedTypes.length === 0) return pokemons;

  return pokemons.filter((p) =>
    selectedTypes.every((type) => p.types.includes(type))
  );
};
