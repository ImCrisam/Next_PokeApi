import ModalComponent from "../_common/component/layers/Modal";
import PokemonDetailCard from "./PokemonDetailCard";
import PokemonCryPlayer from "../_common/component/PokemonCryPlayer";
import { Box } from "@mui/material";
import { usePokemonContext } from "../_context/PokemonContext";

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
