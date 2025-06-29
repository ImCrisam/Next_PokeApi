'use client'
import { useState } from "react";
import { Paper, TableContainer, TablePagination, Table } from "@mui/material";
import { usePokemonContext } from "../context/PokemonContext";
import { SortOrder, SortField } from "../utils/filterAndSorts";
import PokemonTableHead from "./PokemonTableHead";
import PokemonTableBody from "./PokemonTableBody";
import { Pokemon } from "../types/Pokemon";

export default function CustomPokemonTable() {
  const { pokemons, filterTypes, sort } = usePokemonContext();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSort = (field: SortField, order: SortOrder) => {
    sort.setField(field);
    sort.setOrder(order);
  };

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  const paginatedPokemons = pokemons.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
        <Paper
          className=""
          sx={{
            overflow: "hidden",
            background: "rgba(255,255,255,0.25)",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
            borderRadius: "1rem",
            border: "1.5px solid rgba(209, 213, 219, 0.3)",
            color: "white",
            boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
            p: 0,
            m: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "stretch",
          }}
        >
          <TableContainer
            sx={{
              width: "100%",
              height: "100%",
              background: "transparent",
              flex: 1,
            }}
          >
            <Table stickyHeader sx={{ width: "100%", height: "100%" }}>
              <PokemonTableHead
                onSort={handleSort}
                setFilteredTypes={filterTypes.set}
              />
              <PokemonTableBody pokemons={paginatedPokemons} onClickRow={function (pokemon: Pokemon): void {
            throw new Error("Function not implemented.");
          } } />
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 20, 50]}
            component="div"
            count={pokemons.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              background: "rgba(0, 0, 0, 0.15)",
              color: "white",
              borderBottomLeftRadius: "1rem",
              borderBottomRightRadius: "1rem",
            }}
          />
        </Paper>

  );
}
