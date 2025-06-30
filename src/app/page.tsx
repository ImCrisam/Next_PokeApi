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
import PokemonDetailModal from "./component/PokemonDetailModal";

export default function Home() {
  const { pokemons, selectedPokemon } = usePokemonContext();

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
      <Header />
      {/* <DebouncedSlider onChange={function (value: number): void {
        throw new Error("Function not implemented.");
      }}></DebouncedSlider> */}

      <PokemonDetailModal />
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
              <PokemonCard key={pokemon.id} pokemon={pokemon} onClick={() => selectedPokemon.set(pokemon)} />
          ))}
        </MasonryGrid>
      </main>
    </Box>
  );
}
