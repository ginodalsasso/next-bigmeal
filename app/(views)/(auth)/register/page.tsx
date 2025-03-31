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
            toast("Compte créé avec succès !");
        } catch (error) {
            console.error("[REGISTER_ERROR]", error);
            setError({ general: "Erreur interne du serveur, veuillez réessayer plus tard." });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-start justify-center">
            <div className="mx-auto w-full max-w-md bg-white rounded-xl overflow-hidden transition-all duration-300 transform px-6 pt-8 pb-10">
                <div className="text-center mb-6">
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
                        />
                        <FormErrorMessage message={error?.email} />
                    </div>
    
                    <div>
                        <label htmlFor="password" className="block font-medium text-gray-700">
                            Mot de passe
                        </label>
                        <input
                            className="input-text-select mt-1 w-full"
                            type="password"
                            id="password"
                            name="password"
                            placeholder="••••••••"
                            required
                            autoComplete="current-password"
                        />
                        <FormErrorMessage message={error?.password} />
                    </div>
    
                    <Button 
                        type="submit" 
                        className="w-full"
                        disabled={isLoading} 
                        variant={isLoading ? "ghost" : "success"}
                    >
                        {isLoading ? "Création en cours..." : "Créer un compte"}
                    </Button>
    
                    <div className="text-center mt-6">
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
        </div>
    );
}    