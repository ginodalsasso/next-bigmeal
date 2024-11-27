"use client";

import React, { useEffect, useState } from "react";

const IngredientDetailPage = ({ params }: { params: Promise<{ ingredientId: string }> }) => {
    const [ingredient, setIngredient] = useState<IngredientType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Récupérer l'ingrédient avec l'ID passé en paramètre
    useEffect(() => {
        const fetchIngredient = async () => {
            try {
                const resolvedParams = await params;
                const response = await fetch(`/api/ingredient/${resolvedParams.ingredientId}`);
                
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
    }, [params]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!ingredient) return <div>Ingredient introuvable.</div>;

    return (
        <div className="border rounded-lg p-6 xl:w-[70%] mx-auto">
            <h1 className="text-4xl font-semibold text-emerald-500 text-center mb-2">{ingredient.name}</h1>
            <p className="mx-auto text-center w-[90%] p-4 bg-slate-700 rounded-md">{ingredient.season}</p>
            <p className="text-center mt-4">
                {ingredient.categoryIngredient?.name || "Catégorie non disponible"}
            </p>
            {ingredient.season && <p>Saison: {ingredient.season}</p>}
        </div>
    );
};

export default IngredientDetailPage;