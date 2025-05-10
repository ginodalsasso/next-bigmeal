'use client';

import AddToShoppingListForm from "@/components/forms/AddToShoppingListForm";
import ItemView from "@/components/layout/ItemView";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CATEGORIES_MEALS_TOLOWER } from "@/lib/constants/ui_constants";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";


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
        <>
            <h1 className="mb-4 text-xl font-bold">Résultats pour {query}</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead><span className="table-head">Produits</span></TableHead>
                        <TableHead><span className="table-head">Actions</span></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {results.map((result) => (
                        <TableRow key={result.id}>
                            <TableCell className="table-cell">
                                <ItemView
                                    title={result.name}
                                    details={{
                                        category: result.category,
                                    }}
                                    // Si la catégorie fais partie de la constante CATEGORIES_MEALS_TOLOWER, le lien pointe vers /meals/nom-du-plat
                                    linkToDetails={`/${CATEGORIES_MEALS_TOLOWER.includes(result.category) ? "meals" : "ingredients"}/${result.name}`}

                                />
                            </TableCell>
                            <TableCell>
                                <AddToShoppingListForm 
                                    // Si la catégorie fais partie de la constante CATEGORIES_MEALS_TOLOWER, le type est "meal", sinon "ingredient"
                                    type={CATEGORIES_MEALS_TOLOWER.includes(result.category) ? "meal" : "ingredient"} 
                                    id={CATEGORIES_MEALS_TOLOWER.includes(result.category) ? result.name : result.id.toString()} 
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};

// Ajout d'un composant wrapper avec Suspense pour le chargement de la page
// Cela permet de gérer le chargement de la page de manière asynchrone
const SearchResultsPageWrapper: React.FC = () => {
    return (
        <Suspense fallback={<p>Chargement de la page...</p>}>
            <SearchResultsPage />
        </Suspense>
    );
};

export default SearchResultsPageWrapper;
