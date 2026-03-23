import { useState, useEffect } from "react";
import { IngredientType } from "@/lib/types/schemas_interfaces";

type IngredientSearchInputProps = {
    value: string;
    onSelect: (ingredient: IngredientType) => void;

};

export const IngredientSearchInput = ({ value, onSelect }: IngredientSearchInputProps) => {
    const [query, setQuery] = useState(value) || ""; 
    const [results, setResults] = useState<IngredientType[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!query || query.length < 3) {
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

    const handleSelect = (ingredient: IngredientType) => {
        console.log("[SELECTED_INGREDIENT]", ingredient);
        onSelect(ingredient);
        setQuery(ingredient.name);
        setResults([]);
    }

    return (
        <div className="relative">
            <label htmlFor="ingrédient" className="text-sm font-medium text-warm-primary">Ingrédient</label>
            <input
                className="input-text-select"
                type="text"
                id="ingredient"
                name="ingredient"
                autoComplete="off"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Patates, tomates..."
            />
            {loading && <p className="text-sm text-warm-secondary">Chargement...</p>}
            {results.length > 0 && (
                <ul className="absolute z-10 w-full overflow-hidden rounded-lg border border-warm-border bg-warm-base shadow-sm">
                    {results.map((item) => (
                        <li
                            key={item.id}
                            className="cursor-pointer px-3 py-2 text-sm text-warm-primary hover:bg-warm-subtle"
                            onClick={() => handleSelect(item)}
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
