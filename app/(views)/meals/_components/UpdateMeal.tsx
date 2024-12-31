import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CategoryMealType } from "@/lib/types/schemas_interfaces";
import { UpdateMealProps } from "@/lib/types/props_interfaces";
import { useFormValidation } from "@/app/hooks/useFormValidation";
import { mealConstraints } from "@/lib/constraints/forms_constraints";

// _________________________ COMPOSANT _________________________

const UpdateMeal: React.FC<UpdateMealProps> = ({
    initialName,
    initialCategory,
    initialDescription,
    onSubmit,
    onCancel,
    isLoading: externalLoading,
}) => {

    // _________________________ ETATS _________________________
    const [name, setName] = useState(initialName);
    const [category, setCategory] = useState(initialCategory);
    const [description, setDescription] = useState(initialDescription || "");
    const [categories, setCategories] = useState<CategoryMealType[]>([]);

    const { error, validate, setIsLoading, isLoading } = useFormValidation(
        mealConstraints,
        ["name", "categoryMealId", "description"]
    );

    // _________________________ LOGIQUE _________________________
    // Appel API pour récupérer les catégories de repas
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("/api/categories-meal");
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des catégories.");
                }
                const data: CategoryMealType[] = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("[FETCH_CATEGORIES_ERROR]", error);
            }
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = {
            name,
            categoryMealId: category,
            description: description || null,
        };

        if (validate(formData)) {
            await onSubmit(name, category, description || "");
        }

        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-2">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nouveau nom"
                className="border p-2 rounded w-full text-black"
                disabled={isLoading || externalLoading}
            />
            {error?.name && <p className="text-red-500 text-sm">{error.name}</p>}

            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border p-2 rounded w-full text-black"
                disabled={isLoading || externalLoading}
                required
            >
                <option value="">-- Choisir une catégorie --</option>
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.name}
                    </option>
                ))}
            </select>
            {error?.categoryMealId && <p className="text-red-500 text-sm">{error.categoryMealId}</p>}

            <textarea
                placeholder="Description du repas"
                value={description || ""}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-300 p-2 rounded text-black"
                disabled={isLoading || externalLoading}
            />
            {error?.description && <p className="text-red-500 text-sm">{error.description}</p>}

            <div className="flex gap-2">
                <Button
                    type="button"
                    onClick={onCancel}
                    variant="cancel"
                    disabled={isLoading || externalLoading}
                >
                    Annuler
                </Button>
                <Button
                    type="submit"
                    variant="success"
                    disabled={isLoading || externalLoading}
                >
                    {isLoading || externalLoading ? "En cours..." : "Valider"}
                </Button>
            </div>
        </form>
    );
};

export default UpdateMeal;
