"use client";

// Bibliothèques tierces
import React, { useEffect, useState, use } from "react";

// Types
import { IngredientType } from "@/lib/types/schemas_interfaces";

// Services
import { fetchIngredientAPI } from "@/lib/services/ingredients_service";


// _________________________ COMPONENT _________________________
const IngredientDetailPage = ({ params }: { params: Promise<{ ingredientName: string }> }) => {

    const { ingredientName } = use(params);

    // _________________________ ETATS _________________________
    const [ingredient, setIngredient] = useState<IngredientType | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // _________________________ LOGIQUE _________________________
    useEffect(() => {
        const fetchIngredient = async () => {
            try {
                await fetchIngredientAPI(ingredientName).then((data) => {
                    setIngredient(data);
                }
            );
            } catch (error) {
                console.error("[FETCH_INGREDIENT_ERROR]", error);
                setError('Erreur lors de la récupération de l\'ingrédient');
            } finally {
                setLoading(false);
            }
        };
        fetchIngredient();
    }, [ingredientName]);

    // _________________________ RENDU _________________________
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!ingredient) return <div>Ingredient introuvable.</div>;

    return (
        <div className="mx-auto rounded-lg border p-6">
            <h1 className="mb-2 text-center text-4xl font-semibold text-emerald-500">
                {ingredient.name}
            </h1>
            <p className="mx-auto w-[90%] rounded-md bg-slate-700 p-4 text-center">
                {ingredient.season}
            </p>
            <p className="mt-4 text-center">
                {ingredient.categoryIngredient?.name || "Catégorie non disponible"}
            </p>
            {ingredient.season && <p>Saison: {ingredient.season}</p>}
            {ingredient.compositions.length > 0 ? (
                ingredient.compositions.map((composition) => (
                    <div key={composition.id}>
                        <p>{composition.meal.name}</p>
                    </div>
                ))
            ) : (
                <p>Aucun repas disponible pour cet ingrédient.</p>
            )}
        </div>
    );
};

export default IngredientDetailPage;
