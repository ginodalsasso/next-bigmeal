// Composant listant les repas
import { ITEMS_PER_PAGE } from "@/lib/constants/ui_constants";
import MealsList from "./_components/MealsList";

// Service de récupération des repas
import { getCategoriesMeal, getMeals } from "@/lib/services/data_fetcher";
import Pagination from "@/components/layout/Pagination";
import { ensureArray } from "@/lib/utils";
import { db } from "@/lib/db";
import { getUserSession } from "@/lib/security/getSession";

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
        const { session } = await getUserSession();
        const userId = session?.user?.id;
        
        // _________________________ PARAMETRES __________________
        const params  = await searchParams; // Attendre la résolution de la promesse pour obtenir les paramètres de recherche
        // Récupérer le numéro de page à partir des paramètres de recherche, ou 1 par défaut
        const page = parseInt(params?.page  || '1', 10) as number; 
        const itemsPerPage = parseInt(ITEMS_PER_PAGE, 10); // Nombre d'items par page pour la pagination
        
        const categories = ensureArray(params?.categories); // Vérifie si les paramètres de recherche existent et s'ils sont des tableaux
        
        // _________________________ API _________________________
        const meals = await getMeals(
            (page - 1) * itemsPerPage, 
            itemsPerPage,
            categories,
        );

        const categoryNames = await getCategoriesMeal();

        // _________________________ LIKES ______________________
        let likedMealNames: string[] = [];

        
        const likedMeals = await db.mealLike.findMany({
            where: { userId },
            select: {
                meal: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        
        likedMealNames = likedMeals.map((like) => like.meal.name);

        // _________________________ RENDU __________________
        if (!userId) {
            return <p className="text-center text-gray-500">Veuillez vous connecter pour voir vos favoris.</p>;
        }

        return (
            <div>
                <MealsList 
                    fetchedMeals={meals}
                    fetchedCategories={categoryNames}
                    fetchedlikedMeals={likedMealNames}
                />

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