"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { usePokemonContext } from "../context/PokemonContext";

export default function PokemonTable() {
  const { pokemons, isLoading, error } = usePokemonContext();

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  const rows = pokemons.map((p) => ({
    id: p.id,
    name: p.name,
    types: p.types.join(", "),
    weight: p.weight,
    height: p.height,
    hp: p.stats.find((s) => s.name === "hp")?.base_stat,
    attack: p.stats.find((s) => s.name === "attack")?.base_stat,
    defense: p.stats.find((s) => s.name === "defense")?.base_stat,
    spAttack: p.stats.find((s) => s.name === "special-attack")?.base_stat,
    spDefense: p.stats.find((s) => s.name === "special-defense")?.base_stat,
    speed: p.stats.find((s) => s.name === "speed")?.base_stat,
    sprite: p.sprite,
    base_experience: p.base_experience,
  }));

  const columns: GridColDef[] = [
    {
      field: "sprite",
      headerName: "Imagen",
      renderCell: (params) => (
        <img src={params.value} alt="sprite" style={{ width: 50, height: 50 }} />
      ),
      sortable: false,
    },
    { field: "name", headerName: "Nombre", flex: 1 },
    { field: "types", headerName: "Tipos", flex: 1 },
    { field: "weight", headerName: "Peso (kg)", type: "number", flex: 0.5 },
    { field: "height", headerName: "Altura (m)", type: "number", flex: 0.5 },
    { field: "hp", headerName: "HP", type: "number", flex: 0.5 },
    { field: "base_experience", headerName: "Experiencia Base", type: "number", flex: 0.5 },
    { field: "attack", headerName: "Ataque", type: "number", flex: 0.5 },
    { field: "defense", headerName: "Defensa", type: "number", flex: 0.5 },
    { field: "spAttack", headerName: "Atq. Especial", type: "number", flex: 0.5 },
    { field: "spDefense", headerName: "Def. Especial", type: "number", flex: 0.5 },
    { field: "speed", headerName: "Velocidad", type: "number", flex: 0.5 },
    {
      field: "verDetalles",
      headerName: "Detalles",
      renderCell: (params) => (
        <button
          className="px-2 py-1 bg-blue-500 text-white rounded"
          onClick={() => console.log("Detalles de", params.row.name)}
        >
          Ver
        </button>
      ),
      sortable: false,
    },
  ];

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
        pagination
      />
    </div>
  );
}
