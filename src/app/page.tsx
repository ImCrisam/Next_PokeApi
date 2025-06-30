'use client'


import PokemonTable from "./table/PokemonTable";
import BottomDrawer from "./component/BottomDrawer";
import { usePokemonContext } from "./context/PokemonContext";
import { PokemonCard } from "./grid/PokemonCard";
import { Box } from "@mui/material";

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
        <style>{`
          @font-face {
            font-family: 'Pokemon Solid';
            src: url('/fonts/Pokemon Solid.ttf') format('truetype');
            font-weight: normal;
            font-style: normal;
          }
          @font-face {
            font-family: 'Pokemon Hollow';
            src: url('/fonts/Pokemon Hollow.ttf') format('truetype');
            font-weight: normal;
            font-style: normal;
          }
          body {
            background-image: image-set(url('/bg/bg_avif.avif') type('image/avif'), url('/bg/bg_jpg.jpg') type('image/jpeg'));
          }
        `}</style>
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
