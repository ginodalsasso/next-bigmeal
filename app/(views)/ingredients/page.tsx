// Composant de liste des ingrédients
import IngredientsList from "./_components/IngredientsList";

// Service de récupération des ingrédients
import { getIngredients } from "@/lib/services/data_fetcher";


export default async function IngredientPage({ searchParams }: { searchParams: { page?: string } }) {
    // Récupérer le numéro de page à partir des paramètres de recherche, ou 1 par défaut
    const page = parseInt(searchParams.page || '1'); 

    // Paginer avec take=5 ingrédients par page et skip=(page-1)*5 ingrédients
    // getIngredients(skip, take) : skip = le nombre d'ingrédients à ignorer, take = le nombre d'ingrédients à récupérer
    const ingredients = await getIngredients((page - 1) * 5, 5); // page - 1 pour ignorer les ingrédients de la page précédente, 5 pour prendre 5 ingrédients

    return (
        <div>
            <IngredientsList fetchedIngredients={ingredients} />

            {/* Pagination */}
            <div className="mt-4 flex justify-between">
                {page > 1 && ( // Si la page actuelle est supérieure à 1, afficher le bouton de page précédente
                    <a href={`?page=${page - 1}`}>
                        Page Précédente
                    </a>
                )}
                {ingredients.length === 5 && ( // Si le nombre d'ingrédients récupérés est égal à 5, afficher le bouton de page suivante
                    <a href={`?page=${page + 1}`}>
                        Page Suivante
                    </a>
                )}
            </div>
        </div>
    );
}
