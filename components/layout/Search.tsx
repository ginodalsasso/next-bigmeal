import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import React from "react";
import { Button } from "../ui/button";
import { SearchIcon } from "lucide-react";
import { useDebounce } from "@/app/hooks/useDebounce";

// _________________________ TYPES _________________________
interface SearchSuggestion {
    id: string;
    name: string;
}

interface SearchBarProps {
    onSearch?: () => void;
}

// _________________________ COMPONENT _________________________
const Search: React.FC<SearchBarProps> = ({ onSearch }) => {

    // _________________________ ETATS _________________________
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const abortRef = useRef<AbortController | null>(null);

    const debouncedQuery = useDebounce<string>(query, 150);

    useEffect(() => {
        if (!debouncedQuery || debouncedQuery.length < 2) {
            setSuggestions([]);
            return;
        }

        // Annule la requête précédente si elle est encore en cours
        abortRef.current?.abort();
        abortRef.current = new AbortController();

        const fetchSuggestions = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/search?query=${debouncedQuery}`, {
                    signal: abortRef.current!.signal,
                });

                if (!response.ok) throw new Error("Erreur lors de la recherche");

                const data = await response.json();
                const combinedQuery: SearchSuggestion[] = [
                    ...(data.meals ?? []).map((m: SearchSuggestion) => ({ id: m.id, name: m.name })),
                    ...(data.ingredients ?? []).map((i: SearchSuggestion) => ({ id: i.id, name: i.name })),
                ];
                setSuggestions(combinedQuery);
            } catch (error: unknown) {
                if (error instanceof Error && error.name !== "AbortError") {
                    console.error("[API_ERROR] searchAPI", error);
                }
            }
            setLoading(false);
        };

        fetchSuggestions();
    }, [debouncedQuery]);

    const handleResult = () => {
        const url = `/search-results?query=${debouncedQuery}`;
        router.push(url);
        setQuery("");
        setSuggestions([]);
        onSearch?.();
    };

    const handleItemResult = (item: SearchSuggestion) => {
        const url = `/search-results?query=${item.name}`;
        router.push(url);
        setQuery("");
        setSuggestions([]);
        onSearch?.();
    };

    // _________________________ RENDU _________________________
    return (
        <div className="relative">
            <div className="w-auto lg:w-screen lg:max-w-xl">
                <input
                    id="search"
                    type="text"
                    name="search"
                    role="combobox"
                    aria-label="Rechercher un plat ou un ingrédient"
                    aria-expanded={suggestions.length > 0}
                    aria-autocomplete="list"
                    aria-controls="search-suggestions"
                    className="w-full rounded-md border border-zinc-600 bg-white px-4 py-3 pr-12 text-black transition-all duration-200 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                    placeholder="Rechercher un plat ou un ingrédient..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value || "")}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {loading ? (
                        <div className="size-5 animate-spin rounded-full border-2 border-zinc-400 border-t-transparent" aria-hidden="true" />
                    ) : (
                        <button
                            type="button"
                            className="text-zinc-500 transition-colors duration-150 hover:text-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
                            onClick={handleResult}
                            aria-label="Lancer la recherche"
                        >
                            <SearchIcon aria-hidden="true" />
                        </button>
                    )}
                </div>
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && (
                <div id="search-suggestions" className="absolute z-10 mt-1 w-full overflow-hidden rounded-md border border-zinc-200 bg-white shadow-lg">
                    <ul role="listbox" aria-label="Suggestions de recherche" className="max-h-60 overflow-y-auto">
                        {suggestions.map((item) => (
                            <li
                                key={item.id}
                                role="option"
                                aria-selected="false"
                                tabIndex={0}
                                className="cursor-pointer border-b border-zinc-100 px-4 py-3 text-sm text-zinc-800 transition-colors duration-150 last:border-b-0 hover:bg-zinc-50 focus-visible:bg-zinc-50 focus-visible:outline-none"
                                onClick={() => handleItemResult(item)}
                                onKeyDown={(e) => e.key === 'Enter' && handleItemResult(item)}
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>

                    <Button className="w-full rounded-none rounded-b-md" onClick={handleResult}>
                        Voir tous les résultats
                    </Button>
                </div>
            )}

            {/* Aucun résultat */}
            {query.length >= 2 && suggestions.length === 0 && !loading && (
                <div role="status" className="absolute mt-1 w-full rounded-md border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-500 shadow-lg">
                    Aucun résultat pour &quot;{query}&quot;
                </div>
            )}
        </div>
    );
};

export default Search;
