"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LoginConstraints } from "@/lib/constraints/forms_constraints";
import FormErrorMessage from "@/components/forms/FormErrorMessage";
import { useFormValidation } from "@/app/hooks/useFormValidation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
    
    const router = useRouter();
    const [recipient, setRecipient] = useState<{ email: string }>({ email: "" });
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

    // Fonction pour envoyer un email de réinitialisation du mot de passe
    const forgotPasswordEmail = async () => {
        if (!recipient.email) {
            toast("Veuillez fournir un email");
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
        <div className="mx-auto mt-[10%] flex flex-col gap-2 px-4 py-8 sm:w-[400px]">

            {/* Affichage conditionnel des formulaires */}
            {isForgotPassword ? (
                // 🔹 Formulaire de réinitialisation du mot de passe
                <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-bold">Réinitialisation du mot de passe</h2>
                    <p className="text-sm text-gray-600">Saisissez votre email pour recevoir un lien de réinitialisation.</p>

                    <input
                        type="email"
                        className="input-text-select"
                        placeholder="Email"
                        value={recipient.email}
                        onChange={(e) => setRecipient({ email: e.target.value })}
                    />

                    <Button type="button" onClick={forgotPasswordEmail} variant={"edit"}>
                        Envoyer l&apos;email
                    </Button>

                    <Button type="button" onClick={() => setIsForgotPassword(false)} variant="secondary">
                        Retour à la connexion
                    </Button>
                </div>
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