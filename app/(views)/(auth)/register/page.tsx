"use client";

import { useFormValidation } from "@/app/hooks/useFormValidation";
import FormErrorMessage from "@/components/forms/FormErrorMessage";
import { Button } from "@/components/ui/button";
import { RegisterConstraints } from "@/lib/constraints/forms_constraints";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function RegisterPage() {

    const router = useRouter();

    // Utilisation du hook de validation
    const { error, setError, isLoading, setIsLoading, validate } = useFormValidation(
        RegisterConstraints,
        ["email", "password"] // Liste des champs à valider
    );

    const [formData, setFormData] = useState({ 
        email: "", password: "" 
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError({}); // Réinitialise les erreurs existantes

        if (!validate(formData)) {
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                router.push("/login");
                toast.success("Inscription réussie");
            } else {
                const errorData = await response.json();
                setError({
                    general: errorData.message || "Une erreur est survenue lors de l'inscription.",
                });
            }
        } catch (error) {
            console.error("Erreur lors de l'inscription :", error);
            setError({ general: "Impossible de s'incrire. Veuillez réessayer plus tard." });
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <form 
            className="mx-auto mt-[10%] sm:w-[400px] flex flex-col gap-2"
            onSubmit={handleSubmit}
        >
            <FormErrorMessage message={error?.general} />

            <input
                type="text"
                className="input-text-select "
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                }
            />
            <FormErrorMessage message={error?.email} />

            <input
                type="password"
                className="input-text-select "
                placeholder="Mot de passe"
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
