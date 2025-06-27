import { Pokemon } from "../types/Pokemon";

export function filterByTypes(pokemons: Pokemon[], types: string[]): Pokemon[] {
  if (!types.length) return pokemons;
  return pokemons.filter((p) =>
    types.every((type) => p.types.some((t) => t.type.name === type))
  );
}