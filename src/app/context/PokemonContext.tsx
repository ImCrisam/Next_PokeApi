"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode, useRef, useMemo } from "react";
import { fetchAllPokemons } from "../services/pokemonService";
import { Pokemon } from "../types/Pokemon";
import { searchByName, filterByTypes, sortByField } from "../utils/filterAndSorts";

type PokemonContextType = {
  pokemons: Pokemon[];
  isLoading: boolean;
  types: string[];
  error: string | null;
  filterTypes: {
    value: string[];
    set: React.Dispatch<React.SetStateAction<string[]>>;
  };
  sort: {
    field: keyof Pokemon;
    setField: React.Dispatch<React.SetStateAction<keyof Pokemon>>;
    order: "asc" | "desc";
    setOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
  };
  search: {
    value: string;
    set: React.Dispatch<React.SetStateAction<string>>;
  };
  clearFilters: () => void; // Nueva función para limpiar filtros
};

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

type PokemonProviderProps = {
  children: ReactNode;
};

export function PokemonProvider({ children }: PokemonProviderProps) {
  const allPokemonsRef = useRef<Pokemon[]>([]); 
  const [types, setTypes] = useState<string[]>([]);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]); // Los que se muestran (filtrados)
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredTypes, setFilteredTypes] = useState<string[]>([]);
  const [sortField, setSortField] = useState<keyof Pokemon>("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    const loadPokemons = async () => {
      try {
        const data = await fetchAllPokemons();
        allPokemonsRef.current = data; 
        setPokemons(data);
        const allTypes = new Set<string>();
        data.forEach((p) => {
          p.types.forEach((t) => allTypes.add(t.type.name));
        });
        setTypes(Array.from(allTypes).sort());
      } catch (err) {
        setError("Error al cargar los Pokémon.");
      } finally {
        setIsLoading(false);
      }
    };

    loadPokemons();
  }, []);


  // Memo para filtrar, buscar y ordenar
  const filteredPokemons = useMemo(() => {
    let result = filterByTypes(pokemons, filteredTypes);
    if (searchName) {
      result = searchByName(result, searchName);
    }
    result = sortByField(result, sortField, sortOrder);
    return result;
  }, [pokemons, filteredTypes, sortField, sortOrder, searchName]);

  // Agrupar filtros y orden en objetos para exponer value/set
  const filterTypes = {
    value: filteredTypes,
    set: setFilteredTypes,
  };
  const sort = {
    field: sortField,
    setField: setSortField,
    order: sortOrder,
    setOrder: setSortOrder,
  };
  const search = {
    value: searchName,
    set: setSearchName,
  };

  // Función para limpiar todos los filtros y búsqueda
  const clearFilters = () => {
    setFilteredTypes([]);
    setSortField("id");
    setSortOrder("asc");
    setSearchName("");
  };

  return (
    <PokemonContext.Provider value={{
      pokemons: filteredPokemons,
      types,
      isLoading,
      error,
      filterTypes,
      sort,
      search,
      clearFilters
    }}>
      {children}
    </PokemonContext.Provider>
  );
}

export function usePokemonContext(): PokemonContextType {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error("usePokemonContext debe usarse dentro de un PokemonProvider");
  }
  return context;
}
