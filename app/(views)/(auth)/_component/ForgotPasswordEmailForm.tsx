import React, { useState } from "react";
import { toast } from "sonner";

import { useFormValidation } from "@/app/hooks/useFormValidation";
import FormErrorMessage from "@/components/forms/FormErrorMessage";
import { ForgotPasswordConstraints } from "@/lib/constraints/forms_constraints";
import { sendForgotPasswordEmailAPI } from "@/lib/services/auth_service";

const ForgotPasswordForm = ({ onBackToLogin }: { onBackToLogin: () => void }) => {
    const [recipient, setRecipient] = useState<{ email: string }>({ email: "" });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { error, setError, validate } = useFormValidation(
        ForgotPasswordConstraints,
        ["email"]
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate(recipient)) {
            setError({ email: "Veuillez saisir un email valide." });
            return;
        }

        setIsLoading(true);

        try {
            await sendForgotPasswordEmailAPI(recipient.email);
            toast("Email de réinitialisation envoyé !");
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'email :", error);
            setError({ general: "Impossible d'envoyer l'email. Veuillez réessayer plus tard." });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-semibold tracking-tight text-warm-primary">Mot de passe oublié</h2>
                <p className="mt-2 text-sm text-warm-secondary">Saisissez votre email pour recevoir un lien de réinitialisation.</p>
            </div>

            <FormErrorMessage message={error?.general} />

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-sm font-medium text-warm-primary">
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
                </div>

                <button
                    type="submit"
                    disabled={isLoading || !recipient.email}
                    className="flex h-11 w-full items-center justify-center rounded-xl bg-warm-accent px-4 text-sm font-semibold text-warm-primary shadow-sm transition-colors hover:bg-warm-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isLoading ? "Envoi en cours..." : "Envoyer le lien"}
                </button>
            </form>

            <button
                type="button"
                onClick={onBackToLogin}
                className="flex h-11 w-full items-center justify-center rounded-xl border border-warm-border bg-transparent px-4 text-sm font-medium text-warm-primary transition-colors hover:bg-warm-subtle"
            >
                Retour à la connexion
            </button>
        </div>
    );
};

export default ForgotPasswordForm;
