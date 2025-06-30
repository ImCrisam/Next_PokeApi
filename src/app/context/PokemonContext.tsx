"use client";

import React, { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { Pokemon, PokemonTypeInfo } from "../types/Pokemon";
import { searchByName, filterByTypes, sortByField } from "../utils/filterAndSorts";

import { usePokemonTypes } from "../hooks/usePokemonTypes";

type PokemonContextType = {
  pokemons: Pokemon[];
  isLoading: boolean;
  types: Map<string, PokemonTypeInfo>;
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
  selectedPokemon: {
    value: Pokemon | null;
    set: React.Dispatch<React.SetStateAction<Pokemon | null>>;
  };

  clearFilters: () => void;
  getTypeGlassBackground: (
    types: { type: PokemonTypeInfo }[] ,
    options?: { deg?: number; opacity?: number }
  ) => string;
};

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

type PokemonProviderProps = {
  children: ReactNode;
};

export function PokemonProvider({ children }: PokemonProviderProps) {
  const { allPokemoms, types, isLoading, error } = usePokemonTypes();
  const [filteredTypes, setFilteredTypes] = useState<string[]>([]);
  const [sortField, setSortField] = useState<keyof Pokemon>("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchName, setSearchName] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  // Memo para filtrar, buscar y ordenar
  const filteredPokemons = useMemo(() => {
    let result = filterByTypes(allPokemoms,filteredTypes );
    result = searchByName(result, searchName);
    result = sortByField(result, sortField, sortOrder);
    return result;
  }, [allPokemoms, filteredTypes, sortField, sortOrder, searchName]);

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
  const selectedPokemonState = {
    value: selectedPokemon,
    set: setSelectedPokemon,
  };

  // Función para limpiar todos los filtros y búsqueda
  const clearFilters = () => {
    setFilteredTypes([]);
    setSortField("id");
    setSortOrder("asc");
    setSearchName("");
  };

  // Función para obtener el background glass de tipos
  const getTypeGlassBackground = (
    types: { type: PokemonTypeInfo }[] = [],
    options?: { deg?: number; opacity?: number }
  ):string => {
    const theme:"lite"| "dark" = "dark" // cambio de thema con el contexto de theme
    const deg = options?.deg ?? 135;
    const opacity = options?.opacity ?? "";
    const alterColor = theme === "dark" ? types[0].type.darkColor : types[0].type.liteColor;
    if (types.length === 1) {
      return `linear-gradient(${deg}deg, ${types[0].type.color+opacity}, ${alterColor!+opacity})`;
    } else if (types.length > 1) {
      return `linear-gradient(${deg}deg, ${types[0].type.color+opacity}, ${types[1].type.color+opacity})`;
    } else {
      return "#e5e7eb";
    }
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
      clearFilters,
      getTypeGlassBackground,
      selectedPokemon: selectedPokemonState,
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
