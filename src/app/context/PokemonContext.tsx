"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { fetchAllPokemons } from "../services/pokemonService";
import { Pokemon } from "../types/Pokemon";

type PokemonContextType = {
  pokemons: Pokemon[];
  isLoading: boolean;
  types: string[];
  error: string | null;
};

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

type PokemonProviderProps = {
  children: ReactNode;
};

export function PokemonProvider({ children }: PokemonProviderProps) {
  const [types, setTypes] = useState<string[]>([]);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPokemons = async () => {
      try {
        const data = await fetchAllPokemons();
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

  return (
    <PokemonContext.Provider value={{ pokemons, types, isLoading, error }}>
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
