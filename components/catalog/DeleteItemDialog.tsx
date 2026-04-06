import { useState } from "react";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getCsrfToken } from "next-auth/react";
import { X } from "lucide-react";

interface DeleteItemProps {
    apiUrl: string;
    id: string;
    onSubmit: (id: string) => void;
}

const DeleteItem: React.FC<DeleteItemProps> = ({ apiUrl, id, onSubmit }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (!open) setErrorMessage(null);
    };

    const handleDelete = async () => {
        const csrfToken = await getCsrfToken();
        if (!csrfToken) {
            console.error("CSRF token invalide");
            return;
        }

        setIsDeleting(true);
        setErrorMessage(null);

        try {
            const response = await fetch(apiUrl, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-Token": csrfToken,
                },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                const data = await response.json().catch(() => null);
                setErrorMessage(data?.message ?? "Erreur lors de la suppression");
                return;
            }

            setIsOpen(false);
            onSubmit(id);
            toast.success("Suppression réussie");
        } catch (error) {
            console.error("Erreur de suppression:", error);
            setErrorMessage("Erreur lors de la suppression");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
            <AlertDialogTrigger asChild>
                <Button variant="delete" className="w-auto" aria-label="Supprimer" disabled={isDeleting}>
                    {isDeleting ? "..." : <X aria-hidden="true" />}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirmation de Suppression</AlertDialogTitle>
                    <AlertDialogDescription>
                        Êtes-vous sûr de vouloir supprimer cet élément ? <br /> Cette action est irréversible.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                {errorMessage && (
                    <p className="rounded-lg bg-warm-danger/10 px-3 py-2 text-sm text-warm-danger">
                        {errorMessage}
                    </p>
                )}

                <AlertDialogFooter>
                    <Button onClick={handleDelete} variant="delete" disabled={isDeleting}>
                        {isDeleting ? "Suppression..." : "Oui, supprimer"}
                    </Button>
                    <Button variant="secondary" onClick={() => handleOpenChange(false)}>
                        Annuler
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteItem;
