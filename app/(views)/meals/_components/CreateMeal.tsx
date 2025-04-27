"use client";

// Bibliothèques tierces
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Hooks personnalisés
import { useFormValidation } from "@/app/hooks/useFormValidation";

// Types
import { CategoryMealType } from "@/lib/types/schemas_interfaces";
import { MealFormType } from "@/lib/types/forms_interfaces";
import { CreateMealProps } from "@/lib/types/props_interfaces";

// Contraintes et validation
import { mealConstraints } from "@/lib/constraints/forms_constraints";

// Utils
import { ucFirst } from "@/lib/utils";

// Composants UI
import { Button } from "@/components/ui/button";
import FormErrorMessage from "@/components/forms/FormErrorMessage";

// Services
import { getCategoriesMeal } from "@/lib/services/data_fetcher";
import { createMealAPI } from "@/lib/services/meal_service";
import { getCsrfToken } from "next-auth/react";
import FormSubmitButton from "@/components/forms/FormSubmitButton";


// _________________________ COMPONENT _________________________
const CreateMeal: React.FC<CreateMealProps> = ({ onSubmit }) => {
    
    // _________________________ HOOKS _________________________
    const router = useRouter();

    const [categories, setCategories] = useState<CategoryMealType[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    // Hook de validation
    const { error, setError, validate } = useFormValidation<MealFormType>(
        mealConstraints,
        ["name", "description", "categoryMealId"]
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
    

    // Gestion de la soumission du formulaire de création de repas
    const handleSubmit = async (formData: FormData) => {
        // Récupérer les données du formulaire
        const form = {
            name: formData.get("mealName") as string,
            description: formData.get("mealDescription") as string === "" ? undefined : formData.get("mealDescription") as string,
            categoryMealId: formData.get("categoryMealId") as string,
        };
    
        // Valider les données du formulaire avec le hook
        if (!validate(form)) {
            console.error("[VALIDATION_ERROR]", error);
            return;
        }
    
        
        try { 
            // Récupérer le CSRF Token
            const csrfToken = await getCsrfToken();
            if (!csrfToken) {
                console.error("CSRF token invalide");
                return;
            }
            const createdMeal = await createMealAPI(form, csrfToken);
            // Mettre à jour l’état parent avec le nouveau repas
            onSubmit(createdMeal);

            toast("Repas créé avec succès");
        } catch (error) {
            console.error("[CREATE_MEAL_ERROR]", error);
            setError({ general: "Erreur lors de la création du repas." });
        }
    };
    

    // _________________________ RENDU _________________________
    return (
        <form className="drawer-form" action={handleSubmit}>
            <FormErrorMessage message={error?.general} />

            <div className="drawer-label-input">
                {/* Champ pour le nom du repas */}
                <label htmlFor="mealName">
                    Nom du repas
                </label>
                <input
                    className="input-text-select"
                    type="text"
                    id="mealName"
                    name="mealName"
                    placeholder="Carbonara"
                    autoComplete="off"
                    required
                />
                <FormErrorMessage message={error?.name} />
            </div>

            <div className="drawer-label-input">
                {/* Text area pour la description */}
                <label htmlFor="mealDescription">
                    Description du repas (optionnelle)
                </label>
                <textarea
                    className="input-text-select"
                    id="mealDescription"
                    name="mealDescription"
                    placeholder="Quelque chose à ajouter ?"
                    defaultValue=""
                />
                <FormErrorMessage message={error?.description} />
            </div>

            {/* Sélection pour la catégorie */}
            <div className="drawer-label-input">
                <label htmlFor="categoryMealId">
                    Catégorie du repas
                </label>
                <div className="flex gap-2">
                    {categories.map((category) => (
                        <label
                            key={category.id}
                            className={`label-filter ${
                                selectedCategory === category.id
                                    ? "sticker-bg-white"
                                    : "sticker-bg-black"
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
            </div>

            {/* Bouton de soumission */}
            <div className="drawer-buttons-form">
                <Button 
                    variant="cancel" 
                    onClick={() => router.push("/meals")}
                >
                    Revenir en arrière
                </Button>
                <FormSubmitButton />
            </div>
        </form>
    );
};

export default CreateMeal;
