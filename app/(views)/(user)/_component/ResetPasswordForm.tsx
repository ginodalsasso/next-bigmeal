import { useCsrfToken } from "@/app/hooks/useCsrfToken";
import { useFormValidation } from "@/app/hooks/useFormValidation";
import FormErrorMessage from "@/components/forms/FormErrorMessage";
import { Button } from "@/components/ui/button";
import { ResetPasswordConstraints } from "@/lib/constraints/forms_constraints";
import React from "react";
import { toast } from "sonner";

const ResetPasswordForm = ({ onBackToProfile }: { onBackToProfile: () => void }) => {

    // _________________________ ETATS _________________________
    const csrfToken = useCsrfToken();
    // Utilisation du hook de validation
    const { error, setError, validate } = useFormValidation(
        ResetPasswordConstraints,
        ["password"] // Liste des champs à valider
    );

    // _________________________ LOGIQUE _________________________
    const handleChangedPassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const password = formData.get("password")?.toString() || "";
        const newPassword = formData.get("new-password")?.toString() || "";
        const confirmPassword = formData.get("confirm-password")?.toString() || "";

        if (!validate( { password, newPassword, confirmPassword })) {
            setError({ general: "Veuillez saisir un mot de passe valide." });
            return;
        }

        if (newPassword !== confirmPassword) {
            setError({ password: "Les mots de passe ne correspondent pas." });
            return;
        }

        if (!csrfToken) {
            console.error("CSRF token invalide");
            return;
        }
        try {
            const response = await fetch("/api/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-Token": csrfToken,
                },
                body: JSON.stringify({ password, newPassword }),
            });

            if (response.ok) {
                setError({});
                toast("Mot de passe modifié !");
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Une erreur est survenue lors de la modification du mot de passe.");
            }
        } catch (error) {
            console.error("Erreur lors de la modification du mot de passe :", error);
            setError({ general: "Impossible de modifier le mot de passe. Veuillez réessayer plus tard." });
        }
    }


    return (
        <div>
            <form className="mb-2" onSubmit={handleChangedPassword}>
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
