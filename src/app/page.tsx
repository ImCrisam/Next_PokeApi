"use client";

import { useState } from "react";
import ModalComponent from "./component/Modal";
import PokemonTable from "./table/PokemonTable";
import BottomDrawer from "./component/BottomDrawer";
import { usePokemonContext } from "./context/PokemonContext";
import PokemonMasonryGrid from "./grid/MasonryGrid";
import { PokemonCard } from "./grid/PokemonCard";
import DebouncedSlider from "./component/DebouncedSlider";
import { Box } from "@mui/material";

export default function Home() {
  const [open, setOpen] = useState(false);
  const { pokemons, isLoading, error } = usePokemonContext();

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem", padding: "2rem" }}>
    <Box sx={{ width: "250px", display: "flex", gap: "2rem" }}>
      <DebouncedSlider onChange={function (value: number): void {
        throw new Error("Function not implemented.");
      } }></DebouncedSlider>
      <button onClick={() => setOpen(true)}>Abrir Modal</button>

      </Box>
      <ModalComponent open={open} onClose={() => setOpen(false)}>
        <PokemonTable />
      </ModalComponent>

      <BottomDrawer>
        <PokemonTable />
      </BottomDrawer>

      <main style={{ width: "100%", minHeight: "100vh" }}>
        <PokemonMasonryGrid>
          {pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} onClick={() => {}} />
          ))}
        </PokemonMasonryGrid>
      </main>
    </Box>
  );
}
