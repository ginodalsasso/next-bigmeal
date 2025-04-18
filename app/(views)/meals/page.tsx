// Composant listant les repas
import { ITEMS_PER_PAGE } from "@/lib/constants/ui_constants";
import MealsList from "./_components/MealsList";

// Service de récupération des repas
import { getMeals } from "@/lib/services/data_fetcher";
import Pagination from "@/components/layout/Pagination";
import { ensureArray } from "@/lib/utils";

// Forcer le rendu SSR
export const dynamic = "force-dynamic";

interface searchParamsProps {
    searchParams: Promise<{ 
        page?: string;
        categories?: string[]; // Paramètre de catégorie pour le filtrage
    }> | undefined 
}

export default async function MealPage({ searchParams }: searchParamsProps) {
    try {
        const params  = await searchParams; // Attendre la résolution de la promesse pour obtenir les paramètres de recherche
        // Récupérer le numéro de page à partir des paramètres de recherche, ou 1 par défaut
        const page = parseInt(params?.page  || '1', 10) as number; 
        const itemsPerPage = parseInt(ITEMS_PER_PAGE, 10); // Nombre d'items par page pour la pagination
        
        const categories = ensureArray(params?.categories); // Vérifie si les paramètres de recherche existent et s'ils sont des tableaux

        const meals = await getMeals(
            (page - 1) * itemsPerPage, 
            itemsPerPage,
            categories,
        );
        
        // _________________________ RENDU __________________
        return (
            <div>
                <MealsList fetchedMeals={meals} />
                
                {/* Pagination */}
                <Pagination
                    currentPage={page} 
                    hasNextPage={meals.length === itemsPerPage} 
                />
            </div>

        );
    } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des repas :", error);
        return (
            <div className="flex min-h-screen items-center justify-center text-center">
                <p className="text-red-500">Erreur lors de la récupération des ingrédients.</p>
            </div>
        );
    }
    }