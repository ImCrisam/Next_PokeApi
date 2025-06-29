import { Pokemon } from "../types/Pokemon";

export type SortOrder = "asc" | "desc";
export type SortField = keyof Pokemon;

export function sortByField<T>(
  array: T[],
  field: keyof T,
  order: SortOrder
): T[] {
  return [...array].sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return order === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    if (typeof aValue === "number" && typeof bValue === "number") {
      return order === "asc" ? aValue - bValue : bValue - aValue;
    }
    return 0;
  });
}

export function filterByTypes(pokemons: Pokemon[], types: string[]): Pokemon[] {
  if (!types.length) return pokemons;
  return pokemons.filter((p) =>
    types.every((type) => p.types.some((t) => t.type.name === type))
  );
}


export function searchByName<T extends { name: string }>(array: T[], name: string): T[] {
  if (!name) return array;
  return array.filter((item) =>
    item.name.toLowerCase().includes(name.toLowerCase())
  );
}