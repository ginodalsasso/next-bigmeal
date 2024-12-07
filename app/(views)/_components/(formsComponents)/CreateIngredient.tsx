"use client";

import React, { useEffect, useState } from "react";

import { Season } from "@/lib/types/enums";
import { CategoryIngredientType, IngredientType } from "@/lib/types/schemas_interfaces";
import { IngredientFormErrorType, IngredientFormType } from "@/lib/types/forms_interfaces";
import { ingredientConstraints } from "@/lib/types/forms_constraints";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";


// _________________________ COMPOSANT _________________________
const CreateIngredient = ({ onIngredientCreated, onClose }: { onIngredientCreated: (ingredient: IngredientType) => void, onClose: () => void }) => {
    
    // _________________________ HOOKS _________________________
    const [categories, setCategories] = useState<CategoryIngredientType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<IngredientFormErrorType>({});
    const [form, setForm] = useState<IngredientFormType>({
        name: "",
        season: null,
        categoryIngredientId: "",
    });


    // _________________________ LOGIQUE _________________________
    // Appel API pour récupérer les catégories d'ingrédients
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("/api/categories-ingredient");
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des categories-ingredient");
                }
                const data: CategoryIngredientType[] = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("[FETCH_CATEGORIES_ERROR]", error);
            }
        };
        fetchCategories();
    }, []);

    // Appel API pour créer un ingrédient
    const createIngredient = async (data: IngredientFormType) => {
        try {
            const response = await fetch("/api/ingredients", {
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
    
    // Gestion de la soumission du formulaire
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
            const createdIngredient = await createIngredient(form);
            onIngredientCreated(createdIngredient); // Ajout à la liste parent
            toast("Ingrédient créé avec succès");
            onClose(); // Fermer le dialogue
        } catch (error) {
            console.error("[CREATE_INGREDIENT]", error);
        } finally {
            setIsLoading(false);
        }
    };


    // _________________________ RENDU _________________________
    return (
        <form className="flex flex-col gap-5 p-5" onSubmit={handleSubmit}>
            {/* Champ pour le nom de l'ingrédient */}
            <input
                type="text"
                placeholder="Nom de l'ingrédient"
                value={form.name} 
                onChange={(e) => setForm({ ...form, name: e.target.value })} 
                className="border border-gray-300 p-2 rounded text-black "
                required
            />
            {error.name && (
                <p className="text-red-500 text-sm mb-4 mx-auto">{error.name}</p>
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
                className="border border-gray-300 p-2 rounded text-black"
            >
                <option value="">-- Choisir une saison --</option>
                {Object.values(Season).map((season) => (
                    <option key={season} value={season}>
                        {season}
                    </option>
                ))}
            </select>
            {error.season && (
                <p className="text-red-500 text-sm mb-4 mx-auto">{error.season}</p>
            )}

            {/* Sélection pour la catégorie */}
            <select
                value={form.categoryIngredientId}
                onChange={(e) => setForm({ ...form, categoryIngredientId: e.target.value })} 
                className="border border-gray-300 p-2 rounded text-black"
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
                <p className="text-red-500 text-sm mb-4 mx-auto">
                    {error.categoryIngredientId}
                </p>
            )}

            {/* Bouton de soumission */}
            <div className="flex flex-col-reverse gap-2 lg:justify-end">
                <Button
                    variant="cancel"
                    onClick={onClose}
                >
                    Annuler
                </Button>
                <Button
                    type="submit"
                    variant="success"
                    disabled={isLoading}
                >
                    {isLoading ? "Ajout en cours..." : "Ajouter"}
                </Button>
            </div>
        </form>
    );
};

export default CreateIngredient;
