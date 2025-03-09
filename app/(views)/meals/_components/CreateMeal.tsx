"use client";

// Bibliothèques tierces
import { useEffect, useState } from "react";
import { toast } from "sonner";

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
const CreateMeal: React.FC<CreateMealProps> = ({ onMealCreated, onClose }) => {
    
    // _________________________ HOOKS _________________________
    const csrfToken = useCsrfToken();
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
        <form className="flex flex-col gap-5 p-5" onSubmit={handleSubmit}>
            <FormErrorMessage message={error?.general} />

            {/* Champ pour le nom du repas */}
            <input
                type="text"
                placeholder="Nom du repas"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input-text-select"
                required
            />
            <FormErrorMessage message={error?.name} />

            {/* Text area pour la description */}
            <textarea
                placeholder="Description du repas"
                value={form.description ?? ""}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="input-text-select"
            />
            <FormErrorMessage message={error?.description} />

            {/* Sélection pour la catégorie */}
            <select
                value={form.categoryMealId}
                onChange={(e) => setForm({ ...form, categoryMealId: e.target.value })}
                className="input-text-select"
                required
            >
                <option value="">-- Choisir une catégorie --</option>
                {categories.map((categorie) => (
                    <option key={categorie.id} value={categorie.id}>
                        {ucFirst(categorie.name)}
                    </option>
                ))}
            </select>
            <FormErrorMessage message={error?.categoryMealId} />

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

export default CreateMeal;
