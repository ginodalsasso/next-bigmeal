'use client';

import AddToShoppingListForm from "@/components/forms/AddToShoppingListForm";
import ItemView from "@/components/layout/ItemView";
import { CATEGORIES_MEALS_TOLOWER } from "@/lib/constants/ui_constants";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


// _________________________ TYPES _________________________
interface SearchResult {
    id: number;
    name: string;
    description?: string;
    category: string;
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
                console.table(data);
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
                <div key={result.id} className="card">
                    <ItemView
                        title={result.name}
                        details={{
                            category: result.category,
                        }}
                         // Si la catégorie fais partie de la constante CATEGORIES_MEALS_TOLOWER, le lien pointe vers /meals/nom-du-plat
                        linkToDetails={`
                            /${CATEGORIES_MEALS_TOLOWER.includes(result.category) ? "meals" : "ingredients"}/${result.name}
                        `}
                    />

                    <AddToShoppingListForm 
                        // Si la catégorie fais partie de la constante CATEGORIES_MEALS_TOLOWER, le type est "meal", sinon "ingredient"
                        type={CATEGORIES_MEALS_TOLOWER.includes(result.category) ? "meal" : "ingredient"} 
                        id={CATEGORIES_MEALS_TOLOWER.includes(result.category) ? result.name : result.id.toString()} 
                    />
                </div>
            ))}
        </div>
    );
};

export default SearchResultsPage;
