import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
} from "@mui/material";
import Image from "next/image";
import { Pokemon } from "../_types/Pokemon";
import PokemonCryPlayer from "../_common/component/PokemonCryPlayer";
import ChipType from "../_common/component/ChipType";
import { usePokemonContext } from "../_context/PokemonContext";

interface Props {
  pokemon: Pokemon;
}

export default function PokemonDetailCard({ pokemon }: Props) {
  const { getTypeGlassBackground, types } = usePokemonContext();
  console.log( getTypeGlassBackground(pokemon.types, { deg: 135, opacity: 100 }));
  
  return (
    <Card
      sx={{ maxWidth: 400, m: "auto", borderRadius: 3, boxShadow: 4, p: 2, background: getTypeGlassBackground(pokemon.types, { deg: 135 }) }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Image
          src={pokemon.sprite_front_default ?? "/placeholder.png"}
          alt={pokemon.name}
          width={120}
          height={120}
          style={{ objectFit: "contain" }}
        />
         <Typography
          variant="subtitle1"
          color="text.primary"
          sx={{
            textAlign: "center",
            textTransform: "capitalize",
            mt: 1,
            fontWeight: 600,
            fontSize: "1.5rem",
            fontFamily:
              "Pokemon Hollow, Pokemon Solid, Arial, Helvetica, sans-serif",
          }}
        >
          {pokemon.name}
        </Typography>
        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
          {pokemon.types.map((t) => (
            <ChipType
              key={t.type.name}
              name={t.type.name}
              color={t.type.color ?? "#e5e7eb"}
            />
          ))}
        </Box>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          justifyContent: "center",
          mb: 2,
        }}
      >
        {pokemon.sprite_front_shiny && (
          <Image
            src={pokemon.sprite_front_shiny}
            alt="Shiny"
            width={60}
            height={60}
          />
        )}
        {pokemon.sprite_home_default && (
          <Image
            src={pokemon.sprite_home_default}
            alt="Home"
            width={60}
            height={60}
          />
        )}
        {pokemon.sprite_home_shiny && (
          <Image
            src={pokemon.sprite_home_shiny}
            alt="Home Shiny"
            width={60}
            height={60}
          />
        )}
        {pokemon.sprite_official_artwork_default && (
          <Image
            src={pokemon.sprite_official_artwork_default}
            alt="Artwork"
            width={60}
            height={60}
          />
        )}
        {pokemon.sprite_official_artwork_shiny && (
          <Image
            src={pokemon.sprite_official_artwork_shiny}
            alt="Artwork Shiny"
            width={60}
            height={60}
          />
        )}
      </Box>
      <Divider sx={{ mb: 2 }} />
      <CardContent sx={{ p: 0 }}>
        <Box component="dl" sx={{ m: 0 }}>
          <Box
            component="div"
            sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
          >
            <Typography variant="body2" component="dt">
              ID:
            </Typography>
            <Typography variant="body2" component="dd">
              {pokemon.id}
            </Typography>
          </Box>
          <Box
            component="div"
            sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
          >
            <Typography variant="body2" component="dt">
              Base Exp:
            </Typography>
            <Typography variant="body2" component="dd">
              {pokemon.base_experience}
            </Typography>
          </Box>
          <Box
            component="div"
            sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
          >
            <Typography variant="body2" component="dt">
              Altura:
            </Typography>
            <Typography variant="body2" component="dd">
              {pokemon.height}
            </Typography>
          </Box>
          <Box
            component="div"
            sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
          >
            <Typography variant="body2" component="dt">
              Peso:
            </Typography>
            <Typography variant="body2" component="dd">
              {pokemon.weight}
            </Typography>
          </Box>
          <Box
            component="div"
            sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
          >
            <Typography variant="body2" component="dt">
              HP:
            </Typography>
            <Typography variant="body2" component="dd">
              {pokemon.hp}
            </Typography>
          </Box>
          <Box
            component="div"
            sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
          >
            <Typography variant="body2" component="dt">
              Ataque:
            </Typography>
            <Typography variant="body2" component="dd">
              {pokemon.attack}
            </Typography>
          </Box>
          <Box
            component="div"
            sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
          >
            <Typography variant="body2" component="dt">
              Defensa:
            </Typography>
            <Typography variant="body2" component="dd">
              {pokemon.defense}
            </Typography>
          </Box>
          <Box
            component="div"
            sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
          >
            <Typography variant="body2" component="dt">
              Atq. Esp.:
            </Typography>
            <Typography variant="body2" component="dd">
              {pokemon.special_attack}
            </Typography>
          </Box>
          <Box
            component="div"
            sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
          >
            <Typography variant="body2" component="dt">
              Def. Esp.:
            </Typography>
            <Typography variant="body2" component="dd">
              {pokemon.special_defense}
            </Typography>
          </Box>
          <Box
            component="div"
            sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
          >
            <Typography variant="body2" component="dt">
              Velocidad:
            </Typography>
            <Typography variant="body2" component="dd">
              {pokemon.speed}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
