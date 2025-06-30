import { useEffect, useRef, useState } from "react";
import { fetchAllPokemons } from "../services/pokemonService";
import { colours } from "../utils/colorsTypes";
import { Pokemon, PokemonTypeInfo } from "../types/Pokemon";



export function usePokemonTypes() {
    const [types, setTypes] = useState<Map<string, PokemonTypeInfo>>(new Map());
    const allPokemonsRef = useRef<Pokemon[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadTypes = async () => {
            try {
                const data: Pokemon[] = await fetchAllPokemons();
                allPokemonsRef.current = data;
                const allTypes = new Map<string, PokemonTypeInfo>();
                data.forEach((p) => {
                    p.types.forEach((t) => {
                        if (!allTypes.has(t.type.name)) {
                            allTypes.set(t.type.name, {
                                name: t.type.name, // Puedes traducir aquí si tienes un diccionario
                                color: t.type.color,
                            });
                        }
                    });
                });
                setTypes(allTypes);
            } catch (err) {
                setError("Error al cargar los tipos de Pokémon.");
            } finally {
                setIsLoading(false);
            }
        };
        loadTypes();
    }, []);

    return { allPokemoms: allPokemonsRef.current, types, isLoading, error };
}
