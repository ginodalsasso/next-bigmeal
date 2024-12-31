import { useEffect, useState } from "react";

import { Season } from "@/lib/types/enums";
import { CategoryIngredientType } from "@/lib/types/schemas_interfaces";
import { UpdateIngredientProps } from "@/lib/types/props_interfaces";
import { IngredientFormType } from "@/lib/types/forms_interfaces";
import { ingredientConstraints } from "@/lib/constraints/forms_constraints";

import {Button} from "@/components/ui/button";
import { useFormValidation } from "@/app/hooks/useFormValidation";

// _________________________ COMPOSANT _________________________
const UpdateIngredient: React.FC<UpdateIngredientProps> = 
    ({
        initialName,
        initialCategory,
        initialSeason,
        onSubmit,
        onCancel,
        isLoading,
    }) => {

    // _________________________ ETATS _________________________
    const [form, setForm] = useState<IngredientFormType>({
        name: initialName,
        season: initialSeason || null || undefined,
        categoryIngredientId: initialCategory,
    });

    const [categories, setCategories] = useState<CategoryIngredientType[]>([]);

    // Hook de validation
    const { error, validate } = useFormValidation<IngredientFormType>(
        ingredientConstraints,
        ["name", "season", "categoryIngredientId"]
    );  

    
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


    // Gestion de la soumission du formulaire d'édition de catégorie
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!validate(form)) {
            return;
        }
        const { name, season, categoryIngredientId } = form;

        await onSubmit(name, categoryIngredientId, season);
    };


    // _________________________ RENDU _________________________
    return (
        <form onSubmit={handleSubmit} className="space-y-2">
            {/* Champ pour le nom */}
            <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Nouveau nom"
                className="border p-2 rounded w-full text-black"
                disabled={isLoading}
            />
            {error?.name && <p className="text-red-500 text-sm">{error.name}</p>}

            {/* Sélection pour la catégorie */}
            <select
                value={form.categoryIngredientId}
                onChange={(e) => setForm({ ...form, categoryIngredientId: e.target.value })}
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
            {error?.categoryIngredientId && (
                <p className="text-red-500 text-sm">{error.categoryIngredientId}</p>
            )}

            {/* Sélection pour la saison */}
            <select
                value={form.season || ""}
                onChange={(e) =>
                    setForm({
                        ...form,
                        season: e.target.value ? (e.target.value as Season) : null,
                    })
                }                className="border p-2 rounded w-full text-black"
                disabled={isLoading}
            >
                <option value="">Non spécifié</option>
                {Object.values(Season).map((season) => (
                    <option key={season} value={season}>
                        {season}
                    </option>
                ))}
            </select>
            {error?.season && 
                <p className="text-red-500 text-sm">{error.season}</p>
            }
                
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

export default UpdateIngredient;