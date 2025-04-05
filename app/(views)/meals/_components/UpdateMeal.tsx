// Bibliothèques tierces
import { useEffect, useState } from "react";
import { toast } from "sonner";

// Hooks personnalisés
import { useFormValidation } from "@/app/hooks/useFormValidation";

// Types
import { CategoryMealType } from "@/lib/types/schemas_interfaces";
import { UpdateMealProps } from "@/lib/types/props_interfaces";

// Contraintes et validation
import { mealConstraints } from "@/lib/constraints/forms_constraints";

// Utils
import { ucFirst } from "@/lib/utils";

// Composants UI
import { Button } from "@/components/ui/button";
import FormErrorMessage from "@/components/forms/FormErrorMessage";

// Services
import { getCategoriesMeal } from "@/lib/services/data_fetcher";
import { updateMealAPI } from "@/lib/services/meal_service";
import { getCsrfToken } from "next-auth/react";
import FormSubmitButton from "@/components/forms/FormSubmitButton";


// _________________________ COMPOSANT _________________________
const UpdateMeal: React.FC<UpdateMealProps> = ({
    meal, 
    onSubmit,
    onClose
}) => {
    // _________________________ ÉTATS _________________________
    const [categories, setCategories] = useState<CategoryMealType[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>(meal.categoryMealId);

    // Hook de validation
    const { error, setError, validate } = useFormValidation(
        mealConstraints,
        ["name", "categoryMealId", "description"]
    );

    // _________________________ LOGIQUE _________________________
    // Appel API pour récupérer les catégories de repas
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data: CategoryMealType[] = await getCategoriesMeal();
                setCategories(data); 

            } catch (error) {
                console.error("[FETCH_CATEGORIES_ERROR]", error);
                setError({ general: "Erreur lors de la récupération des catégories." });
            }
        };

        fetchCategories();
    }, [setError]);
        

    // Soumission du formulaire
    const handleSubmit = async (formData: FormData) => {
        // Récupérer les données du formulaire
        const form = {
            id: meal.id,
            name: formData.get("mealName") as string,
            description: formData.get("mealDescription") as string === "" ? undefined : formData.get("mealDescription") as string,
            categoryMealId: formData.get("categoryMealId") as string,
        };

        // Valider les données du formulaire
        if (!validate(form)) {
            return;
        }
        const csrfToken = await getCsrfToken();
        if (!csrfToken) {
            console.error("CSRF token invalide");
            return;
        }

        try {
            const updatedMeal = await updateMealAPI(form, csrfToken);
            
            onSubmit(updatedMeal);
            toast("Repas mis à jour avec succès");
            onClose();
        } catch (error) {
            console.error("[UPDATE_MEAL_ERROR]", error);
            setError({ general: "Erreur lors de la mise à jour." });
        }
    };


    // _________________________ RENDU _________________________
    return (
        <form action={handleSubmit} className="space-y-2">
            <label htmlFor="mealName">
                Nom du repas
            </label>
            <input
                className="input-text-select"
                type="text"
                id="mealName"
                name="mealName"
                placeholder="Carbonara"
                defaultValue={meal.name}
                autoComplete="off"
                required
            />
            <FormErrorMessage message={error?.name} />

            {/* Sélection pour la catégorie */}
            <label htmlFor="categoryMealId">
                Catégorie du repas
            </label>
            <div className="flex gap-4">
                {categories.map((category) => (
                    <label
                        key={category.id}
                        className={`cursor-pointer border px-4 py-2 transition-all ${
                            selectedCategory === category.id
                                ? "bg-white text-black"
                                : "bg-black text-white"
                        }`}
                        onClick={() => setSelectedCategory(category.id)}
                        htmlFor={`category-${category.id}`}
                    >
                        <input
                            id={`category-${category.id}`}
                            type="radio"
                            name="categoryMealId"
                            value={category.id}
                            className="hidden"
                            checked={selectedCategory === category.id}
                            onChange={() => setSelectedCategory(category.id)}
                            required
                        />
                        {ucFirst(category.name)}
                    </label>
                ))}
            </div>
            <FormErrorMessage message={error?.categoryMealId} />

            {/* Text area pour la description */}
            <label htmlFor="mealDescription">
                Description du repas (optionnelle)
            </label>
            <textarea
                className="input-text-select"
                id="mealDescription"
                name="mealDescription"
                placeholder="Quelque chose à ajouter ?"
                defaultValue={meal.description? meal.description : ""}
            />
            <FormErrorMessage message={error?.description} />

            <div className="flex gap-2">
                <Button
                    type="button"
                    onClick={onClose}
                    variant="cancel"
                >
                    Annuler
                </Button>
                <FormSubmitButton />
            </div>
        </form>
    );
};

export default UpdateMeal;
