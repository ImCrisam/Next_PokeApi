'use client'
import { Box, Button, Fade, Input, Zoom } from "@mui/material";
import React, { useState } from "react";
import ModalComponent from "../../../_common/component/layers/Modal";
import PokemonTable from "../../../table/PokemonTable";
import TableViewOutlinedIcon from '@mui/icons-material/TableViewOutlined';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { usePokemonContext } from "../../../_context/PokemonContext";
import PickerTypes from "./PickerTypesHome";


export default function Header() {
    const { search, clearFilters, types, filterTypes } = usePokemonContext();
    const [open, setOpen] = useState(false);

    return (
        <Box 
        sx={
            {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "sticky",
                maxWidth: "95%",
                    top: 15,
                    width: "100%",
                    zIndex: 1300,
            }
        }
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                    
                }}
            >
                <ModalComponent open={open} onClose={() => setOpen(false)}>
                    <PokemonTable />
                </ModalComponent>

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
                <Input
                    placeholder="Buscar"
                    value={search.value}
                    onChange={(e) => search.set(e.target.value)}
                    sx={{
                        py: 0.3,
                        px: "auto",
                        maxWidth: 320,
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
                    onClick={clearFilters}
                    variant={"contained"}
                    sx={{
                        py: 1,
                        borderRadius: 999,
                        transition: "all 0.3s",
                        fontSize: 16,
                        background: "linear-gradient(to right, #4ade80, #60a5fa)"
                    }}
                >
                    <FilterAltOffIcon />
                </Button>
            </Box>
            <PickerTypes/>
        </Box>
    );
}
