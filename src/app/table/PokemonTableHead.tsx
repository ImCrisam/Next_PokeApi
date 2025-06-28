import TableHeaderWithFilter from "./TableHeaderWithFilter";
import TypeFilterAutocomplete from "./TypeFilterAutocomplete";
import SortButtons from "./SortButtons";
import { TableHead, TableRow } from "@mui/material";
import { SortField, SortOrder } from "../utils/sortByField";

interface Props {
  onSort: (field: SortField, order: SortOrder) => void;
  setFilteredTypes: (types: string[]) => void;
}

export default function PokemonTableHead({ onSort, setFilteredTypes }: Props) {
  return (
    <TableHead>
      <TableRow>
        <TableHeaderWithFilter label="ID">
          <SortButtons
            onSortAsc={() => onSort("id", "asc")}
            onSortDesc={() => onSort("id", "desc")}
          />
        </TableHeaderWithFilter>
        <TableHeaderWithFilter label="Imagen" />
        <TableHeaderWithFilter label="Nombre">
          <SortButtons
            onSortAsc={() => onSort("name", "asc")}
            onSortDesc={() => onSort("name", "desc")}
          />
        </TableHeaderWithFilter>
        <TableHeaderWithFilter label="Tipo">
          <TypeFilterAutocomplete onFilterChange={setFilteredTypes} />
        </TableHeaderWithFilter>
        <TableHeaderWithFilter label="Peso (kg)">
          <SortButtons
            onSortAsc={() => onSort("weight", "asc")}
            onSortDesc={() => onSort("weight", "desc")}
          />
        </TableHeaderWithFilter>
        <TableHeaderWithFilter label="Altura (m)">
          <SortButtons
            onSortAsc={() => onSort("height", "asc")}
            onSortDesc={() => onSort("height", "desc")}
          />
        </TableHeaderWithFilter>
        <TableHeaderWithFilter label="Ps">
          <SortButtons
            onSortAsc={() => onSort("hp", "asc")}
            onSortDesc={() => onSort("hp", "desc")}
          />
        </TableHeaderWithFilter>
        <TableHeaderWithFilter label="Experiencia">
          <SortButtons
            onSortAsc={() => onSort("base_experience", "asc")}
            onSortDesc={() => onSort("base_experience", "desc")}
          />
        </TableHeaderWithFilter>
        <TableHeaderWithFilter label="Ataque">
          <SortButtons
            onSortAsc={() => onSort("attack", "asc")}
            onSortDesc={() => onSort("attack", "desc")}
          />
        </TableHeaderWithFilter>
        <TableHeaderWithFilter label="Defensa">
          <SortButtons
            onSortAsc={() => onSort("defense", "asc")}
            onSortDesc={() => onSort("defense", "desc")}
          />
        </TableHeaderWithFilter>
        <TableHeaderWithFilter label="At Esp">
          <SortButtons
            onSortAsc={() => onSort("special_attack", "asc")}
            onSortDesc={() => onSort("special_attack", "desc")}
          />
        </TableHeaderWithFilter>
        <TableHeaderWithFilter label="Def Esp">
          <SortButtons
            onSortAsc={() => onSort("special_defense", "asc")}
            onSortDesc={() => onSort("special_defense", "desc")}
          />
        </TableHeaderWithFilter>
        <TableHeaderWithFilter label="Velocidad">
          <SortButtons
            onSortAsc={() => onSort("speed", "asc")}
            onSortDesc={() => onSort("speed", "desc")}
          />
        </TableHeaderWithFilter>
        <TableHeaderWithFilter label="Ver Mas Detalles " />
      </TableRow>
    </TableHead>
  );
}