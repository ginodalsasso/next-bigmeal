"use client";

import { UserFormErrorType } from "@/lib/types/forms_interfaces";
import { useState } from "react";
import { toast } from "sonner";

export default function RegisterPage() {

    const [error, setError] = useState<UserFormErrorType>({});
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ 
        username: "", password: "" 
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError({});

        try{
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if(!response.ok){
                throw new Error("Erreur lors de l'inscription");
            }
            toast.success("Inscription réussie");
            setIsLoading(false);
        } catch(error) {
            console.error("Erreur lors de l'inscription", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
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
                placeholder="Password"
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
