import { useFormValidation } from "@/app/hooks/useFormValidation";
import FormErrorMessage from "@/components/forms/FormErrorMessage";
import { Button } from "@/components/ui/button";
import { ResetPasswordConstraints } from "@/lib/constraints/forms_constraints";
import React, { useState } from "react";
import { toast } from "sonner";


const ForgotPasswordForm = ({ onBackToLogin }: { onBackToLogin: () => void }) => {
    const [recipient, setRecipient] = useState<{ email: string }>({ email: "" });

    // Utilisation du hook de validation
    const { error, setError, validate } = useFormValidation(
        ResetPasswordConstraints,
        ["email"] // Liste des champs à valider
    );

    // Fonction pour envoyer un email de réinitialisation du mot de passe
    const forgotPasswordEmail = async () => {
        if (!validate(recipient)){
            setError({ email: "Veuillez saisir un email valide." });
            return;
        }

        try {
            const response = await fetch(`/api/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ recipient: recipient.email }),
            });

            const data = await response.json();
            if (!response.ok) {
                setError({ general: data.message || "Une erreur est survenue lors de l'envoi de l'email." });
                return;
            }

            toast("Email de réinitialisation envoyé !");
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'email :", error);
            setError({ general: "Impossible d'envoyer l'email. Veuillez réessayer plus tard." });
        };
    }

    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">Réinitialisation du mot de passe</h2>
            <p className="text-sm text-gray-600">Saisissez votre email pour recevoir un lien de réinitialisation.</p>

            <FormErrorMessage message={error?.general} />

            <input
                type="email"
                className="input-text-select"
                placeholder="Email"
                value={recipient.email}
                onChange={(e) => setRecipient({ email: e.target.value })}
            />
            <FormErrorMessage message={error?.email} />

            <Button type="button" onClick={forgotPasswordEmail} variant={"edit"}>
                Envoyer l&apos;email
            </Button>

            <Button type="button" onClick={onBackToLogin} variant="secondary">
                Retour à la connexion
            </Button>
        </div>
    );
};

export default ForgotPasswordForm;
