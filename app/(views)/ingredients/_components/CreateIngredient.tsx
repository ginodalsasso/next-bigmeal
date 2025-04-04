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

// Utils
import { translatedSeason, ucFirst } from "@/lib/utils";

// Composants UI
import { Button } from "@/components/ui/button";
import FormErrorMessage from "@/components/forms/FormErrorMessage";

// Services
import { getCategoriesIngredient } from "@/lib/services/data_fetcher";
import { createIngredientAPI } from "@/lib/services/ingredients_service";
import { getCsrfToken } from "next-auth/react";
import FormSubmitButton from "@/components/forms/FormSubmitButton";


// _________________________ COMPOSANT _________________________
const CreateIngredient: React.FC<CreateIngredientProps> = ({
    onSubmit,
    onClose,
}) => {
    // _________________________ HOOKS _________________________
    const [categories, setCategories] = useState<CategoryIngredientType[]>([]);

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
    const handleSubmit = async (formData: FormData) => {
        // Récupérer les données du formulaire
        const form: IngredientFormType = {
            name: formData.get("name") as string,
            season: formData.get("season") as string === "" ? undefined : (formData.get("season") as Season),
            categoryIngredientId: formData.get("categoryIngredientId") as string,
        };

        // Valider les données du formulaire
        if (!validate(form)) {
            console.error("Validation échouée", error, form);
            return;
        }

        try {
            const csrfToken = await getCsrfToken();
            if (!csrfToken) {
                console.error("CSRF token invalide");
                setError({ general: "Problème de sécurité, veuillez réessayer." });
                return;
            }
            const createdIngredient = await createIngredientAPI(
                form, 
                csrfToken
            );

            onSubmit(createdIngredient);
            toast("Ingrédient créé avec succès");
            onClose(); // Fermer le dialogue
        } catch (error) {
            console.error("[CREATE_INGREDIENT_ERROR]", error);
            setError({ general: "Erreur lors de la création de l'ingrédient." });
        }
    };

    // _________________________ RENDU _________________________
    return (
        <form className="flex flex-col gap-5 p-5" action={handleSubmit}>
            {/* Champ pour le nom de l'ingrédient */}
            <input
                className="input-text-select"
                type="text"
                id="name"
                name="name"
                placeholder="Nom de l'ingrédient"
                autoComplete="off"
                required
            />
            <FormErrorMessage message={error?.name} />

            {/* Sélection pour la saison */}
            <select
                className="input-text-select"
                name="season"
                id="season"
                defaultValue=""
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
                className="input-text-select"
                name="categoryIngredientId"
                id="categoryIngredientId"
                defaultValue=""
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
                <FormSubmitButton />
            </div>
        </form>
    );
};

export default CreateIngredient;
