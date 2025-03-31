// Bibliothèques tierces
import React, { useState } from "react";
import { toast } from "sonner";

// Hooks personnalisés
import { useFormValidation } from "@/app/hooks/useFormValidation";

// Composants UI
import FormErrorMessage from "@/components/forms/FormErrorMessage";
import { Button } from "@/components/ui/button";

// Contraintes et services
import { ForgotPasswordConstraints } from "@/lib/constraints/forms_constraints";
import { sendForgotPasswordEmailAPI } from "@/lib/services/auth_service";


// _________________________ COMPONENT _________________________
const ForgotPasswordForm = ({ onBackToLogin }: { onBackToLogin: () => void }) => {

    // _________________________ ETATS _________________________
    const [recipient, setRecipient] = useState<{ email: string }>({ email: "" });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Utilisation du hook de validation
    const { error, setError, validate } = useFormValidation(
        ForgotPasswordConstraints,
        ["email"] // Liste des champs à valider
    );

    // _________________________ LOGIQUE _________________________
    // Fonction pour envoyer un email de réinitialisation du mot de passe
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (!validate(recipient)){
            setError({ email: "Veuillez saisir un email valide." });
            return;
        }

        try {
            await sendForgotPasswordEmailAPI(recipient.email);
            toast("Email de réinitialisation envoyé !");
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'email :", error);
            setError({ general: "Impossible d'envoyer l'email. Veuillez réessayer plus tard." });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">Réinitialisation du mot de passe</h2>
            <p className="text-sm text-gray-600">Saisissez votre email pour recevoir un lien de réinitialisation.</p>

            <FormErrorMessage message={error?.general} />
            <form onSubmit={handleSubmit}>
                <label 
                    htmlFor="email" 
                    className="text-sm font-semibold"
                >
                    Adresse email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    className="input-text-select"
                    placeholder="email@exemple.com"
                    value={recipient.email}
                    onChange={(e) => setRecipient({ email: e.target.value })}
                />
                <FormErrorMessage message={error?.email} />

                <Button 
                    type="submit" 
                    className="w-full my-2"
                    disabled={isLoading || !recipient.email}
                    variant={isLoading ? "ghost" : "default"}
                >
                    {isLoading ? "Envoi en cours..." : "Envoyer le lien"}
                </Button>
            </form>

                <Button 
                    type="button" 
                    onClick={onBackToLogin} 
                    variant="secondary"
                >
                    Retour à la connexion
                </Button>
        </div>
    );
};

export default ForgotPasswordForm;
