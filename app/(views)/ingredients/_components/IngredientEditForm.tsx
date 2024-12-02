import { CategoryIngredientType } from "@/lib/types/schemas_interfaces";
import { useEffect, useState } from "react";

// _________________________ TYPES _________________________
interface IngredientEditFormProps {
    initialName: string;
    initialCategory: string;
    onSubmit: (newName: string, newCategory: string) => Promise<void>;
    onCancel: () => void;
    isLoading: boolean;
    error: string | null;
}

// _________________________ COMPOSANT _________________________
const IngredientEditForm: React.FC<IngredientEditFormProps> = ({
    initialName,
    initialCategory,
    onSubmit,
    onCancel,
    isLoading,
    error,
}) => {

    // _________________________ ETATS _________________________
    const [name, setName] = useState(initialName);
    const [categories, setCategories] = useState<CategoryIngredientType[]>([]);
    const [category, setCategory] = useState(initialCategory);

    
    // _________________________ LOGIQUE _________________________
    // Appel API pour récupérer les catégories d'ingrédients
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("/api/categories-ingredient");
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des categories-ingredient");
                }
                const data: CategoryIngredientType[] = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("[FETCH_CATEGORIES_ERROR]", error);
            }
        };
        fetchCategories();
    }, []);


    // Gestion de la soumission du formulaire d'édition de catégorie
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(name, category);
    };


    // _________________________ RENDU _________________________
    return (
        <form onSubmit={handleSubmit} className="space-y-2">
            {/* Champ pour le nom */}
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nouveau nom"
                className="border p-2 rounded-lg w-full text-black"
                disabled={isLoading}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Sélection pour la catégorie */}
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)} 
                className="border border-gray-300 p-2 rounded text-black mx-auto w-[90%]"
                disabled={isLoading}
            >
                <option value="">{category}</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
                
            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                    disabled={isLoading}
                >
                    Annuler
                </button>
                <button
                    type="submit"
                    className="bg-emerald-500 text-white px-4 py-2 rounded-lg"
                    disabled={isLoading}
                >
                    {isLoading ? "En cours..." : "Valider"}
                </button>
            </div>
        </form>
    );
};

export default IngredientEditForm;