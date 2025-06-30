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
import Header from "./component/Header";

export default function Home() {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const { pokemons, isLoading, error } = usePokemonContext();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "100%",
        margin: '0',
        height: "100%",
        paddingBlock: "2rem",
        paddingInline: "2rem"
      }}>
      <Header></Header>
      {/* <DebouncedSlider onChange={function (value: number): void {
        throw new Error("Function not implemented.");
      }}></DebouncedSlider> */}


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
      <main style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBlock: "2rem",
      }}>
        <MasonryGrid>
          {pokemons.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} onClick={() => setSelectedPokemon(pokemon)} />
          ))}
        </MasonryGrid>
      </main>
    </Box>
  );
}
