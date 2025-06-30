"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";
import { Pokemon, PokemonTypeInfo } from "../types/Pokemon";
import {
  searchByName,
  filterByTypes,
  sortByField,
} from "../utils/filterAndSorts";

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
    types: { type: PokemonTypeInfo }[],
    options?: { deg?: number; opacity?: number },
    varian?: "dark" | "lite"
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
    let result = filterByTypes(allPokemoms, filteredTypes);
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
    options?: { deg?: number; opacity?: number },
    varian?: "dark" | "lite"
  ): string => {
    const theme: "lite" | "dark" = "lite"; // cambio de thema con el contexto de theme
    const deg = options?.deg ?? 135;
    const opacity = options?.opacity ?? "";
    const isDouTypes = types.length > 1
    let alterColor = types[0].type.liteColor;

    let color1 = types[0].type.color + opacity;
    let color2 = types[1]?.type.color + opacity;

    if (varian) {
      alterColor = types[0].type.color;
      color1 =
        varian == "lite"
          ? types[0].type.liteColor! + opacity
          : types[0].type.darkColor! + opacity;
      if (isDouTypes) {
        color2 =
          varian == "lite"
            ? types[1].type.liteColor! + opacity
            : types[1].type.darkColor! + opacity;
      }
    }

    if (!isDouTypes) {
      return `linear-gradient(${deg}deg, ${color1}, ${alterColor!})`;
    } else if (isDouTypes) {
      return `linear-gradient(${deg}deg, ${color1}, ${color2})`;
    } else {
      return "#e5e7eb";
    }
  };

  return (
    <PokemonContext.Provider
      value={{
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
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
}

export function usePokemonContext(): PokemonContextType {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error(
      "usePokemonContext debe usarse dentro de un PokemonProvider"
    );
  }
  return context;
}
