"use client";

// Bibliothèques tierces
import React, { useState } from "react";

// Composants UI
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

// Services
import { deleteProfileAPI } from "@/lib/services/user_service";
import { getCsrfToken } from "next-auth/react";
import FormErrorMessage from "@/components/forms/FormErrorMessage";


interface DeleteProfileProps {
    userId: string;
}

// _________________________ COMPONENT _________________________
const DeleteProfile: React.FC<DeleteProfileProps> = ({ userId }) => {

    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);


    // _________________________ LOGIQUE _________________________
    const handleDelete = async () => {

        setIsDeleting(true);
        setError(null);
        
        try {
            const csrfToken = await getCsrfToken();
            if (!csrfToken) {
                console.error("CSRF token invalide");
                return;
            }
            await deleteProfileAPI(userId, csrfToken);
        } catch (error) {
            console.error("Erreur lors de la suppression du compte :", error);
            setError("Impossible de supprimer le compte.");
        } finally {
            setIsDeleting(false);
        }
    };

    // _________________________ RENDU _________________________
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="delete" className="w-full" title="Supprimer" disabled={isDeleting}>
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
                    <FormErrorMessage message={error ?? undefined} />
                    
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
