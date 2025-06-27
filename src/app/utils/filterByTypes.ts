import { Pokemon } from "../models/Pokemon";

export function filterByTypes(pokemons: Pokemon[], types: string[]): Pokemon[] {
  if (!types.length) return pokemons;
  return pokemons.filter((p) => types.every((type) => p.types.includes(type)));
}