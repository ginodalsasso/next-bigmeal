"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { Season } from "@/lib/types/enums";
import { CategoryIngredientType } from "@/lib/types/schemas_interfaces";
import { IngredientFormErrorType, IngredientFormType } from "@/lib/types/forms_interfaces";


// CONTRAINTES DE VALIDATION
const ingredientConstraints = z.object({
    name: z.string().min(3, "Le nom doit comporter au moins 3 caractères").max(255),
    season: z.nativeEnum(Season).nullable(),
    categoryIngredientId: z.string().min(1, "Une catégorie est obligatoire"),
});

const CreateIngredientPage = () => {
    const [form, setForm] = useState<IngredientFormType>({
        name: "",
        season: null,
        categoryIngredientId: "",
    });

    const [categories, setCategories] = useState<CategoryIngredientType[]>([]);
    const [error, setError] = useState<IngredientFormErrorType>({});
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // Charger les catégories d'ingrédients
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("/api/categoryIngredient");
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des catégories");
                }
                const data: CategoryIngredientType[] = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("[FETCH_CATEGORIES_ERROR]", error);
            }
        };
        fetchCategories();
    }, []);

    
    const createIngredient = async (data: IngredientFormType) => {
        try {
            const response = await fetch("/api/ingredient/crud", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error("Erreur lors de la création de l'ingrédient");
            }
            return JSON.parse(await response.text());
        } catch (error) {
            console.error("[CREATE_INGREDIENT_API_ERROR]", error);
            throw error;
        }
    };
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError({});
        // Valider les données du formulaire
        const validationResult = ingredientConstraints.safeParse(form);
        if (!validationResult.success) {
            const formattedErrors = validationResult.error.flatten();
            setError({
                name: formattedErrors.fieldErrors.name?.[0],
                season: formattedErrors.fieldErrors.season?.[0],
                categoryIngredientId: formattedErrors.fieldErrors.categoryIngredientId?.[0],
            });
            setIsLoading(false);
            return;
        }
        // Créer l'ingrédient avec les données du formulaire
        try {
            await createIngredient(form);
            router.push("/ingredient");
        } catch (error) {
            console.error("[CREATE_INGREDIENT]", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="flex flex-col w-full my-5 gap-5" onSubmit={handleSubmit}>
            <h1 className="text-2xl text-center mb-5">Créer un nouvel ingrédient</h1>

            {/* Champ pour le nom de l'ingrédient */}
            <input
                type="text"
                placeholder="Nom de l'ingrédient"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border border-gray-300 p-2 rounded text-black mx-auto w-[90%]"
                required
            />
            {error.name && (
                <p className="text-red-500 text-sm mb-4 mx-auto w-[90%]">{error.name}</p>
            )}

            {/* Sélection pour la saison */}
            <select
                value={form.season || ""}
                onChange={(e) =>
                    setForm({
                        ...form,
                        season: e.target.value ? (e.target.value as Season) : null,
                    })
                }
                className="border border-gray-300 p-2 rounded text-black mx-auto w-[90%]"
            >
                <option value="">-- Choisir une saison --</option>
                {Object.values(Season).map((season) => (
                    <option key={season} value={season}>
                        {season}
                    </option>
                ))}
            </select>
            {error.season && (
                <p className="text-red-500 text-sm mb-4 mx-auto w-[90%]">{error.season}</p>
            )}

            {/* Sélection pour la catégorie */}
            <select
                value={form.categoryIngredientId}
                onChange={(e) => setForm({ ...form, categoryIngredientId: e.target.value })} 
                className="border border-gray-300 p-2 rounded text-black mx-auto w-[90%]"
                required
            >
                <option value="">-- Choisir une catégorie --</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
            {error.categoryIngredientId && (
                <p className="text-red-500 text-sm mb-4 mx-auto w-[90%]">
                    {error.categoryIngredientId}
                </p>
            )}

            {/* Bouton de soumission */}
            <button
                type="submit"
                className="bg-emerald-500 text-white font-bold p-2 rounded mx-auto w-[90%] hover:bg-emerald-400"
                disabled={isLoading}
            >
                {isLoading ? "Chargement..." : "Créer"}
            </button>
        </form>
    );
};

export default CreateIngredientPage;
