"use client";

// Bibliothèques tierces
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Hooks personnalisés
import { useFormValidation } from "@/app/hooks/useFormValidation";
import { useCsrfToken } from "@/app/hooks/useCsrfToken";

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


// _________________________ COMPONENT _________________________
const CreateMeal: React.FC<CreateMealProps> = ({ onMealCreated }) => {
    
    // _________________________ HOOKS _________________________
    const csrfToken = useCsrfToken();
    const router = useRouter();

    const [categories, setCategories] = useState<CategoryMealType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [form, setForm] = useState<MealFormType>({
        name: "",
        description: null,
        categoryMealId: "",
    });

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
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null); // Réinitialiser les erreurs
    
        // Valider les données du formulaire avec le hook
        if (!validate(form)) {
            setIsLoading(false);
            return;
        }
    
        // Récupérer le CSRF Token
        if (!csrfToken) {
            console.error("CSRF token invalide");
            return;
        }
        
        try { 
            const createdMeal = await createMealAPI(form, csrfToken);
            // Mettre à jour l’état parent avec le nouveau repas
            onMealCreated(createdMeal);
            toast("Repas créé avec succès");
    
        } catch (error) {
            console.error("[CREATE_MEAL_ERROR]", error);
            setError({ general: "Erreur lors de la création du repas." });
        } finally {
            setIsLoading(false);
        }
    };
    

    // _________________________ RENDU _________________________
    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <FormErrorMessage message={error?.general} />

            <div>
                {/* Champ pour le nom du repas */}
                <label htmlFor="meal-name">
                    Nom du repas
                </label>
                <input
                    id="meal-name"
                    type="text"
                    placeholder="Carbonara"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input-text-select"
                    required
                />
                <FormErrorMessage message={error?.name} />
            </div>

            <div>
                {/* Text area pour la description */}
                <label htmlFor="meal-description">
                    Description du repas (optionnelle)
                </label>
                <textarea
                    id="meal-description"
                    placeholder="Quelque chose à ajouter ?"
                    value={form.description ?? ""}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="input-text-select"
                />
                <FormErrorMessage message={error?.description} />
            </div>

            {/* Sélection pour la catégorie */}
            <div>
                <label htmlFor="categoryMealId">
                    Catégorie du repas
                </label>
                <div className="flex  gap-4">
                    {categories.map((categorie) => (
                        <button
                            id="categoryMealId"
                            key={categorie.id}
                            type="button"
                            className={`cursor-pointer border px-4 py-2 hover:bg-white hover:text-black ${
                                form.categoryMealId === categorie.id
                                    ? "bg-white text-black"
                                    : ""
                            }`}
                            onClick={() => setForm({ ...form, categoryMealId: categorie.id })}
                        >
                            {ucFirst(categorie.name)}
                        </button>
                    ))}
                </div>
                <FormErrorMessage message={error?.categoryMealId} />
            </div>

            {/* Bouton de soumission */}
            <div className="mt-4 flex flex-col-reverse gap-2">
                <Button 
                    variant="cancel" 
                    onClick={() => router.push("/meals")}
                >
                    Revenir en arrière
                </Button>
                <Button type="submit" variant="success" disabled={
                    !form.name || !form.categoryMealId || isLoading}
                >
                    {isLoading ? "Création du repas en cours..." : "Suivant"}
                </Button>
            </div>
        </form>
    );
};

export default CreateMeal;
