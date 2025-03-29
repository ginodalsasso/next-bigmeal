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


// _________________________ COMPOSANT _________________________
const UpdateMeal: React.FC<UpdateMealProps> = ({
    meal, 
    onSubmit,
    onClose
}) => {
    // _________________________ ÉTATS _________________________
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [form, setForm] = useState({
        name: meal.name,
        categoryMealId: meal.categoryMeal?.id || "",
        description: meal.description || "",
    });

    const [categories, setCategories] = useState<CategoryMealType[]>([]);

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
        

    // Gestion des changements de champs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // Soumission du formulaire
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Valider les données du formulaire
        if (!validate(form)) {
            setIsLoading(false);
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
        } finally {
            setIsLoading(false);
        }
    };


    // _________________________ RENDU _________________________
    return (
        <form onSubmit={handleSubmit} className="space-y-2">
            <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nouveau nom"
                className="input-text-select"
                disabled={isLoading}
            />
            <FormErrorMessage message={error?.name} />

            <select
                name="categoryMealId"
                value={form.categoryMealId}
                onChange={handleChange}
                className="input-text-select"
                disabled={isLoading}
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

            <textarea
                name="description"
                placeholder="Description du repas"
                value={form.description}
                onChange={handleChange}
                className="input-text-select"
                disabled={isLoading}
            />
            <FormErrorMessage message={error?.description} />

            <div className="flex gap-2">
                <Button
                    type="button"
                    onClick={onClose}
                    variant="cancel"
                    className="w-full"
                    disabled={isLoading}
                >
                    Annuler
                </Button>
                <Button
                    type="submit"
                    variant="success"
                    className="w-full"
                    disabled={isLoading}
                >
                    {isLoading ? "En cours..." : "Valider"}
                </Button>
            </div>
        </form>
    );
};

export default UpdateMeal;
