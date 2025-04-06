// Composant listant les repas
import { ITEMS_PER_PAGE } from "@/lib/constants/ui_constants";
import MealsList from "./_components/MealsList";

// Service de récupération des repas
import { getMeals } from "@/lib/services/data_fetcher";
import Pagination from "@/components/layout/Pagination";

interface searchParamsProps {
    searchParams: Promise<{ page?: string }> | { page?: string } 
}

export default async function MealPage({ searchParams }: searchParamsProps) {
    const params  = await searchParams; // Attendre la résolution de la promesse pour obtenir les paramètres de recherche
    // Récupérer le numéro de page à partir des paramètres de recherche, ou 1 par défaut
    const page = parseInt(params.page  || '1') as number; 

    const itemsPerPage = parseInt(ITEMS_PER_PAGE); // Nombre d'items par page pour la pagination
    
    const meals = await getMeals((page - 1) * itemsPerPage, itemsPerPage);
    
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

    )   
}
