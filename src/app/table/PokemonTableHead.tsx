import TableHeaderWithFilter from "./TableHeaderWithFilter";
import SortButtons from "../_common/component/SortButtons";
import { TableHead, TableRow } from "@mui/material";
import { SortField, SortOrder } from "../_common/utils/filterAndSorts";
import ImageIcon from '@mui/icons-material/Image';
import PickerTypesButton from "./PickerTypesTable";
interface Props {
  onSort: (field: SortField, order: SortOrder) => void;
  setFilteredTypes: (types: string[]) => void;
}

export default function PokemonTableHead({ onSort, setFilteredTypes }: Props) {
  return (
    <TableHead>
      <TableRow
        sx={{
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          border: "2px solid #bbf7d0",
          borderBottom: "2px solid #bbf7d0",
          boxShadow: "0 4px 24px 0rgba(167, 243, 208, 0.62)",
          overflow: "hidden",

          "& th":{
              background: "linear-gradient(180deg,rgb(209, 250, 229) 0%,rgb(186, 229, 253) 100%)",
              borderTop: "none",
              borderBottom: "none",
              color: "#047857",
              fontWeight: 700,
              fontSize: "1rem",
              textShadow: "0 1px 2px #fff",
              padding: "16px 0",
              letterSpacing: "0.01em",
            }
        }}
      >
        <TableHeaderWithFilter label="ID">
          <SortButtons
            onSortAsc={() => onSort("id", "asc")}
            onSortDesc={() => onSort("id", "desc")}
          />
        </TableHeaderWithFilter>
        <TableHeaderWithFilter label="" >
          <ImageIcon></ImageIcon>
          </TableHeaderWithFilter>
        <TableHeaderWithFilter label="Nombre">
          <SortButtons
            onSortAsc={() => onSort("name", "asc")}
            onSortDesc={() => onSort("name", "desc")}
          />
        </TableHeaderWithFilter>
        <TableHeaderWithFilter label="Tipo">
          <PickerTypesButton/>
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
        <TableHeaderWithFilter label="Ver Mas " />
      </TableRow>
    </TableHead>
  );
}