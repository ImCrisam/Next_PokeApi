import { TableBody, TableCell, TableRow } from "@mui/material";
import { Pokemon } from "../types/Pokemon";
import Image from "next/image";

interface Props {
  pokemons: Pokemon[];
}

export default function PokemonTableBody({ pokemons }: Props) {
  return (
    <TableBody>
      {pokemons.map((p) => (
        <TableRow key={p.id} hover>
          <TableCell>{"#"+p.id}</TableCell>
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
            <button
              className="px-2 py-1 bg-blue-500 text-white rounded"
              onClick={() => console.log("Detalles de", p.name)}
            >
              Ver
            </button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}