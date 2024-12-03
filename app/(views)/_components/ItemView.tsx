import { ucFirst } from "@/lib/utils";

interface GenericViewProps<T extends object> {
    title: string;
    details: T;
    onEdit: () => void;
    onDelete: () => void;
    isDeleting: boolean;
}

const ItemView = <T extends object>({
    title,
    details,
    onEdit,
    onDelete,
    isDeleting,
}: GenericViewProps<T>) => (
    <div>
        <h2 className="text-xl font-bold">{title}</h2>
        <div>
            {Object.entries(details).map(([key, value]) => ( // Object.entries() retourne un tableau de paires clé-valeur
                <p key={key}>
                    {ucFirst(key)}: {value}
                </p>
            ))}
        </div>
        <div className="flex gap-2">
            <button
                onClick={onEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2  font-bold"
            >
                Modifier
            </button>
            <button
                onClick={onDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg mt-2  font-bold"
                disabled={isDeleting}
            >
                {isDeleting ? "Suppression..." : "Supprimer"}
            </button>
        </div>
    </div>
);

export default ItemView;
