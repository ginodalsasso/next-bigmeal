"use client";

import React, { useEffect, useState, use } from "react";
import { MealType } from "@/lib/types/schemas_interfaces";
import { Description } from "@radix-ui/react-dialog";

const MealDetailPage = ({ params }: { params: Promise<{ mealName: string }> }) => {

    const { mealName } = use(params);

    // _________________________ ETATS _________________________
    const [meal, setMeal] = useState<MealType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // _________________________ LOGIQUE _________________________
    useEffect(() => {
        const fetchMeal= async () => {
            try {
                const response = await fetch(`/api/meals/${mealName}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch meal");
                }
                const data: MealType = await response.json();
                setMeal(data);
            } catch (error) {
                console.error("Erreur lors de la récupération du repas :", error);
                setError('Erreur lors de la récupération du repas');
            } finally {
                setLoading(false);
            }
        };
        fetchMeal();
    }, [mealName]);

    // _________________________ RENDU _________________________
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!meal) return <div>Repas introuvable.</div>;

    return (
        <div className="border rounded-lg p-6 xl:w-[70%] mx-auto">
            <h1 className="text-4xl font-semibold text-emerald-500 text-center mb-2">
                {meal.name}
            </h1>
            <p className="mx-auto text-center w-[90%] p-4 bg-slate-700 rounded-md">
                {meal.description}
            </p>
            {/* <p className="text-center mt-4">
                {ingredient.categoryIngredient?.name || "Catégorie non disponible"}
            </p> */}
            {/* {ingredient.season && <p>Saison: {ingredient.season}</p>}
            {ingredient.compositions.length > 0 ? (
                ingredient.compositions.map((composition) => (
                    <div key={composition.id}>
                        <p>{composition.meal.name}</p>
                    </div>
                ))
            ) : (
                <p>Aucun repas disponible pour cet ingrédient.</p>
            )} */}
        </div>
    );
};

export default MealDetailPage;
