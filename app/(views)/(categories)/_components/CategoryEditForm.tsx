import { useState } from "react";
import { CategoryEditFormProps } from "@/lib/types/forms_interfaces";

// _________________________ COMPOSANT _________________________
const CategoryEditForm: React.FC<CategoryEditFormProps> = ({
    initialName,
    onSubmit,
    onCancel,
    isLoading,
    error,
}) => {

    // _________________________ ETATS _________________________
    const [name, setName] = useState(initialName);

    
    // _________________________ LOGIQUE _________________________
    // Gestion de la soumission du formulaire d'édition de catégorie
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(name);
    };


    // _________________________ RENDU _________________________
    return (
        <form onSubmit={handleSubmit} className="space-y-2">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nouveau nom"
                className="border p-2 rounded-lg w-full text-black"
                disabled={isLoading}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
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

export default CategoryEditForm;