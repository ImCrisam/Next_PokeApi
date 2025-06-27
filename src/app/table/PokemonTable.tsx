"use client";

import { useState, useMemo } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  TablePagination,
} from "@mui/material";
import { usePokemonContext } from "../context/PokemonContext";
import TableHeaderWithFilter from "./TableHeaderWithFilter";
import TypeFilterAutocomplete from "./TypeFilterAutocomplete";
import SortButtons from "./SortButtons";
import { filterByTypes } from "../utils/filterByTypes";
import { sortByField, SortOrder, SortField } from "../utils/sortByField";
import { Pokemon } from "../types/Pokemon";
import Image from "next/image";

export default function CustomPokemonTable() {
  const { pokemons, isLoading, error } = usePokemonContext();
  const [filteredTypes, setFilteredTypes] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Estado para ordenamiento generalizado
  const [sortField, setSortField] = useState<SortField>("id");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  // Memo: solo filtra y ordena usando las utilidades
  const filteredPokemons = useMemo(() => {
    let result = filterByTypes(pokemons, filteredTypes);
    result = sortByField(result, sortField, sortOrder);
    return result;
  }, [pokemons, filteredTypes, sortField, sortOrder]);

  // Callbacks
  const handleSort = (field: SortField, order: SortOrder) => {
    setSortField(field);
    setSortOrder(order);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Datos paginados
  const paginatedPokemons = filteredPokemons.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Paper sx={{ minWidth: "100vw", minHeight: "100vh", overflow: "hidden" }}>
      <TableContainer sx={{ minHeight: "calc(100vh - 64px)", maxHeight: "calc(100vh - 64px)" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableHeaderWithFilter label="ID">
                <SortButtons
                  onSortAsc={() => handleSort("id", "asc")}
                  onSortDesc={() => handleSort("id", "desc")}
                />
              </TableHeaderWithFilter>
              <TableHeaderWithFilter label="Imagen" />
              <TableHeaderWithFilter label="Nombre">
                <SortButtons
                  onSortAsc={() => handleSort("name", "asc")}
                  onSortDesc={() => handleSort("name", "desc")}
                />
              </TableHeaderWithFilter>
              <TableHeaderWithFilter label="Tipo de Pokémon">
                <TypeFilterAutocomplete onFilterChange={setFilteredTypes} />
              </TableHeaderWithFilter>
              <TableHeaderWithFilter label="Peso (kg)">
                <SortButtons
                  onSortAsc={() => handleSort("weight", "asc")}
                  onSortDesc={() => handleSort("weight", "desc")}
                />
              </TableHeaderWithFilter>
              <TableHeaderWithFilter label="Altura (m)">
                <SortButtons
                  onSortAsc={() => handleSort("height", "asc")}
                  onSortDesc={() => handleSort("height", "desc")}
                />
              </TableHeaderWithFilter>
              <TableHeaderWithFilter label="Salud base">
                <SortButtons
                  onSortAsc={() => handleSort("hp", "asc")}
                  onSortDesc={() => handleSort("hp", "desc")}
                />
              </TableHeaderWithFilter>
              <TableHeaderWithFilter label="Experiencia base">
                <SortButtons
                  onSortAsc={() => handleSort("base_experience", "asc")}
                  onSortDesc={() => handleSort("base_experience", "desc")}
                />
              </TableHeaderWithFilter>
              <TableHeaderWithFilter label="Ataque base">
                <SortButtons
                  onSortAsc={() => handleSort("attack", "asc")}
                  onSortDesc={() => handleSort("attack", "desc")}
                />
              </TableHeaderWithFilter>
              <TableHeaderWithFilter label="Defensa base">
                <SortButtons
                  onSortAsc={() => handleSort("defense", "asc")}
                  onSortDesc={() => handleSort("defense", "desc")}
                />
              </TableHeaderWithFilter>
              <TableHeaderWithFilter label="Ataque especial">
                <SortButtons
                  onSortAsc={() => handleSort("special_attack", "asc")}
                  onSortDesc={() => handleSort("special_attack", "desc")}
                />
              </TableHeaderWithFilter>
              <TableHeaderWithFilter label="Defensa especial">
                <SortButtons
                  onSortAsc={() => handleSort("special_defense", "asc")}
                  onSortDesc={() => handleSort("special_defense", "desc")}
                />
              </TableHeaderWithFilter>
              <TableHeaderWithFilter label="Velocidad">
                <SortButtons
                  onSortAsc={() => handleSort("speed", "asc")}
                  onSortDesc={() => handleSort("speed", "desc")}
                />
              </TableHeaderWithFilter>
              <TableHeaderWithFilter label="Ver detalles" />
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedPokemons.map((p: Pokemon) => (
              <TableRow key={p.id} hover>
                <TableCell>{p.id}</TableCell>
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
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 20, 50]}
        component="div"
        count={filteredPokemons.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
