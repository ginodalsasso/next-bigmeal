"use client";

import { Button } from "@/components/ui/button";
import { loginConstraints } from "@/lib/constraints/forms_constraints";
import { UserFormErrorType } from "@/lib/types/forms_interfaces";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function RegisterPage() {

    const router = useRouter();
    const [error, setError] = useState<UserFormErrorType>({});
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ 
        email: "", password: "" 
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError({}); // Réinitialise les erreurs existantes

        // Validation des données utilisateur avec Zod
        const validation = loginConstraints.safeParse(formData);
        if (!validation.success) {
            const errors = validation.error.flatten().fieldErrors;
            setError({
                email: errors.email?.[0],
                password: errors.password?.[0],
            });
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
            {error.general && (
                <p className="error-form">{error.general}</p>
            )}
            <input
                type="text"
                className="input-text-select "
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                }
            />
            {error.email && (
                <p className="error-form">
                    {error.email}
                </p>
            )}
            <input
                type="password"
                className="input-text-select "
                placeholder="Mot de passe"
                value={formData.password}
                onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                }
            />
            {error.password && (
                <p className="error-form">
                    {error.password}
                </p>
            )}

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
