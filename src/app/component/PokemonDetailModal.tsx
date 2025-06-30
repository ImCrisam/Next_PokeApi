import ModalComponent from "./Modal";
import PokemonDetailCard from "../grid/PokemonDetailCard";
import PokemonCryPlayer from "./PokemonCryPlayer";
import { Box } from "@mui/material";
import { usePokemonContext } from "../context/PokemonContext";

export default function PokemonDetailModal() {
  const { selectedPokemon } = usePokemonContext();

  return (
    <ModalComponent open={!!selectedPokemon.value} onClose={() => selectedPokemon.set(null)}>
      {selectedPokemon.value && (
        <Box sx={{ position: 'relative' }}>
          <PokemonDetailCard pokemon={selectedPokemon.value} />
          <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}>
            <PokemonCryPlayer url={selectedPokemon.value.cry_latest} playOnMount={true} />
          </Box>
        </Box>
      )}
    </ModalComponent>
  );
}
