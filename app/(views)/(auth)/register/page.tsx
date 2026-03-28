"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

import { useFormValidation } from "@/app/hooks/useFormValidation";
import FormErrorMessage from "@/components/ui/FormErrorMessage";
import { RegisterConstraints } from "@/lib/constraints/forms_constraints";
import { registerUserAPI } from "@/lib/services/auth_service";
import PasswordInput from "@/components/forms/PasswordInput";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function RegisterPage() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { error, setError, validate } = useFormValidation(
        RegisterConstraints,
        ["email", "password"]
    );

    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!validate(formData)) return;

        setIsLoading(true);

        try {
            await registerUserAPI(formData.email, formData.password);
            toast.success("Compte créé avec succès ! Vous pouvez confirmer votre compte en consultant vos mails.");
        } catch (error) {
            console.error("[REGISTER_ERROR]", error);
            setError({ general: "Erreur interne du serveur, veuillez réessayer plus tard." });
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="flex min-h-dvh flex-col items-center justify-center bg-warm-base px-4">
            <div className="w-full max-w-sm space-y-6">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold tracking-tight text-warm-primary">Inscription</h2>
                    <p className="mt-2 text-sm text-warm-secondary">Entrez vos informations pour créer un compte</p>
                </div>

                <FormErrorMessage message={error?.general} />

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-1.5">
                        <label htmlFor="email" className="block text-sm font-medium text-warm-primary">
                            Adresse email
                        </label>
                        <input
                            className="input-text-select"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="email@exemple.com"
                            required
                            autoComplete="email"
                            autoFocus
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        <FormErrorMessage message={error?.email} />
                    </div>

                    <div className="space-y-1.5">
                        <PasswordInput
                            id="password"
                            name="password"
                            label="Mot de passe"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            error={error?.password}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="mt-2 flex h-11 w-full items-center justify-center rounded-xl bg-warm-accent px-4 text-sm font-semibold text-warm-primary shadow-sm transition-colors hover:bg-warm-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isLoading ? "Création en cours..." : "Créer un compte"}
                    </button>
                </form>

                <div className="text-center text-sm text-warm-secondary">
                    Déjà un compte ?{" "}
                    <Link href="/login" className="font-medium text-warm-primary transition-colors hover:underline">
                        Se connecter
                    </Link>
                </div>
            </div>
        </div>
    );
}
