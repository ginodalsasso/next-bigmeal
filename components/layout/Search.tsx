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
            {/* Input de recherche */}
            <div className="w-auto lg:w-screen lg:max-w-xl
">
                <input
                    type="text"
                    name="search"
                    className="w-full rounded-md  border-zinc-600 bg-white px-4 py-3 text-black transition-all duration-200 focus:outline-double focus:ring-2 focus:ring-zinc-900"
                    placeholder="Rechercher un plat ou un ingrédient..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value as string || "")}
                />
                {/* Icône de recherche */}
                <button
                    type="button"
                    className="absolute right-4 top-3 text-zinc-500 transition-colors duration-150 hover:text-zinc-800"
                    onClick={handleResult}
                    disabled={loading}
                >
                    <SearchIcon />
                </button>
                {/* Indicateur de chargement */}
                {loading && (
                    <div className="absolute right-4 top-3">
                        <div className="size-5 animate-spin rounded-full border-2 border-zinc-500 border-t-transparent"></div>
                    </div>
                )}
            </div>

            {/* Liste des résultats */}
            {(results.length > 0 || (query.length >= 3 && results.length > 0)) && (
                <div className="size-full overflow-hidden rounded-md border border-zinc-400 bg-white hover:bg-zinc-200">
                    {/* Résultats individuels */}
                    {results.length > 0 && (
                        <ul className="max-h-60 overflow-y-auto">
                            {results.map((item) => (
                                <li
                                    key={item.id}
                                    className="cursor-pointer border-b border-zinc-200 px-4 py-3 text-sm text-zinc-800 transition-colors duration-150 last:border-b-0 hover:bg-zinc-100"
                                    onClick={() => handleItemResult(item)}
                                >
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    )}
                    
                    {/* Bouton pour voir tous les résultats */}
                    {query.length >= 3 && results.length > 0 && (
                        <Button className="w-full" onClick={handleResult}>
                            Voir tous les résultats
                        </Button>
                    )}
                </div>
            )}
            
            {/* Message pour recherche sans résultats */}
            {query.length >= 3 && results.length === 0 && !loading && (
                <div className="absolute mt-1 w-full border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-500 shadow-lg">
                    Aucun résultat trouvé pour &quot;{query}&quot;
                </div>
            )}
        </div>
    );
};

export default Search;