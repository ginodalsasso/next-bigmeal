import { useEffect, useState } from "react";

import { CategoryMealType } from "@/lib/types/schemas_interfaces";
import {Button} from "@/components/ui/button";
import { UpdateMealProps } from "@/lib/types/forms_interfaces";

// _________________________ COMPOSANT _________________________
const UpdateMeal: React.FC<UpdateMealProps> = ({
    initialName,
    initialCategory,
    initialDescription,
    onSubmit,
    onCancel,
    isLoading,
    error,
}) => {

    // _________________________ ETATS _________________________
    const [name, setName] = useState(initialName);
    const [category, setCategory] = useState(initialCategory);
    const [description, setDescription] = useState(initialDescription || "");
    const [categories, setCategories] = useState<CategoryMealType[]>([]);

    
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
            {error && <p className="text-red-500 text-sm">{error}</p>}

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

            {/* Text area pour la description */}
            <textarea
                placeholder="Description du repas"
                value={description || ""}
                onChange={(e) => setDescription(e.target.value)} 
                className="border border-gray-300 p-2 rounded text-black"
            />
                
            
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