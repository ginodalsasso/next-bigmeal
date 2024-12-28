'use client';

import { RegisterConstraints } from "@/lib/constraints/forms_constraints";
import { UserFormErrorType } from "@/lib/types/forms_interfaces";
// import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {

    // __________________ HOOKS __________________
    const [error, setError] = useState<UserFormErrorType>({});
    const [isLoading, setIsLoading] = useState(false);


    // _________________________ LOGIQUE _________________________
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
    
        const formData = new FormData(event.currentTarget);
        const username = formData.get("username")?.toString();
        const password = formData.get("password")?.toString();
    
        // Valider les données du formulaire avec zod
        const validationResult = RegisterConstraints.safeParse({ username, password });
        if (!validationResult.success) {
            const errors = validationResult.error.flatten().fieldErrors;
            setError({
                username: errors.username?.[0],
                password: errors.password?.[0],
            });
            return;
        }

        if(username === "" || password === "") {
            setError({
                general: "Veuillez remplir tous les champs.",
            });
            return;
        }
    
        setIsLoading(true);
        setError({}); // Réinitialiser les erreurs
    
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
    
            if (response.ok) {
                window.location.href = "/ingredients";
                toast.success(`Bienvenue ${username} :)`);
            } else {
                const errorData = await response.json();
                setError({
                    general: errorData.message || "Une erreur est survenue lors de la connexion.",
                });
            }
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            setError({ general: "Impossible de se connecter. Veuillez réessayer plus tard." });
        } finally {
            setIsLoading(false);
        }
    }

    // _________________________ RENDU _________________________
    return (
        <form onSubmit={handleSubmit}>
            {error.general && (
                <p className="text-red-500 text-sm mb-4">
                    {error.general}
                </p>
            )}
            <input type="text" name="username" placeholder="Pseudo" required />
            {error.username && (
                <p className="text-red-500 text-sm mb-4 mx-auto">
                    {error.username}
                </p>
            )}

            <input
                type="password"
                name="password"
                placeholder="Password"
                required
            />
            {error.password && (
                <p className="text-red-500 text-sm mb-4 mx-auto">
                    {error.password}
                </p>
            )}

            <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-500 text-white p-2 rounded"
            >
                {isLoading ? "Connexion..." : "Se connecter"}
            </button>
        </form>
    );
}
