"use client";

import { RegisterConstraints } from "@/lib/constraints/forms_constraints";
import { UserFormErrorType } from "@/lib/types/forms_interfaces";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function RegisterPage() {

    const router = useRouter();
    const [error, setError] = useState<UserFormErrorType>({});
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ 
        username: "", password: "" 
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError({}); // Réinitialise les erreurs existantes

        // Validation des données utilisateur avec Zod
        const validation = RegisterConstraints.safeParse(formData);
        if (!validation.success) {
            const errors = validation.error.flatten().fieldErrors;
            setError({
                username: errors.username?.[0],
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
            setError({ general: "Impossibld de s'incrire. Veuillez réessayer plus tard." });
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            {error.general && (
                <p className="text-red-500 text-sm mb-4">{error.general}</p>
            )}
            <input
                type="text"
                className="border border-gray-300 p-2 rounded text-black "
                placeholder="Pseudo"
                value={formData.username}
                onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                }
            />
            {error.username && (
                <p className="text-red-500 text-sm mb-4 mx-auto">
                    {error.username}
                </p>
            )}
            <input
                type="password"
                className="border border-gray-300 p-2 rounded text-black "
                placeholder="Mot de passe"
                value={formData.password}
                onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                }
            />
            {error.password && (
                <p className="text-red-500 text-sm mb-4 mx-auto">
                    {error.password}
                </p>
            )}
            <button type="submit">
                {isLoading ? "Création en cours..." : "Créer un compte"}
            </button>
        </form>
    );
}
