import React from "react";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface DeleteItemProps {
    onDelete: () => Promise<void>;
    isDeleting: boolean;
}

const DeleteItem: React.FC<DeleteItemProps> = ({ onDelete, isDeleting }) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="delete" disabled={isDeleting}>
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
                    <Button onClick={onDelete} variant="delete" disabled={isDeleting}>
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
    );
};

export default DeleteItem;
