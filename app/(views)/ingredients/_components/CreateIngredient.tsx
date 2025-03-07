"use client";

// Bibliothèques tierces
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

// Types et énumérations
import { Season } from "@/lib/types/enums";
import { CategoryIngredientType } from "@/lib/types/schemas_interfaces";
import { IngredientFormType } from "@/lib/types/forms_interfaces";
import { CreateIngredientProps } from "@/lib/types/props_interfaces";

// Contraintes et validation
import { ingredientConstraints } from "@/lib/constraints/forms_constraints";
import { useFormValidation } from "@/app/hooks/useFormValidation";

// Hooks personnalisés
import { useCsrfToken } from "@/app/hooks/useCsrfToken";

// Utils
import { translatedSeason, ucFirst } from "@/lib/utils";

// Composants UI
import { Button } from "@/components/ui/button";
import FormErrorMessage from "@/components/forms/FormErrorMessage";

// Services
import { getCategoriesIngredient } from "@/lib/services/data_fetcher";
import { createIngredientAPI } from "@/lib/services/ingredients_service";


// _________________________ COMPOSANT _________________________
const CreateIngredient: React.FC<CreateIngredientProps> = ({
    onSubmit,
    onClose,
}) => {
    // _________________________ HOOKS _________________________
    const csrfToken = useCsrfToken();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [categories, setCategories] = useState<CategoryIngredientType[]>([]);
    const [form, setForm] = useState<IngredientFormType>({
        id: "",
        name: "",
        season: null,
        categoryIngredientId: "",
    });

    // Hook de validation
    const { error, setError, validate } = useFormValidation<IngredientFormType>(
        ingredientConstraints,
        [
            "name", 
            "season", 
            "categoryIngredientId"
        ]
    );

    // _________________________ LOGIQUE _________________________
    // Appel API pour récupérer les catégories d'ingrédients
        useEffect(() => {
            const fetchCategories = async () => {
                try {
                    const data: CategoryIngredientType[] = await getCategoriesIngredient();
                    setCategories(data); 
    
                } catch (error) {
                    console.error("[FETCH_CATEGORIES_ERROR]", error);
                    setError({ general: "Erreur lors de la récupération des catégories." });
                }
            };
    
            fetchCategories();
        }, [setError]);



    // Gestion de la soumission du formulaire
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null); // Réinitialise les erreurs existantes

        // Valider les données du formulaire
        if (!validate(form)) {
            setIsLoading(false);
            return;
        }

        // Créer l'ingrédient avec les données du formulaire
        if (!csrfToken) {
            console.error("CSRF token invalide");
            return;
        }
        try {
            const createdIngredient = await createIngredientAPI(form, csrfToken);

            onSubmit(createdIngredient);
            toast("Ingrédient créé avec succès");
            onClose(); // Fermer le dialogue
        } catch (error) {
            console.error("[CREATE_INGREDIENT_ERROR]", error);
            setError({ general: "Erreur lors de la création de l'ingrédient." });
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
                className="input-text-select"
                required
            />
            <FormErrorMessage message={error?.name} />

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
            >
                <option value="">-- Choisir une saison --</option>
                {Object.values(Season).map((season) => (
                    <option key={season} value={season}>
                        {translatedSeason(season)}
                    </option>
                ))}
            </select>
            <FormErrorMessage message={error?.season} />

            {/* Sélection pour la catégorie */}
            <select
                value={form.categoryIngredientId}
                onChange={(e) => setForm({ ...form, categoryIngredientId: e.target.value })}
                className="input-text-select"
                required
            >
                <option value="">-- Choisir une catégorie --</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}> 
                        {ucFirst(category.name)}
                    </option>
                ))}
            </select>
            <FormErrorMessage message={error?.categoryIngredientId} />

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

export default CreateIngredient;
