// Composant de liste des ingrédients
import { ITEMS_PER_PAGE } from "@/lib/constants/ui_constants";
import IngredientsList from "./_components/IngredientsList";

// Service de récupération des ingrédients
import { getIngredients } from "@/lib/services/data_fetcher";
import Pagination from "@/components/layout/Pagination";

interface searchParamsProps {
    searchParams: Promise<{ page?: string }> | { page?: string } 

}

export default async function IngredientPage({ searchParams }: searchParamsProps) {
    const params  = await searchParams; // Attendre la résolution de la promesse pour obtenir les paramètres de recherche
    // Récupérer le numéro de page à partir des paramètres de recherche, ou 1 par défaut
    const page = parseInt(params.page  || '1') as number; 
    const itemsPerPage = parseInt(ITEMS_PER_PAGE); // Nombre d'items par page pour la pagination

    // Paginer avec take=5 ingrédients par page et skip=(page-1)*5 ingrédients
    // getIngredients(skip, take) : skip = le nombre d'ingrédients à ignorer, take = le nombre d'ingrédients à récupérer
    const ingredients = await getIngredients((page - 1) * itemsPerPage, itemsPerPage); // page - 1 pour ignorer les ingrédients de la page précédente, 5 pour prendre 5 ingrédients

    return (
        <div>
            <IngredientsList fetchedIngredients={ingredients} />

            {/* Pagination */}
            <Pagination
                currentPage={page} 
                hasNextPage={ingredients.length === itemsPerPage} 
            />
        </div>
    );
}
