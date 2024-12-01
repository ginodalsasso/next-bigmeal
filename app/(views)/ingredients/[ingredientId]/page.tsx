"use client";

import React from "react";
import { IngredientType } from "@/lib/types/schemas_interfaces";

const IngredientDetailPage = ({ params }: { params: Promise<{ ingredientId: string }> }) => {

    // Utilisez React.use pour résoudre le Promise
    const { ingredientId } = React.use(params);

    // _________________________ ETATS _________________________
    const [ingredient, setIngredient] = React.useState<IngredientType | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    // _________________________ LOGIQUE _________________________
    React.useEffect(() => {
        const fetchIngredient = async () => {
            try {
                const response = await fetch(`/api/ingredients/${ingredientId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch ingredient");
                }
                const data: IngredientType = await response.json();
                setIngredient(data);
            } catch (error) {
                console.error("Erreur lors de la récupération de l'ingrédient :", error);
                setError('Erreur lors de la récupération de l\'ingrédient');
            } finally {
                setLoading(false);
            }
        };
        fetchIngredient();
    }, [ingredientId]);

    // _________________________ RENDU _________________________
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!ingredient) return <div>Ingredient introuvable.</div>;

    return (
        <div className="border rounded-lg p-6 xl:w-[70%] mx-auto">
            <h1 className="text-4xl font-semibold text-emerald-500 text-center mb-2">
                {ingredient.name}
            </h1>
            <p className="mx-auto text-center w-[90%] p-4 bg-slate-700 rounded-md">
                {ingredient.season}
            </p>
            <p className="text-center mt-4">
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
