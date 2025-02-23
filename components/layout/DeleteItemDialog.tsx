import React from "react";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface DeleteItemProps {
    onDelete: () => Promise<void>;
    isDeleting: boolean;
}

const DeleteItem: React.FC<DeleteItemProps> = ({ onDelete, isDeleting }) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="delete" className="w-auto" title="Supprimer" disabled={isDeleting}>
                    {isDeleting ? 
                        "..." :                                 
                        <Image
                            src={"/img/trash.svg"}
                            width={18}
                            height={18}
                            alt="Icône de suppression"
                        />
                    }
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirmation de Suppression</AlertDialogTitle>
                    <AlertDialogDescription>
                        Êtes-vous sûr de vouloir supprimer cet élément ? <br /> Cette action est irréversible.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <Button onClick={onDelete} variant="delete" disabled={isDeleting}>
                        {isDeleting ? "Suppression..." : "Oui, supprimer"}
                    </Button>
                    <AlertDialogTrigger asChild>
                        <Button variant="secondary">
                            Annuler
                        </Button>
                    </AlertDialogTrigger>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteItem;
