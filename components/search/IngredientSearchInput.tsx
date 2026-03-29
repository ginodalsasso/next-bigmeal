import { useState, useEffect, useRef } from "react";
import Fuse from "fuse.js";
import { IngredientType } from "@/lib/types/schemas_interfaces";

type IngredientSearchInputProps = {
    value: string;
    onSelect: (ingredient: IngredientType) => void;
};

export const IngredientSearchInput = ({ value, onSelect }: IngredientSearchInputProps) => {
    const [query, setQuery] = useState(value || "");
    const [results, setResults] = useState<IngredientType[]>([]);
    const fuseRef = useRef<Fuse<IngredientType> | null>(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        fetch("/api/search")
            .then((r) => r.json())
            .then((data) => {
                fuseRef.current = new Fuse(data.ingredients ?? [], {
                    keys: ["name"],
                    threshold: 0.35,
                    includeScore: true,
                    minMatchCharLength: 2,
                });
                setReady(true);
            })
            .catch((err) => console.error("[INGREDIENT_FUSE_SEARCH] Erreur de chargement de l'index", err));
    }, []);

    const handleChange = (val: string) => {
        setQuery(val);
        if (!fuseRef.current || val.length < 2) {
            setResults([]);
            return;
        }
        setResults(fuseRef.current.search(val, { limit: 10 }).map((r) => r.item));
    };

    const handleSelect = (ingredient: IngredientType) => {
        onSelect(ingredient);
        setQuery(ingredient.name);
        setResults([]);
    };

    return (
        <div className="relative">
            <label htmlFor="ingredient" className="text-sm font-medium text-warm-primary">Ingrédient</label>
            <input
                className="input-text-select"
                type="text"
                id="ingredient"
                name="ingredient"
                autoComplete="off"
                value={query}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="Patates, tomates..."
            />
            {!ready && query.length > 0 && (
                <div className="absolute right-3 top-9 size-4 animate-spin rounded-full border-2 border-warm-accent border-t-transparent" aria-hidden="true" />
            )}
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
