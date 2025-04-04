// Bibliothèques tierces
import { useEffect, useState } from "react";
import { toast } from "sonner";

// Types et énumérations
import { Season } from "@/lib/types/enums";
import { CategoryIngredientType } from "@/lib/types/schemas_interfaces";
import { UpdateIngredientProps } from "@/lib/types/props_interfaces";
import { IngredientFormType } from "@/lib/types/forms_interfaces";

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
import { updateIngredientAPI } from "@/lib/services/ingredients_service";
import { getCsrfToken } from "next-auth/react";
import FormSubmitButton from "@/components/forms/FormSubmitButton";

// _________________________ COMPONENT _________________________
const UpdateIngredient: React.FC<UpdateIngredientProps> = ({
    ingredient,
    onSubmit,
    onCancel,
}) => {
    // _________________________ ETATS _________________________
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
    // Récupérer les catégories d'ingrédients
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

    // Gère la soumission et l'update de l'ingrédient
    const handleSubmit = async (formData: FormData) => {
        // Récupérer les données du formulaire
        const form: IngredientFormType = {
            id: ingredient.id,
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
                return;
            }
            const updatedIngredient = await updateIngredientAPI(form, csrfToken);

            onSubmit(updatedIngredient);
            toast("Ingrédient modifié avec succès");
            onCancel();
        } catch (error) {
            console.error("[UPDATE_INGREDIENT_ERROR]", error);
            setError({ general: "Erreur lors de la mise à jour de l'ingrédient." });
        }
    };

    // _________________________ RENDU _________________________
    return (
        <form action={handleSubmit} className="space-y-2 md:w-[50vw]">
            <FormErrorMessage message={error?.general} />

            {/* Champ pour le nom */}
            <input
                className="input-text-select"
                type="text"
                id="name"
                name="name"
                defaultValue={ingredient.name}
                placeholder="Nom de l'ingrédient"
                autoComplete="off"
                required
            />
            <FormErrorMessage message={error?.name} />

            {/* Sélection pour la catégorie */}
            <select
                className="input-text-select"
                name="categoryIngredientId"
                id="categoryIngredientId"
                defaultValue={ingredient.categoryIngredientId}
                required
            >
                <option value="">-- Choisir une catégorie --</option>
                {categories.map((category) => (
                    <option 
                        key={category.id} 
                        value={category.id}
                        >
                        {ucFirst(category.name)}
                    </option>
                ))}
            </select>
            <FormErrorMessage message={error?.categoryIngredientId} />

            {/* Sélection pour la saison */}
            <select
                className="input-text-select"
                name="season"
                id="season"
                defaultValue={ingredient.season ?? ""}
            >
                <option value="">-- Choisir une saison --</option>
                {Object.values(Season).map((season) => (
                    <option key={season} value={season}>
                        {translatedSeason(season)}
                    </option>
                ))}
            </select>
            <FormErrorMessage message={error?.season} />

            {/* Boutons de soumission et d'annulation */}
            <div className="flex flex-col gap-2">
                <Button
                    type="button"
                    onClick={onCancel}
                    variant="secondary"
                >
                    Annuler
                </Button>
                <FormSubmitButton />
            </div>
        </form>
    );
};

export default UpdateIngredient;
