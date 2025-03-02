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
        <form 
            className="mx-auto mt-[10%] flex flex-col gap-2 sm:w-[400px]"
            onSubmit={handleSubmit}
        >
            <FormErrorMessage message={error?.general} />

            <label htmlFor="email">Email</label>
            <input
                type="text"
                className="input-text-select "
                placeholder="email@exemple.com"
                value={formData.email}
                onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                }
            />
            <FormErrorMessage message={error?.email} />

            <label htmlFor="password">Mot de passe</label>
            <input
                type="password"
                className="input-text-select "
                placeholder="Votre mot de passe"
                value={formData.password}
                onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                }
            />
            <FormErrorMessage message={error?.password} />

            <Button
                type="submit"
                disabled={isLoading}
                variant={isLoading ? "ghost" : "success"}
            >
                {isLoading ? "Création en cours..." : "Créer un compte"}
            </Button>
            <Button
                variant="link"
                onClick={() => router.push("/login")}
            >
                Se connecter
            </Button>
        </form>
    );
}
