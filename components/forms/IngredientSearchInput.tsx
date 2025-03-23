import { useState, useEffect } from "react";
import { IngredientType } from "@/lib/types/schemas_interfaces";

type IngredientSearchInputProps = {
    value: string;
    onSelect: (ingredient: IngredientType) => void;
};

export const IngredientSearchInput = ({ value, onSelect }: IngredientSearchInputProps) => {
    const [query, setQuery] = useState(value);
    const [results, setResults] = useState<IngredientType[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!query || query.length < 2) {
            setResults([]);
            return;
        }

        const fetchResults = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/ingredients/search?query=${query}`, { 
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });
                
                const data = await response.json();

                if (!response.ok) {
                    throw new Error("Erreur lors de la recherche");
                };


                setResults(data);
            } catch (error) {
                console.error("[FETCH_INGREDIENTS_ERROR]", error);
            } finally {
                setLoading(false);
            }
        };

        const timeout = setTimeout(fetchResults, 300);
        return () => clearTimeout(timeout);
    }, [query]);

    return (
        <div className="relative">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un ingrédient"
                className="input-text-select"
            />
            {loading && <p className="text-sm">Chargement...</p>}
            {results.length > 0 && (
                <ul className="absolute z-10 w-full bg-white text-black shadow">
                    {results.map((item) => (
                        <li
                            key={item.id}
                            className="cursor-pointer p-2 hover:bg-gray-200"
                            onClick={() => {
                                onSelect(item);
                                setQuery(item.name);
                                setResults([]);
                            }}
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
