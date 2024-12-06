import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
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
                <Button
                    onClick={onEdit}
                    variant="edit"
                >
                    Modifier
                </Button>
                {/* AlertDialog pour la suppression */}
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="delete"
                            disabled={isDeleting}
                        >
                            {isDeleting ? "Suppression..." : "Supprimer"}
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Confirmation de Suppression</AlertDialogTitle>
                            <AlertDialogDescription>
                                Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <Button
                                onClick={onDelete}
                                variant="delete"
                                disabled={isDeleting}
                            >
                                {isDeleting ? "Suppression..." : "Oui, supprimer"}
                            </Button>
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
