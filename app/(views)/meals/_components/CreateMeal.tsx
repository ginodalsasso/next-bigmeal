"use client";

import { useEffect, useState } from "react";

import { useFormValidation } from "@/app/hooks/useFormValidation";
import { CategoryMealType } from "@/lib/types/schemas_interfaces";
import { MealFormType } from "@/lib/types/forms_interfaces";
import { mealConstraints } from "@/lib/constraints/forms_constraints";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CreateMealProps } from "@/lib/types/props_interfaces";

const CreateMeal: React.FC<CreateMealProps> = ({ onMealCreated, onClose }) => {
    // _________________________ HOOKS _________________________
    const [categories, setCategories] = useState<CategoryMealType[]>([]);

    const [form, setForm] = useState<MealFormType>({
        name: "",
        description: null,
        categoryMealId: "",
    });

    // Hook de validation
    const { error, validate, isLoading, setIsLoading } = useFormValidation<MealFormType>(
        mealConstraints,
        ["name", "description", "categoryMealId"]
    );

    // _________________________ LOGIQUE _________________________
    // Appel API pour récupérer les catégories de repas
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("/api/categories-meal");
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des categories-repas");
                }
                const data: CategoryMealType[] = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("[FETCH_CATEGORIES_ERROR]", error);
            }
        };
        fetchCategories();
    }, []);

    // Appel API pour créer un repas
    const createMeal = async (data: MealFormType) => {
        try {
            const response = await fetch("/api/meals", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error("Erreur lors de la création du repas");
            }
            return await response.json();
        } catch (error) {
            console.error("[CREATE_MEAL_API_ERROR]", error);
            throw error;
        }
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Valider les données du formulaire avec le hook
        if (!validate(form)) {
            setIsLoading(false);
            return;
        }

        // Créer le repas avec les données validées
        try {
            const createdMeal = await createMeal(form);
            onMealCreated(createdMeal); // Ajout à la liste parent
            toast("Repas créé avec succès");
        } catch (error) {
            console.error("[CREATE_MEAL]", error);
        } finally {
            setIsLoading(false);
        }
    };

    // _________________________ RENDU _________________________
    return (
        <form className="flex flex-col gap-5 p-5" onSubmit={handleSubmit}>
            {/* Champ pour le nom du repas */}
            <input
                type="text"
                placeholder="Nom du repas"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border border-gray-300 p-2 rounded text-black"
                required
            />
            {error?.name && (
                <p className="text-red-500 text-sm mb-4 mx-auto">{error.name}</p>
            )}

            {/* Text area pour la description */}
            <textarea
                placeholder="Description du repas"
                value={form.description ?? ""}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="border border-gray-300 p-2 rounded text-black"
            />
            {error?.description && (
                <p className="text-red-500 text-sm mb-4 mx-auto">{error.description}</p>
            )}

            {/* Sélection pour la catégorie */}
            <select
                value={form.categoryMealId}
                onChange={(e) => setForm({ ...form, categoryMealId: e.target.value })}
                className="border border-gray-300 p-2 rounded text-black"
                required
            >
                <option value="">-- Choisir une catégorie --</option>
                {categories.map((categorie) => (
                    <option key={categorie.id} value={categorie.id}>
                        {categorie.name}
                    </option>
                ))}
            </select>
            {error?.categoryMealId && (
                <p className="text-red-500 text-sm mb-4 mx-auto">{error.categoryMealId}</p>
            )}

            {/* Bouton de soumission */}
            <div className="flex flex-col-reverse gap-2 lg:justify-end">
                <Button variant="cancel" onClick={onClose}>
                    Annuler
                </Button>
                <Button type="submit" variant="success" disabled={isLoading}>
                    {isLoading ? "Ajout en cours..." : "Ajouter"}
                </Button>
            </div>
        </form>
    );
};

export default CreateMeal;
