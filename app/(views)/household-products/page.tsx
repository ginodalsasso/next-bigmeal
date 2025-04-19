// Composant de liste des ingrédients
import { ITEMS_PER_PAGE } from "@/lib/constants/ui_constants";
import HouseholdProductList from "./_components/HouseholdProductList";

// Service de récupération des ingrédients
import { getHouseholdProduct } from "@/lib/services/data_fetcher";
import Pagination from "@/components/layout/Pagination";
import { ensureArray } from "@/lib/utils";

// Forcer le rendu SSR
export const dynamic = "force-dynamic";

interface searchParamsProps {
    searchParams: Promise<{ 
        page?: string;  // Paramètre de page pour la pagination
        categories?: string[];  // Paramètre de catégorie pour le filtrage
    }> | undefined
}

export default async function HouseholdProductPage( { searchParams }: searchParamsProps) {
    try {
        const params  = await searchParams; // Attendre la résolution de la promesse pour obtenir les paramètres de recherche

        // Gestion de la pagination
        const page = parseInt(params?.page || "1", 10);
        const itemsPerPage = parseInt(ITEMS_PER_PAGE, 10);
    
        // Vérifie si les paramètres de recherche existent et s'ils sont des tableaux
        const categories = ensureArray(params?.categories);
    
        // Paginer avec take=5 ingrédients par page et skip=(page-1)*5 ingrédients
        // getIngredients(skip, take) : skip = le nombre d'ingrédients à ignorer, take = le nombre d'ingrédients à récupérer
        const householdProducts = await getHouseholdProduct(
            (page - 1) * itemsPerPage, // page - 1 pour ignorer les ingrédients de la page précédente, 5 pour prendre 5 ingrédients
            itemsPerPage,  
            categories, 
        ); 

        return (
            <div>
                <HouseholdProductList fetchedHouseholdProducts={householdProducts} />

                {/* Pagination */}
                <Pagination
                    currentPage={page} 
                    hasNextPage={householdProducts.length === itemsPerPage}  
                />
            </div>
        ); 
    } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des produits ménagers :", error);
        return (
            <div className="flex min-h-screen items-center justify-center text-center">
                <p className="text-red-500">Erreur lors de la récupération des produits ménagers.</p>
            </div>
        );
    }
}