"use client";

import { ReactNode } from "react";
import { PokemonProvider } from "./PokemonContext";

type ClientProvidersProps = {
  children: ReactNode;
};

export function ClientProviders({ children }: ClientProvidersProps) {
  return <PokemonProvider>{children}</PokemonProvider>;
}
