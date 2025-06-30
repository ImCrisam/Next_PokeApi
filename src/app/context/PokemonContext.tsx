"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode, useRef, useMemo } from "react";
import { fetchAllPokemons } from "../services/pokemonService";
import { Pokemon } from "../types/Pokemon";
import { searchByName, filterByTypes, sortByField } from "../utils/filterAndSorts";
import { colours } from "../utils/colorsTypes";
import { usePokemonTypes } from "../hooks/usePokemonTypes";

type PokemonContextType = {
  pokemons: Pokemon[];
  isLoading: boolean;
  types: Map<string, { nameLocal: string; color: string }>;
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
  clearFilters: () => void;
  getTypeGlassBackground: (
    types: { type: { name: string } }[],
    options?: { deg?: number; opacity?: number }
  ) => { withOpacity: string; noOpacity: string };
  selectedPokemon: {
    value: Pokemon | null;
    set: React.Dispatch<React.SetStateAction<Pokemon | null>>;
  };
};

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

type PokemonProviderProps = {
  children: ReactNode;
};

export function PokemonProvider({ children }: PokemonProviderProps) {
  const { allPokemoms, types, isLoading, error } = usePokemonTypes();
  const [pokemons, setPokemons] = useState<Pokemon[]>(allPokemoms); // Los que se muestran (filtrados)
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
    setPokemons(allPokemoms)
    setFilteredTypes([]);
    setSortField("id");
    setSortOrder("asc");
    setSearchName("");
  };

  // Función para obtener el background glass de tipos
  const getTypeGlassBackground = (
    typesArr: { type: { name: string } }[],
    options?: { deg?: number; opacity?: number }
  ): { withOpacity: string; noOpacity: string } => {
    const deg = options?.deg ?? 135;
    const opacity = options?.opacity ?? 80;
    const typeColors = typesArr
      .map(t => types.get(t.type.name)?.color || '#e5e7eb');
    // Con opacidad
    const typeColorsWithOpacity = typeColors.map(c => c + opacity);
    // Sin opacidad
    const typeColorsNoOpacity = typeColors;
    let withOpacity: string;
    let noOpacity: string;
    if (typeColors.length === 1) {
      withOpacity = `linear-gradient(${deg}deg, ${typeColorsWithOpacity[0]}, ${typeColorsWithOpacity[0]})`;
      noOpacity = `linear-gradient(${deg}deg, ${typeColorsNoOpacity[0]}, ${typeColorsNoOpacity[0]})`;
    } else if (typeColors.length > 1) {
      withOpacity = `linear-gradient(${deg}deg, ${typeColorsWithOpacity[0]}, ${typeColorsWithOpacity[1]})`;
      noOpacity = `linear-gradient(${deg}deg, ${typeColorsNoOpacity[0]}, ${typeColorsNoOpacity[1]})`;
    } else {
      withOpacity = "#e5e7eb";
      noOpacity = "#e5e7eb";
    }
    return { withOpacity, noOpacity };
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
