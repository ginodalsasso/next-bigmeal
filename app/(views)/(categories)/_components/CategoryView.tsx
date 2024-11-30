// _________________________ TYPES _________________________
interface CategoryViewProps {
    categoryName: string;
    onEdit: () => void;
    onDelete: () => void;
    isDeleting: boolean;
}

// _________________________ COMPOSANT _________________________
const CategoryView: React.FC<CategoryViewProps> = ({ categoryName, onEdit, onDelete, isDeleting }) => (
    <div>
        <h2 className="text-xl font-bold">{categoryName}</h2>
        <button
            onClick={onEdit}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
        >
            Modifier
        </button>
        <button
            onClick={onDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-lg mt-2"
            disabled={isDeleting}
        >
            {isDeleting ? "Suppression..." : "Supprimer"}
        </button>
    </div>
);

export default CategoryView;
