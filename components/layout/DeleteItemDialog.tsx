import React, { useState } from "react";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getCsrfToken } from "next-auth/react";
import { X } from "lucide-react";

interface DeleteItemProps {
    apiUrl: string; // URL dynamique
    id: string; // ID de l'élément à supprimer
    onSubmit: (id: string) => void; // Callback pour mettre à jour la liste après suppression
}

const DeleteItem: React.FC<DeleteItemProps> = ({ apiUrl, id, onSubmit }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    
    const handleDelete = async () => {
        const csrfToken = await getCsrfToken();
        if (!csrfToken) {
            console.error("CSRF token invalide");
            return;
        }
        
        setIsDeleting(true);
        
        try {
            const response = await fetch(apiUrl, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-Token": csrfToken,
                },
                body: JSON.stringify({ id }),
            });
            if (!response.ok) throw new Error("Échec de la suppression");

            onSubmit(id); // Met à jour la liste dans le parent
            toast("Suppression réussie");
        } catch (error) {
            console.error("Erreur de suppression:", error);
            toast.error("Erreur lors de la suppression");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button className="w-auto" title="Supprimer" disabled={isDeleting}>
                    {isDeleting ? "..." : <X/>}
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirmation de Suppression</AlertDialogTitle>
                    <AlertDialogDescription>
                        Êtes-vous sûr de vouloir supprimer cet élément ? <br /> Cette action est irréversible.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <Button onClick={handleDelete} variant="delete" disabled={isDeleting}>
                        {isDeleting ? "Suppression..." : "Oui, supprimer"}
                    </Button>
                    <AlertDialogTrigger asChild>
                        <Button variant="secondary">Annuler</Button>
                    </AlertDialogTrigger>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteItem;
