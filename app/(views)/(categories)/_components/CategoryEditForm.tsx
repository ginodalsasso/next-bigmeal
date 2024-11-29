import { useState } from "react";

interface CategoryEditFormProps {
    initialName: string;
    onSubmit: (newName: string) => Promise<void>;
    onCancel: () => void;
    isLoading: boolean;
    error: string | null;
}

const CategoryEditForm: React.FC<CategoryEditFormProps> = ({
    initialName,
    onSubmit,
    onCancel,
    isLoading,
    error,
}) => {
    const [name, setName] = useState(initialName);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(name.trim());
    };

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