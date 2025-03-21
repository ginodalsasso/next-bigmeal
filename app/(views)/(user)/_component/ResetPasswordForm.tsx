// Bibliothèques tierces
import React from "react";
import { toast } from "sonner";

// Hooks personnalisés
import { useCsrfToken } from "@/app/hooks/useCsrfToken";
import { useFormValidation } from "@/app/hooks/useFormValidation";

// Composants UI
import { Button } from "@/components/ui/button";
import FormErrorMessage from "@/components/forms/FormErrorMessage";

// Contraintes
import { ResetPasswordConstraints } from "@/lib/constraints/forms_constraints";

// Services
import { resetPasswordAPI } from "@/lib/services/user_service";

// _________________________ COMPONENT _________________________
const ResetPasswordForm = ({ onBackToProfile }: { onBackToProfile: () => void }) => {

    // _________________________ ETATS _________________________
    const csrfToken = useCsrfToken();
    // Utilisation du hook de validation
    const { error, setError, validate } = useFormValidation(
        ResetPasswordConstraints,
        ["password"] // Liste des champs à valider
    );

    // _________________________ LOGIQUE _________________________
    const handleResetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const password = formData.get("password")?.toString() || "";
        const newPassword = formData.get("new-password")?.toString() || "";
        const confirmNewPassword = formData.get("confirm-password")?.toString() || "";

        if (!validate( { password, newPassword, confirmNewPassword })) {
            setError({ general: "Veuillez saisir un mot de passe valide." });
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setError({ password: "Les mots de passe ne correspondent pas." });
            return;
        }

        if (!csrfToken) {
            console.error("CSRF token invalide");
            return;
        }
        try {
            await resetPasswordAPI(password, newPassword, confirmNewPassword, csrfToken);
            toast.success("Votre mot de passe a bien été modifié.");
            onBackToProfile();
        } catch (error) {
            console.error("Erreur lors de la modification du mot de passe :", error);
            setError({ general: "Impossible de modifier le mot de passe. Veuillez réessayer plus tard." });
        }
    }


    // _________________________ RENDU _________________________
    return (
        <div>
            <form className="mb-2" onSubmit={handleResetPassword}>
                <FormErrorMessage message={error?.general} />

                <label htmlFor="password">Votre mot de passe actuel</label>
                <input
                    className="input-text-select mb-6"
                    type="password"
                    id="password"
                    name="password"
                    required
                />
                <label htmlFor="new-password">Nouveau mot de passe</label>
                <input
                    className="input-text-select"
                    type="password"
                    id="new-password"
                    name="new-password"
                    required
                />
                <label htmlFor="confirm-password">Confirmer votre nouveau mot de passe</label>
                <input
                    className="input-text-select"
                    type="password"
                    id="confirm-password"
                    name="confirm-password"
                    required
                />
                <FormErrorMessage message={error?.password} />

                <Button type="submit">Modifier mon mot de passe</Button>
            </form>

            <Button variant="secondary" onClick={onBackToProfile}>
                Retour au profil
            </Button>
        </div>
    );
};

export default ResetPasswordForm;
