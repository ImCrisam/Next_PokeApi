'use client'

import { useState } from "react";
import ModalComponent from "./component/Modal";
import PokemonTable from "./table/PokemonTable";
import BottomDrawer from "./component/BottomDrawer";
import { usePokemonContext } from "./context/PokemonContext";
import { PokemonCard } from "./grid/PokemonCard";
import DebouncedSlider from "./component/DebouncedSlider";
import { Box, Paper, styled } from "@mui/material";
import PokemonDetailCard from "./grid/PokemonDetailCard";
import PokemonCryPlayer from "./component/PokemonCryPlayer";
import { Pokemon } from "./types/Pokemon";
import MasonryGrid from "./grid/MasonryGrid";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const { pokemons, isLoading, error } = usePokemonContext();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", maxWidth: "100%", margin: '0', height:"100%" }}>
      <div>
        <DebouncedSlider onChange={function (value: number): void {
          throw new Error("Function not implemented.");
        }}></DebouncedSlider>
        <button onClick={() => setOpen(true)}>Abrir Modal</button>
      </div>
      <ModalComponent open={open} onClose={() => setOpen(false)}>
        <PokemonTable />
      </ModalComponent>
      <ModalComponent open={!!selectedPokemon} onClose={() => setSelectedPokemon(null)}>
        {selectedPokemon && (
          <Box sx={{ position: 'relative' }}>
            <PokemonDetailCard pokemon={selectedPokemon} />
            <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}>
              <PokemonCryPlayer url={selectedPokemon.cry_latest} playOnMount={true} />
            </Box>
          </Box>
        )}
      </ModalComponent>
      <BottomDrawer>
        <PokemonTable />
      </BottomDrawer>
      <main style={{ width: '100%', minHeight: '100vh', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <MasonryGrid>
            {pokemons.map((pokemon) => (
              <Box key={pokemon.id} >
              <PokemonCard  pokemon={pokemon} onClick={() => setSelectedPokemon(pokemon)} />
              </Box >
            ))}
          </MasonryGrid>
      </main>
    </Box>
  );
}
