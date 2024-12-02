import { Season } from "@/lib/types/enums";

// _________________________ TYPES _________________________
interface IngredientViewProps {
    ingredientName: string;
    ingredientCategory: string;
    ingredientSeason?: Season;
    onEdit: () => void;
    onDelete: () => void;
    isDeleting: boolean;
}

// _________________________ COMPOSANT _________________________
const CategoryView: React.FC<IngredientViewProps> = ({ 
    ingredientName, 
    ingredientCategory,
    ingredientSeason,
    onEdit, 
    onDelete, 
    isDeleting 
}) => ( 

    <div>
        <h2 className="text-xl font-bold">{ingredientName}</h2>
        {ingredientCategory && (
        <p>Catégorie: {ingredientCategory}</p>
        )}
        {ingredientSeason && (
            <p>Saison: {ingredientSeason}</p>
        )}
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
