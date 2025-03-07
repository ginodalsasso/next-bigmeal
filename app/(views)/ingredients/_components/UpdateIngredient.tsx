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

// Hooks personnalisés
import { useCsrfToken } from "@/app/hooks/useCsrfToken";

// Utils
import { translatedSeason, ucFirst } from "@/lib/utils";

// Composants UI
import { Button } from "@/components/ui/button";
import FormErrorMessage from "@/components/forms/FormErrorMessage";

// Services
import { getCategoriesIngredient } from "@/lib/services/data_fetcher";
import { updateIngredientAPI } from "@/lib/services/ingredients_service";

// _________________________ COMPONENT _________________________
const UpdateIngredient: React.FC<UpdateIngredientProps> = ({
    ingredient,
    onSubmit,
    onCancel,
}) => {
    // _________________________ ETATS _________________________
    const csrfToken = useCsrfToken();
    const [form, setForm] = useState<IngredientFormType>({
        id: ingredient.id,
        name: ingredient.name,
        season: ingredient.season || null,
        categoryIngredientId: ingredient.categoryIngredient.id,
    });

    const [categories, setCategories] = useState<CategoryIngredientType[]>([]);
    const [isLoading, setIsLoading] = useState(false);

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
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null); // Réinitialiser les erreurs

        // Valider les données du formulaire
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
            const updatedIngredient = await updateIngredientAPI(form, csrfToken);

            onSubmit(updatedIngredient);
            toast("Ingrédient modifié avec succès");
            onCancel();
        } catch (error) {
            console.error("[UPDATE_INGREDIENT_ERROR]", error);
            setError({ general: "Erreur lors de la mise à jour de l'ingrédient." });
        } finally {
            setIsLoading(false);
        }
    };

    // _________________________ RENDU _________________________
    return (
        <form onSubmit={handleSubmit} className="space-y-2 md:w-[50vw]">
            <FormErrorMessage message={error?.general} />

            {/* Champ pour le nom */}
            <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Nouveau nom"
                className="input-text-select"
                disabled={isLoading}
            />
            <FormErrorMessage message={error?.name} />

            {/* Sélection pour la catégorie */}
            <select
                value={form.categoryIngredientId}
                onChange={(e) => setForm({ ...form, categoryIngredientId: e.target.value })}
                className="input-text-select"
                disabled={isLoading}
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
                disabled={isLoading}
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
            <div className="flex flex-col gap-2">
                <Button
                    type="button"
                    onClick={onCancel}
                    variant="secondary"
                    disabled={isLoading}
                >
                    Annuler
                </Button>
                <Button 
                    type="submit" 
                    variant="success" 
                    disabled={isLoading}>
                    {isLoading ? "En cours..." : "Valider"}
                </Button>
            </div>
        </form>
    );
};

export default UpdateIngredient;
