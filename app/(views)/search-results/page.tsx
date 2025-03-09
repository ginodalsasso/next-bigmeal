'use client';

import ItemView from "@/components/layout/ItemView";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


// _________________________ TYPES _________________________
interface SearchResult {
    id: number;
    name: string;
    description: string;
}

// _________________________ COMPONENT _________________________
const SearchResultsPage: React.FC = () => {

    // _________________________ ETATS _________________________
    const searchParams = useSearchParams();
    const query = searchParams.get('query');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!query) return;

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
                console.error("Error fetching search results", error);
            }
            setLoading(false);
        };

        fetchResults();
    }, [query]);

    if (loading) {
        return <p>Chargement...</p>;
    }

    // _________________________ RENDU _________________________
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Résultats pour {query}</h1>
            {results.map((result) => (
                <div key={result.id} className="border-b p-2">
                    {/* <h2 className="text-xl font-semibold">{result.name}</h2> */}
                    {/* <p className="text-gray-700">{result.description}</p> */}
                    <ItemView
                        title={result.name}
                        details={{
                            // category: meal.categoryMeal?.name || "Non spécifié",
                            // description: meal.description,
                        }}
                        // linkToDetails={`/meals/${meal.name}`}
                    />
                </div>
            ))}
        </div>
    );
};

export default SearchResultsPage;
