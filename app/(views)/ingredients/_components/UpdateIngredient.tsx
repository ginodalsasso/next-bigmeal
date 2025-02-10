import { useEffect, useState } from "react";

import { Season } from "@/lib/types/enums";
import { CategoryIngredientType } from "@/lib/types/schemas_interfaces";
import { UpdateIngredientProps } from "@/lib/types/props_interfaces";
import { IngredientFormType } from "@/lib/types/forms_interfaces";
import { ingredientConstraints } from "@/lib/constraints/forms_constraints";

import { Button } from "@/components/ui/button";
import { useFormValidation } from "@/app/hooks/useFormValidation";
import { translatedSeason, ucFirst } from "@/lib/utils";
import FormErrorMessage from "@/components/forms/FormErrorMessage";

// _________________________ COMPOSANT _________________________
const UpdateIngredient: React.FC<UpdateIngredientProps> = ({
    initialName,
    initialCategory,
    initialSeason,
    onSubmit,
    onCancel,
    isLoading : parentLoading, // Renommer la prop isLoading en parentLoading
}) => {
    // _________________________ ETATS _________________________
    const [form, setForm] = useState<IngredientFormType>({
        name: initialName,
        season: initialSeason || null,
        categoryIngredientId: initialCategory,
    });

    const [categories, setCategories] = useState<CategoryIngredientType[]>([]);

    // Hook de validation
    const { error, isLoading, setIsLoading, validate } = useFormValidation<IngredientFormType>(
        ingredientConstraints,
        [
            "name", 
            "season", 
            "categoryIngredientId"
        ] // Champs à valider
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
        setIsLoading(true);

        if (!validate(form)) {
            setIsLoading(false);
            return;
        }

        try {
            const { name, season, categoryIngredientId } = form;
            await onSubmit(name, categoryIngredientId, season);
        } catch (error) {
            console.error("[UPDATE_INGREDIENT_ERROR]", error);
        } finally {
            setIsLoading(false);
        }
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
                className="input-text-select"
                disabled={isLoading || parentLoading}
            />
            <FormErrorMessage message={error?.name} />

            {/* Sélection pour la catégorie */}
            <select
                value={form.categoryIngredientId}
                onChange={(e) => setForm({ ...form, categoryIngredientId: e.target.value })}
                className="input-text-select"
                disabled={isLoading || parentLoading}
                required
            >
                <option value="">-- Choisir une catégorie --</option>

                {/* Liste des catégories */}
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {ucFirst(category.name)}
                    </option>
                ))}
            </select>
            <FormErrorMessage message={error?.categoryIngredientId} />

            {/* Sélection pour la saison */}
            <select
                value={form.season || ""}
                onChange={(e) =>
                    setForm({
                        ...form,
                        season: e.target.value ? (e.target.value as Season) : null,
                    })
                }
                className="input-text-select"
                disabled={isLoading || parentLoading}
            >
                <option value="">Non spécifié</option>
                {Object.values(Season).map((season) => (
                    <option key={season} value={season}>
                        {translatedSeason(season)}
                    </option>
                ))}
            </select>
            <FormErrorMessage message={error?.season} />

            {/* Boutons de soumission et d'annulation */}
            <div className="flex gap-2">
                <Button
                    type="button"
                    onClick={onCancel}
                    className="w-full"
                    variant="secondary"
                    disabled={isLoading || parentLoading}
                >
                    Annuler
                </Button>
                <Button 
                    type="submit" 
                    variant="success" 
                    className="w-full"
                    disabled={isLoading || parentLoading}>
                    {isLoading || parentLoading ? "En cours..." : "Valider"}
                </Button>
            </div>
        </form>
    );
};

export default UpdateIngredient;
