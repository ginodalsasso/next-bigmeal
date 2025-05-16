"use client";

// Bibliothèques tierces
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Hooks personnalisés
import { useFormValidation } from "@/app/hooks/useFormValidation";

// Composants UI
import { Button } from "@/components/ui/button";
import FormErrorMessage from "@/components/forms/FormErrorMessage";

// Contraintes et services
import { RegisterConstraints } from "@/lib/constraints/forms_constraints";
import { registerUserAPI } from "@/lib/services/auth_service";
import PasswordInput from "@/components/forms/PasswordInput";
import LoadingSpinner from "@/components/layout/LoadingSpinner";

// _________________________ COMPONENT _________________________
export default function RegisterPage() {

    // _________________________ ETATS _________________________
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Utilisation du hook de validation
    const { error, setError, validate } = useFormValidation(
        RegisterConstraints,
        ["email", "password"] // Liste des champs à valider
    );

    const [formData, setFormData] = useState({ 
        email: "", 
        password: "" 
    });

    // Création du compte utilisateur
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null); // Réinitialise les erreurs existantes

        if (!validate(formData)) {
            setIsLoading(false);
            return;
        }

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

    if (isLoading) { <LoadingSpinner /> }

    return (
        <div className="card transition-all duration-300">   
            <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-gray-900">Inscription</h2>
                <p className="mt-2 text-sm text-gray-600">Entrez vos informations pour créer un compte</p>
            </div>

            <FormErrorMessage message={error?.general} />

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className="block font-medium text-gray-700">
                        Adresse email
                    </label>
                    <input
                        className="input-text-select mt-1 w-full shadow-sm"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="email@exemple.com"
                        required
                        autoComplete="email"
                        autoFocus
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                    />
                    <FormErrorMessage message={error?.email} />
                </div>

            <div>
                <PasswordInput 
                    id="password"
                    name="password"
                    label="Mot de passe"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                    }
                    error={error?.password}
                    required
                />
            </div>


                <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isLoading} 
                    variant={isLoading ? "ghost" : "success"}
                >
                    {isLoading ? "Création en cours..." : "Créer un compte"}
                </Button>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Déjà un compte ?{" "}
                        <Button
                            variant="link"
                            onClick={() => router.push("/login")}
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            Se connecter
                        </Button>
                    </p>
                </div>
            </form>
        </div>
    );
}    