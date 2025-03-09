import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// _________________________ TYPES _________________________
interface SearchResult {
    id: number;
    name: string;
}

// _________________________ COMPONENT _________________________
const SearchBar: React.FC = () => {

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
                    body: JSON.stringify({ query })
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
        router.push(`/search-results?query=${query}`);
    };


    // _________________________ RENDU _________________________
    return (
        <div className="relative mx-auto w-full max-w-md">
            <input
                type="text"
                name="search"
                className="w-full border p-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Rechercher un plat ou un ingrédient..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {loading && <p className="mt-2 text-gray-500">Chargement...</p>}
            {results.length > 0 && (
                <ul className="absolute w-full overflow-hidden border shadow-md">
                    {results.map((item) => (
                        <li
                            key={item.id}
                            className="cursor-pointer border-b p-2 last:border-b-0"
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            )}
            {query.length >= 3 && results.length > 0 && (
                <button
                    className="mt-10"
                    onClick={handleResult}
                >
                    Voir tous les résultats
                </button>
            )}
        </div>
    );
};

export default SearchBar;
