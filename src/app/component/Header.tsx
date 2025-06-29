'use client'
import { Box, Button, Fade, Input, Zoom } from "@mui/material";
import React, { useState } from "react";
import Search from "@mui/icons-material/Search";
import ModalComponent from "./Modal";
import PokemonTable from "../table/PokemonTable";
import TableViewOutlinedIcon from '@mui/icons-material/TableViewOutlined';

export default function Header() {
    const [searchTerm, setSearchTerm] = useState("");
    const [open, setOpen] = useState(false);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                maxWidth: "95%",
                top: 15,
                width: "100%",
                zIndex: 1300,
            }}
        >
            <ModalComponent open={open} onClose={() => setOpen(false)}>
                <PokemonTable />
            </ModalComponent>
            <Input
                placeholder="Buscar Pokémon... (◡ ‿ ◡)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                    py: 0.3,
                    px: "auto",
                    width: 320,
                    borderRadius: 10,
                    border: "2px solid #bbf7d0",
                    background: "rgba(255,255,255,0.9)",
                    boxShadow: 3,
                    fontSize: 16,
                    textAlign: "center",

                    "& .MuiInput-input": {
                        textAlign: "center",
                    },

                    "&:focus": {
                        borderColor: "#4ade80",
                    },
                }}
                disableUnderline
            />

            <Button
                onClick={() => setOpen(true)}
                variant={"contained"}
                sx={{
                    py: 1,
                    borderRadius: 999,
                    transition: "all 0.3s",
                    fontSize: 16,
                    background: "linear-gradient(to right, #4ade80, #60a5fa)"
                }}
            >
                <TableViewOutlinedIcon />
            </Button>
        </Box>
    );
}
