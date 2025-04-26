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
    const [selectedSeason, setSelectedSeason] = useState<string>("");

    // Hook de validation
    const { error, setError, validate } = useFormValidation<IngredientFormType>(
        ingredientConstraints,
        ["name", "season", "categoryIngredientId"]
    );

    // _________________________ LOGIQUE _________________________
    // Récupérer les catégories d'ingrédients
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategoriesIngredient();
                setCategories(data);
            } catch (error) {
                console.error("[FETCH_CATEGORIES_ERROR]", error);
                setError({ general: "Erreur lors de la récupération des catégories." });
            }
        };
        fetchCategories();
    }, [setError]);

    // Gestion de la soumission
    const handleSubmit = async (formData: FormData) => {
        const form: IngredientFormType = {
            name: formData.get("ingredientName") as string,
            season: formData.get("ingredientSeason") as string === "" ? undefined : (formData.get("ingredientSeason") as Season),
            categoryIngredientId: formData.get("categoryIngredientId") as string,
        };

        if (!validate(form)) {
            console.error("[VALIDATION_ERROR]", error);
            return;
        }

        try {
            const csrfToken = await getCsrfToken();
            if (!csrfToken) {
                setError({ general: "Problème de sécurité, veuillez réessayer." });
                return;
            }
            const createdIngredient = await createIngredientAPI(form, csrfToken);
            onSubmit(createdIngredient);
            toast("Ingrédient créé avec succès");
            onClose();
        } catch (error) {
            console.error("[CREATE_INGREDIENT_ERROR]", error);
            setError({ general: "Erreur lors de la création de l'ingrédient." });
        }
    };

    // _________________________ RENDU _________________________
    return (
        <form className="flex flex-col gap-4 p-4" action={handleSubmit}>
            <FormErrorMessage message={error?.general} />

            <div className="flex flex-col gap-2">
                {/* Nom de l'ingrédient */}
                <label htmlFor="ingredientName">Nom de l'ingrédient</label>
                <input
                    className="input-text-select"
                    type="text"
                    id="ingredientName"
                    name="ingredientName"
                    placeholder="Tomate, Poulet, etc."
                    autoComplete="off"
                    required
                />
                <FormErrorMessage message={error?.name} />
            </div>

            <div className="flex flex-col gap-2">
                {/* Catégorie de l'ingrédient */}
                <label htmlFor="categoryIngredientId">Catégorie de l'ingrédient</label>
                <div className="flex gap-2 flex-wrap">
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
                </div>
                <FormErrorMessage message={error?.categoryIngredientId} />
            </div>

            <div className="flex flex-col gap-2">
                {/* Saison de l'ingrédient */}
                <label htmlFor="ingredientSeason">Saison (optionnel)</label>
                <div className="flex flex-col gap-2">
                    {Object.values(Season).map((season) => (
                        <label
                            key={season}
                            htmlFor={`season-${season}`}
                            onClick={() => setSelectedSeason(season)}
                            className={`label-filter ${selectedSeason === season ? "sticker-bg-white" : "sticker-bg-black"}`}
                        >
                            <input
                                id={`season-${season}`}
                                type="radio"
                                name="ingredientSeason"
                                className="hidden"
                                value={season}
                                checked={selectedSeason === season}
                                onChange={() => setSelectedSeason(season)}
                            />
                            {translatedSeason(season)}
                        </label>
                    ))}
                </div>
                <FormErrorMessage message={error?.season} />
            </div>

            {/* Boutons d'action */}
            <div className="mt-4 flex flex-col-reverse gap-2">
                <Button variant="cancel" onClick={onClose}>
                    Annuler
                </Button>
                <FormSubmitButton />
            </div>
        </form>
    );
};

export default CreateIngredient;
