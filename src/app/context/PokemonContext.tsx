"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Pokemon } from "../models/Pokemon";
import { fetchAllPokemons } from "../services/pokemonService";

type PokemonContextType = {
  pokemons: Pokemon[];
  isLoading: boolean;
  error: string | null;
};

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

type PokemonProviderProps = {
  children: ReactNode;
};

export function PokemonProvider({ children }: PokemonProviderProps) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPokemons = async () => {
      try {
        const data = await fetchAllPokemons();
        setPokemons(data);
      } catch (err) {
        setError("Error al cargar los Pokémon.");
      } finally {
        setIsLoading(false);
      }
    };

    loadPokemons();
  }, []);

  return (
    <PokemonContext.Provider value={{ pokemons, isLoading, error }}>
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
