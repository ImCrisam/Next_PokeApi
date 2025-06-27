import { Pokemon } from "../models/Pokemon";

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