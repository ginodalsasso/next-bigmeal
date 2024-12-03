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
                    {/* la clé de l'objet est {key} et sa valeur est {value} */}
                    {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                </p>
            ))}
        </div>
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

export default ItemView;
