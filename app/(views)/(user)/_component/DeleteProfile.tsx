"use client";

import React, { useState } from "react";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useCsrfToken } from "@/app/hooks/useCsrfToken";
import { deleteProfileAPI } from "@/lib/services/user_service";

interface DeleteProfileProps {
    userId: string;
}

const DeleteProfile: React.FC<DeleteProfileProps> = ({ userId }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const csrfToken = useCsrfToken();

    const handleDelete = async () => {
        if (!csrfToken) {
            console.error("CSRF token invalide");
            return;
        }
        setIsDeleting(true);
        setError(null);

        try {
            await deleteProfileAPI(userId, csrfToken);
        } catch (error) {
            console.error("Erreur lors de la suppression du compte :", error);
            setError("Impossible de supprimer le compte.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="delete" className="w-auto" title="Supprimer" disabled={isDeleting}>
                        {isDeleting ? "Suppression en cours..." : "Supprimer mon compte"}
                    </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirmation de Suppression</AlertDialogTitle>
                        <AlertDialogDescription>
                            Êtes-vous sûr de vouloir supprimer votre compte ? <br />Cette action est irréversible.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    {error && <p className="text-red-500">{error}</p>}
                    
                    <AlertDialogFooter>
                        <Button onClick={handleDelete} variant="delete" disabled={isDeleting}>
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
        </>
    );
};

export default DeleteProfile;
