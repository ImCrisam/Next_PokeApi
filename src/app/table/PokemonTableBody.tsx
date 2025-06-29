import { Button, TableBody, TableCell, TableRow } from "@mui/material";
import { Pokemon } from "../types/Pokemon";
import Image from "next/image";
import { usePokemonContext } from "../context/PokemonContext";

interface Props {
  pokemons: Pokemon[];
  onClickRow: (pokemon: Pokemon) => void;
}

export default function PokemonTableBody({ pokemons, onClickRow }: Props) {
  const { getTypeGlassBackground } = usePokemonContext();
  return (
    <TableBody>
      {pokemons.map((p) => {
        const background = getTypeGlassBackground(p.types, { deg: 180, opacity: 30 });
        return(
        <TableRow
          key={p.id}
          className="glass table-row"
          hover
          sx={{
            cursor: "pointer",
            background: background.withOpacity,
            borderBottom: 0,
            '&:hover': {
              background: background.noOpacity,
            },
            '& td': {
              borderBottom: 0,
            },

          }}
          onClick={() => onClickRow(p)}
        >
          <TableCell>{"#" + p.id}</TableCell>
          <TableCell>
            <Image
              src={p.sprite_front_default ?? "/placeholder.png"}
              alt={p.name}
              width={50}
              height={50}
              style={{ objectFit: "contain" }}
            />
          </TableCell>
          <TableCell>{p.name}</TableCell>
          <TableCell>
            {p.types.map((t) => t.type.name).join(", ")}
          </TableCell>
          <TableCell>{p.weight}</TableCell>
          <TableCell>{p.height}</TableCell>
          <TableCell>{p.hp}</TableCell>
          <TableCell>{p.base_experience}</TableCell>
          <TableCell>{p.attack}</TableCell>
          <TableCell>{p.defense}</TableCell>
          <TableCell>{p.special_attack}</TableCell>
          <TableCell>{p.special_defense}</TableCell>
          <TableCell>{p.speed}</TableCell>
          <TableCell>
            <Button
              className="px-2 py-1 bg-blue-500 text-white rounded"
              onClick={e => { e.stopPropagation(); onClickRow(p); }}
            >
              Ver
            </Button>
          </TableCell>
        </TableRow>
        )
})}
    </TableBody>
  );
}