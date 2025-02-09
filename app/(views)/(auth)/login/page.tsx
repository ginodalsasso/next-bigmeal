"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { RegisterConstraints } from "@/lib/constraints/forms_constraints";
import Router from "next/router";
import FormErrorMessage from "@/components/forms/FormErrorMessage";
import { useFormValidation } from "@/app/hooks/useFormValidation";

export default function LoginPage() {
    
    // Utilisation du hook de validation
    const { error, setError, isLoading, setIsLoading, validate } = useFormValidation(
        RegisterConstraints,
        ["email", "password"] // Liste des champs à valider
    );

    const credentialsAction = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email")?.toString() || "";
        const password = formData.get("password")?.toString() || "";

        // Validation via le hook
        const isValid = validate({ email, password });
        if (!isValid) return;

        setIsLoading(true);

        try {
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                setError({ general: result.error || "Une erreur est survenue lors de la connexion." });
            }
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            setError({ general: "Impossible de se connecter. Veuillez réessayer plus tard." });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="px-4 py-8 mx-auto mt-[10%] sm:w-[400px] flex flex-col gap-2">
            <button onClick={() => signIn("google")} className="mb-4">
                Se connecter avec Google
            </button>
            <button onClick={() => signIn("github")} className="mb-4">
                Se connecter avec GitHub
            </button>

            <form onSubmit={credentialsAction} className="flex flex-col gap-2">
                <FormErrorMessage message={error?.general} />

                <label htmlFor="email">Email</label>
                <input
                    className="input-text-select"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                />
                <FormErrorMessage message={error?.email} />

                <label htmlFor="password">Mot de passe</label>
                <input
                    className="input-text-select"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Mot de passe"
                    required
                />
                <FormErrorMessage message={error?.password} />

                <Button type="submit" disabled={isLoading} variant={isLoading ? "ghost" : "success"}>
                    {isLoading ? "Connexion..." : "Se connecter"}
                </Button>

                <Button variant="link" onClick={() => Router.push("/register")}>
                    S&apos;inscrire
                </Button>
            </form>
        </div>
    );
}
