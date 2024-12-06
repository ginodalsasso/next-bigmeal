import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription } from "@/components/ui/alert-dialog";
import { ucFirst } from "@/lib/utils";


// _________________________ TYPES _________________________
interface GenericViewProps<T extends object> {
    title: string;
    details: T;
    onEdit: () => void;
    onDelete: () => Promise<void>; // Fonction pour supprimer l'élément
    isDeleting: boolean;
}


// _________________________ COMPOSANT _________________________
const ItemView = <T extends object>({
    title,
    details,
    onEdit,
    onDelete,
    isDeleting,
}: GenericViewProps<T>) => {
    return (
        <div>
            <h2 className="text-xl font-bold">{ucFirst(title)}</h2>
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
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 font-bold"
                >
                    Modifier
                </button>

                {/* AlertDialog pour la suppression */}
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded-lg mt-2 font-bold"
                            disabled={isDeleting}
                        >
                            {isDeleting ? "Suppression..." : "Supprimer"}
                        </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Confirmation de Suppression</AlertDialogTitle>
                            <AlertDialogDescription>
                                Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <button
                                onClick={onDelete}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold"
                                disabled={isDeleting}
                            >
                                {isDeleting ? "Suppression..." : "Oui, supprimer"}
                            </button>
                            <AlertDialogTrigger asChild>
                                <button className="bg-gray-500 text-white px-4 py-2 rounded-lg font-bold">
                                    Annuler
                                </button>
                            </AlertDialogTrigger>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
};

export default ItemView;
