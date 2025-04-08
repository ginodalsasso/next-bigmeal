import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import React from "react";

// _________________________ TYPES _________________________
interface SearchResult {
    id: number;
    name: string;
}

interface SearchBarProps {
    onSearch?: () => void; // Callback pour gérer la recherche
}
    
// _________________________ COMPONENT _________________________
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {

    // _________________________ ETATS _________________________
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!query || query.length < 3) {
            setResults([]);
            return;
        }
        // Récupérer les résultats de la recherche
        const fetchResults = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/search?query=${query}`, { 
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
    }, [query]); // relance la recherche à chaque changement de la valeur de query

    const handleResult = () => {
        const url = `/search-results?query=${query}`;
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
        <div className="relative shadow-lg">
            {/* Input de recherche */}
            <div className="relative">
                <input
                    type="text"
                    name="search"
                    className="border-zinc-300 bg-white px-4 py-3 text-black transition-all duration-200 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-200"
                    placeholder="Rechercher un plat ou un ingrédient..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value as string || "")}
                />
                {/* Indicateur de chargement */}
                {loading && (
                    <div className="absolute right-4 top-3">
                        <div className="size-5 animate-spin rounded-full border-2 border-zinc-500 border-t-transparent"></div>
                    </div>
                )}
            </div>

            {/* Liste des résultats */}
            {(results.length > 0 || (query.length >= 3 && results.length > 0)) && (
                <div className="absolute z-50 mt-1 w-full overflow-hidden border border-zinc-200 bg-white shadow-xl">
                    {/* Résultats individuels */}
                    {results.length > 0 && (
                        <ul className="max-h-60 overflow-y-auto">
                            {results.map((item) => (
                                <li
                                    key={item.id}
                                    className="cursor-pointer border-b border-zinc-100 px-4 py-3 text-sm text-zinc-800 transition-colors duration-150 last:border-b-0 hover:bg-zinc-100"
                                    onClick={() => handleItemResult(item)}
                                >
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    )}
                    
                    {/* Bouton pour voir tous les résultats */}
                    {query.length >= 3 && results.length > 0 && (
                        <button
                            className="w-full border-t border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-600 transition-colors duration-150 hover:bg-zinc-100"
                            onClick={handleResult}
                        >
                            Voir tous les résultats
                        </button>
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

export default SearchBar;
