import { useEffect, useState } from "react";

import {Button} from "@/components/ui/button";

import { CategoryMealType } from "@/lib/types/schemas_interfaces";
import { UpdateMealProps } from "@/lib/types/forms_interfaces";
import { MealFormErrorType } from "@/lib/types/forms_interfaces";
import { mealConstraints } from "@/lib/constraints/forms_constraints";


// _________________________ COMPOSANT _________________________
const UpdateMeal: React.FC<UpdateMealProps> = ({
    initialName,
    initialCategory,
    initialDescription,
    onSubmit,
    onCancel,
    isLoading,
}) => {

    // _________________________ ETATS _________________________
    const [name, setName] = useState(initialName);
    const [category, setCategory] = useState(initialCategory);
    const [description, setDescription] = useState(initialDescription || "");
    const [categories, setCategories] = useState<CategoryMealType[]>([]);
    const [error, setError] = useState<MealFormErrorType>({});

    
    // _________________________ LOGIQUE _________________________
    // Appel API pour récupérer les catégories de repas
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("/api/categories-meal");
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des categories-meal");
                }
                const data: CategoryMealType[] = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("[FETCH_CATEGORIES_ERROR]", error);
            }
        };
        fetchCategories();
    }, []);


    // Gestion de la soumission du formulaire d'édition de repas
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError({});

        const formData = {
            name,
            categoryMealId: category,
            description: description || null,
        };

        const validationResult = mealConstraints.safeParse(formData);
        if (!validationResult.success) {
            const formattedErrors = validationResult.error.flatten().fieldErrors;
            setError({
                name: formattedErrors.name?.[0],
                description: formattedErrors.description?.[0], 
                categoryMealId: formattedErrors.categoryMealId?.[0],
            });
            return;
        }
        await onSubmit(name, category, description || "");
    };


    // _________________________ RENDU _________________________
    return (
        <form onSubmit={handleSubmit} className="space-y-2">
            {/* Champ pour le nom */}
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nouveau nom"
                className="border p-2 rounded w-full text-black"
                disabled={isLoading}
            />
            {error.name && <p className="text-red-500 text-sm">{error.name}</p>}

            {/* Sélection pour la catégorie */}
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)} 
                className="border p-2 rounded w-full text-black "
                disabled={isLoading}
                required
            >
                <option value="">-- Choisir une catégorie --</option>

                {/* Liste des catégories */}
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
            {error.categoryMealId && (
                <p className="text-red-500 text-sm">{error.categoryMealId}</p>
            )}


            {/* Text area pour la description */}
            <textarea
                placeholder="Description du repas"
                value={description || ""}
                onChange={(e) => setDescription(e.target.value)} 
                className="border border-gray-300 p-2 rounded text-black"
            />
            {error.description && <p className="text-red-500 text-sm">{error.description}</p>}
                
            
            <div className="flex gap-2">
                <Button
                    type="button"
                    onClick={onCancel}
                    variant="cancel"
                    disabled={isLoading}
                >
                    Annuler
                </Button>
                <Button
                    type="submit"
                    variant="success"
                    disabled={isLoading}
                >
                    {isLoading ? "En cours..." : "Valider"}
                </Button>
            </div>
        </form>
    );
};

export default UpdateMeal;