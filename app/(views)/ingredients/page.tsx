// Composant de liste des ingrédients
import { ITEMS_PER_PAGE } from "@/lib/constants/ui_constants";
import IngredientsList from "./_components/IngredientsList";

// Service de récupération des ingrédients
import { getCategoriesIngredient, getIngredients } from "@/lib/services/data_fetcher";
import Pagination from "@/components/layout/Pagination";
import { ensureArray } from "@/lib/utils";

// Forcer le rendu SSR
export const dynamic = "force-dynamic";

interface searchParamsProps {
    searchParams: Promise<{ 
        page?: string;  // Paramètre de page pour la pagination
        categories?: string[];  // Paramètre de catégorie pour le filtrage
        season?: string[]  // Paramètre de saison pour le filtrage
    }> | undefined
}

export default async function IngredientPage( { searchParams }: searchParamsProps) {
    try {
        const params  = await searchParams; // Attendre la résolution de la promesse pour obtenir les paramètres de recherche

        // Gestion de la pagination
        const page = parseInt(params?.page || "1", 10);
        const itemsPerPage = parseInt(ITEMS_PER_PAGE, 10);
    
        // Vérifie si les paramètres de recherche existent et s'ils sont des tableaux
        const categories = ensureArray(params?.categories);
        const season = ensureArray(params?.season);
    
        // Paginer avec take=5 ingrédients par page et skip=(page-1)*5 ingrédients
        // getIngredients(skip, take) : skip = le nombre d'ingrédients à ignorer, take = le nombre d'ingrédients à récupérer
        const ingredients = await getIngredients(
            (page - 1) * itemsPerPage, // page - 1 pour ignorer les ingrédients de la page précédente, 5 pour prendre 5 ingrédients
            itemsPerPage,  
            categories, 
            season
        ); 

        const categoryNames = await getCategoriesIngredient();

        return (
            <div>
                <IngredientsList 
                    fetchedIngredients={ingredients} 
                    fetchedCategories={categoryNames}
                />

                {/* Pagination */}
                <Pagination
                    currentPage={page} 
                    hasNextPage={ingredients.length === itemsPerPage}  
                />
            </div>
        ); 
    } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des ingrédients :", error);
        return (
            <div className="flex min-h-screen items-center justify-center text-center">
                <p className="text-red-500">Erreur lors de la récupération des ingrédients.</p>
            </div>
        );
    }
}