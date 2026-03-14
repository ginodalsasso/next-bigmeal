import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import React from "react";
import { Button } from "../ui/button";
import { SearchIcon } from "lucide-react";
import { useDebounce } from "@/app/hooks/useDebounce";

// _________________________ TYPES _________________________
interface SearchResult {
    id: number;
    name: string;
}

interface SearchBarProps {
    onSearch?: () => void; // Callback pour gérer la recherche
}
    
// _________________________ COMPONENT _________________________
const Search: React.FC<SearchBarProps> = ({ onSearch }) => {

    // _________________________ ETATS _________________________
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const debouncedQuery = useDebounce<string>(query, 300);

    useEffect(() => {
        if (!debouncedQuery || debouncedQuery.length < 3) {
            setResults([]);
            return;
        }
        // Récupérer les résultats de la recherche
        const fetchResults = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/search?query=${debouncedQuery}`, { 
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok) {
                    throw new Error("Erreur lors de la recherche");
                }

                const data = await response.json();
                setResults(data);
            } catch (error) {
                console.error("[API_ERROR] searchAPI", error);
            }
            setLoading(false);
        };

        const timeout = setTimeout(fetchResults, 300); // délai de 300ms avant de lancer la recherche pour éviter les appels inutiles
        return () => clearTimeout(timeout); // annule le délai si la recherche est relancée avant la fin du délai
    }, [debouncedQuery]); // relance la recherche à chaque changement de la valeur de query

    const handleResult = () => {
        const url = `/search-results?query=${debouncedQuery}`;
        router.push(url);
        setQuery("");
        if (onSearch) {
            onSearch();
        }
    };

    const handleItemResult = (item: SearchResult) => {
        const url = `/search-results?query=${item.name}`;
        router.push(url);
        setQuery("");
        if (onSearch) {
            onSearch();
        }
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
                    aria-expanded={results.length > 0}
                    aria-autocomplete="list"
                    aria-controls="search-results"
                    className="w-full rounded-md border border-zinc-600 bg-white px-4 py-3 pr-12 text-black transition-all duration-200 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                    placeholder="Rechercher un plat ou un ingrédient..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value as string || "")}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {loading ? (
                        <div className="size-5 animate-spin rounded-full border-2 border-zinc-400 border-t-transparent" aria-hidden="true"></div>
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

            {/* Liste des résultats */}
            {results.length > 0 && (
                <div id="search-results" className="absolute z-10 mt-1 w-full overflow-hidden rounded-md border border-zinc-200 bg-white shadow-lg">
                    <ul role="listbox" aria-label="Résultats de recherche" className="max-h-60 overflow-y-auto">
                        {results.map((item) => (
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

                    {query.length >= 3 && (
                        <Button className="w-full rounded-none rounded-b-md" onClick={handleResult}>
                            Voir tous les résultats
                        </Button>
                    )}
                </div>
            )}

            {/* Message sans résultats */}
            {query.length >= 3 && results.length === 0 && !loading && (
                <div role="status" className="absolute mt-1 w-full rounded-md border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-500 shadow-lg">
                    Aucun résultat pour &quot;{query}&quot;
                </div>
            )}
        </div>
    );
};

export default Search;