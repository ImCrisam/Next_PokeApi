"use client";

import { useState } from "react";
import ModalComponent from "./component/Modal";
import PokemonTable from "./table/PokemonTable";

export default function Home() {
  const [open, setOpen] = useState(true);

  return (
    <>
      <ModalComponent open={open} onClose={() => setOpen(false)}>
        <PokemonTable />
      </ModalComponent>
      <button onClick={() => setOpen(true)}>Abrir Modal</button>
    </>
  );
}
