'use client'
import React from "react";
import { usePokemonContext } from "../_context/PokemonContext";
import MasonryGrid from "./MasonryGrid";
import { PokemonCard } from "./PokemonCard";
import { Box } from "@mui/material";

const GridPage: React.FC = () => {
  const { pokemons, selectedPokemon } = usePokemonContext();
  return (
    <Box sx={{width:"100%", display:"flex", justifyContent:"center", paddingBlock:"1rem"}}>



      <MasonryGrid>
        {pokemons.map((pokemon) => (
            <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onClick={() => selectedPokemon.set(pokemon)}
            />
        ))}
      </MasonryGrid>
        </Box>
  );
};

export default GridPage;
