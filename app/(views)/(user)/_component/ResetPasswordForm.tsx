// Bibliothèques tierces
import React from "react";
import { toast } from "sonner";

// Hooks personnalisés
import { useFormValidation } from "@/app/hooks/useFormValidation";

// Composants UI
import { Button } from "@/components/ui/button";
import FormErrorMessage from "@/components/forms/FormErrorMessage";

// Contraintes
import { ResetPasswordConstraints } from "@/lib/constraints/forms_constraints";

// Services
import { resetPasswordAPI } from "@/lib/services/user_service";
import { getCsrfToken } from "next-auth/react";
import FormSubmitButton from "@/components/forms/FormSubmitButton";
import PasswordInput from "@/components/forms/PasswordInput";

// _________________________ COMPONENT _________________________
const ResetPasswordForm = ({ onBackToProfile }: { onBackToProfile: () => void }) => {
    // _________________________ ETATS _________________________
    // Utilisation du hook de validation
    const { error, setError, validate } = useFormValidation(
        ResetPasswordConstraints,
        ["password"] // Liste des champs à valider
    );

    // _________________________ LOGIQUE _________________________
    const handleResetPassword = async (formData: FormData) => {
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
        
        try {
            const csrfToken = await getCsrfToken();
            if (!csrfToken) {
                console.error("CSRF token invalide");
                return;
            }
            await resetPasswordAPI(
                password, 
                newPassword, 
                confirmNewPassword, 
                csrfToken
            );
            
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
            <form className="card" action={handleResetPassword}>
                <FormErrorMessage message={error?.general} />

                <PasswordInput
                    id="password"
                    name="password"
                    label="Mot de passe actuel"
                    placeholder="••••••••"
                    autoComplete="off"
                    required
                    error={error?.password}
                />
                <FormErrorMessage message={error?.password} />

                <label htmlFor="new-password">Nouveau mot de passe</label>
                <input
                    className="input-text-select"
                    type="password"
                    id="new-password"
                    name="new-password"
                    placeholder="••••••••"
                    autoComplete="off"
                    required
                />
                <label htmlFor="confirm-password">Confirmer votre nouveau mot de passe</label>
                <input
                    className="input-text-select"
                    type="password"
                    id="confirm-password"
                    name="confirm-password"
                    placeholder="••••••••"
                    autoComplete="off"
                    required
                />
                <FormErrorMessage message={error?.password} />

                <FormSubmitButton
                    className="my-4 w-full"
                    defaultText="Modifier le mot de passe"
                />
            </form>

            <Button variant="secondary" className="w-full" onClick={onBackToProfile}>
                Retour au profil
            </Button>
        </div>
    );
};

export default ResetPasswordForm;
