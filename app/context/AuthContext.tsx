"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
    isAuth: boolean; // Indique si l'utilisateur est authentifié
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>; // Permet de mettre à jour l'état
    handleSession: () => Promise<void>; // Fonction pour vérifier la session
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider pour gérer l'authentification avec le contexte
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuth, setIsAuth] = useState(false);

    const handleSession = async () => {
        try {
            const response = await fetch("/api/auth/status", {
                method: "GET",
                credentials: "include", // Assure que les cookies sont inclus
            });

            if (response.ok) {
                const data = await response.json();
                setIsAuth(data.isAuth); // Met à jour l'état d'authentification
            } else {
                setIsAuth(false); // L'utilisateur n'est pas connecté
            }
        } catch (error) {
            console.error("Erreur lors de la vérification de la session :", error);
            setIsAuth(false);
        }
    };

    useEffect(() => {
        handleSession(); // Vérifie la session au montage du composant
    }, []);

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth, handleSession }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personnalisé pour accéder au contexte
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
