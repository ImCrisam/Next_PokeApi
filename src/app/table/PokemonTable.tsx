import { useState, useMemo } from "react";
import { Paper, TableContainer, TablePagination, Table } from "@mui/material";
import { usePokemonContext } from "../context/PokemonContext";
import { filterByTypes } from "../utils/filterByTypes";
import { sortByField, SortOrder, SortField } from "../utils/sortByField";
import PokemonTableHead from "./PokemonTableHead";
import PokemonTableBody from "./PokemonTableBody";
import ModalComponent from "../component/Modal";

export default function CustomPokemonTable() {
  const { pokemons, isLoading, error } = usePokemonContext();
  const [filteredTypes, setFilteredTypes] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortField, setSortField] = useState<SortField>("id");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [open, setOpen] = useState(true);

  const filteredPokemons = useMemo(() => {
    let result = filterByTypes(pokemons, filteredTypes);
    result = sortByField(result, sortField, sortOrder);
    return result;
  }, [pokemons, filteredTypes, sortField, sortOrder]);

  const handleSort = (field: SortField, order: SortOrder) => {
    setSortField(field);
    setSortOrder(order);
  };

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  const paginatedPokemons = filteredPokemons.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
        <Paper
          className="card"
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
                setFilteredTypes={setFilteredTypes}
              />
              <PokemonTableBody pokemons={paginatedPokemons} />
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
            sx={{
              background: "rgba(255,255,255,0.15)",
              color: "white",
              borderBottomLeftRadius: "1rem",
              borderBottomRightRadius: "1rem",
            }}
          />
        </Paper>

      

  );
}
