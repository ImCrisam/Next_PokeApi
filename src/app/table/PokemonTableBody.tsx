import { Button, colors, TableBody, TableCell, TableRow } from "@mui/material";
import { Pokemon } from "../types/Pokemon";
import Image from "next/image";
import { usePokemonContext } from "../context/PokemonContext";
import VisibilityIcon from '@mui/icons-material/Visibility';

interface Props {
  pokemons: Pokemon[];
  onClickRow: (pokemon: Pokemon) => void;
}

export default function PokemonTableBody({ pokemons, onClickRow }: Props) {
  const { getTypeGlassBackground } = usePokemonContext();


 const statMaxStyle = {
  boxShadow: 'inset 0 2px 12px 0 #299250, 0 0 4px rgba(0,0,0,0.3)',
  backgroundColor: "rgba(41, 146, 80, 0.1)",
  fontWeight: 500,
  textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
};

const statMinStyle = {
  boxShadow: 'inset 0 2px 12px 0 #ef4444, 0 0 4px rgba(0,0,0,0.3)',
  backgroundColor: "rgba(239, 68, 68, 0.1)",
  fontWeight: 500,
  textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
};



  const getStatCellStyle = (value: number, max: number, min: number) => {
    if (value === max) {
      return statMaxStyle;
    } else if (value === min) {
      return statMinStyle;
    } else {
      return {};
    }
  };

  return (
    <TableBody>
      {pokemons.map((p) => {
        const background = getTypeGlassBackground(p.types, { deg: 180, opacity: 30 });
        const backgroundHover = getTypeGlassBackground(p.types, { deg: 180, opacity: 99 });
        return(
        <TableRow
          key={p.id}
          className="glass table-row"
          hover
          sx={{
            cursor: "pointer",
            background: background,
            borderBottom: 0,
            '&:hover': {
              background: backgroundHover,
            },
            '& td': {
              borderBottom: 0,
              margin: "5px",
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
          <TableCell sx={getStatCellStyle(p.weight, p.stat_max, p.stat_min)}>{p.weight}</TableCell>
          <TableCell>{p.height}</TableCell>
          <TableCell>{p.hp}</TableCell>
          <TableCell>{p.base_experience}</TableCell>
          <TableCell sx={getStatCellStyle(p.attack, p.stat_max, p.stat_min)}>{p.attack}</TableCell>
          <TableCell sx={getStatCellStyle(p.defense, p.stat_max, p.stat_min)}>{p.defense}</TableCell>
          <TableCell sx={getStatCellStyle(p.special_attack, p.stat_max, p.stat_min)}>{p.special_attack}</TableCell>
          <TableCell sx={getStatCellStyle(p.special_defense, p.stat_max, p.stat_min)}>{p.special_defense}</TableCell>
          <TableCell sx={getStatCellStyle(p.speed, p.stat_max, p.stat_min)}>{p.speed}</TableCell>
          <TableCell>
            <Button
              onClick={e => { e.stopPropagation(); onClickRow(p); }}
            >
              <VisibilityIcon fontSize="medium" />
            </Button>
          </TableCell>
        </TableRow>
        )
})}
    </TableBody>
  );
}