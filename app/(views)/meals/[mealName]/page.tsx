"use client";

import React, { useEffect, useState, use } from "react";
import { MealType } from "@/lib/types/schemas_interfaces";
import { translatedUnit } from "@/lib/utils";

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
            {meal.description || "Aucune description disponible pour ce repas."}
                {meal.compositions.length > 0 ? (
                    meal.compositions.map((composition) => (
                        <div key={composition.id} className="flex gap-2">
                            <p>{composition.ingredient.name}</p>
                            <div className="flex">
                                <p>{composition.quantity}</p>
                                <p>{translatedUnit(composition.unit)}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Aucun ingrédients disponible pour ce repas.</p>
                )}
        </div>
    );
};

export default MealDetailPage;
