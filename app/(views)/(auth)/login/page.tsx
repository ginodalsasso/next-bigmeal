"use client";

// Bibliothèques tierces
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

// Hooks personnalisés
import { useFormValidation } from "@/app/hooks/useFormValidation";

// Composants UI
import { Button } from "@/components/ui/button";
import FormErrorMessage from "@/components/forms/FormErrorMessage";
import ForgotPasswordForm from "../_component/ForgotPasswordForm";

// Contraintes
import { LoginConstraints } from "@/lib/constraints/forms_constraints";


export default function LoginPage() {
    
    const router = useRouter();
    const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false); // Affichage conditionnel des formulaires
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    
    // Utilisation du hook de validation
    const { error, setError, validate } = useFormValidation(
        LoginConstraints,
        ["email", "password"] // Liste des champs à valider
    );

    // Fonction pour se connecter avec les identifiants
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
                redirect: true,
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
        <div className="mx-auto mt-[10%] flex flex-col gap-2 px-4 py-8 sm:w-[400px]">

            {/* Affichage conditionnel des formulaires */}
            {isForgotPassword ? (
                // Formulaire de réinitialisation du mot de passe
                <ForgotPasswordForm onBackToLogin={() => setIsForgotPassword(false)} />

            ) : (
                // Formulaire de connexion
                <form onSubmit={credentialsAction} className="flex flex-col gap-2">
                    <h2 className="text-xl font-bold">Connexion</h2>
                    <FormErrorMessage message={error?.general} />

                    <label htmlFor="email">Email</label>
                    <input
                        className="input-text-select"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="email@exemple.com"
                        required
                    />
                    <FormErrorMessage message={error?.email} />

                    <label htmlFor="password">Mot de passe</label>
                    <input
                        className="input-text-select"
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Votre mot de passe"
                        required
                    />
                    <FormErrorMessage message={error?.password} />
                    
                    {/* Lien mot de passe oublié pour afficher le formulaire de réinitialisation */}
                    <Button type="button" variant="link" className="justify-end text-sm" onClick={() => setIsForgotPassword(true)}>
                        Mot de passe oublié ?
                    </Button>

                    <Button type="submit" disabled={isLoading} variant={isLoading ? "ghost" : "success"}>
                        {isLoading ? "Connexion..." : "Se connecter"}
                    </Button>

                    <Button variant="secondary" onClick={() => router.push("/register")}>
                        Pas encore de compte ? Créer un compte
                    </Button>

                    { /* Connexion avec Google et GitHub */}
                    <Button variant="link" onClick={() => signIn("google")} className="mb-4">
                        Se connecter avec Google
                    </Button>
                    <Button variant="link" onClick={() => signIn("github")} className="mb-4">
                        Se connecter avec GitHub
                    </Button>
                </form>
            )}
        </div>
    );
}