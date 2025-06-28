"use client";

import { useState } from "react";
import ModalComponent from "./component/Modal";
import PokemonTable from "./table/PokemonTable";
import BottomDrawer from "./component/BottomDrawer";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Abrir Modal</button>
      <ModalComponent open={open} onClose={() => setOpen(false)}>
                <PokemonTable />
      </ModalComponent>

      <BottomDrawer>
                <PokemonTable />
      </BottomDrawer>
    </>
  );
}
