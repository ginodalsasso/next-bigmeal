"use client";

// Bibliothèques tierces
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { confirmEmailAPI } from "@/lib/services/user_service";


// _________________________ COMPONENT _________________________
const ConfirmEmailPage = () => {

    // _________________________ ETATS _________________________
    const { token } = useParams(); 
    const router = useRouter();
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

    useEffect(() => {
        const confirmEmail = async () => {
            try {
                if (!token) {
                    setStatus("error");
                    return;
                } 

                const response = await confirmEmailAPI(token);
                
                if (response.ok) {
                    setStatus("success");
                    setTimeout(() => {
                        router.push("/login");
                    }, 1000);
                } else {
                    setStatus("error");
                }
            } catch (error) {
                console.error("Erreur de confirmation :", error);
                setStatus("error");
            }
        };

        if (token) {
            confirmEmail();
        }
        
    }, [token, router]); // Si le token change, on relance la vérification


    // _________________________ RENDU _________________________
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            {status === "loading" && <p>Vérification en cours...</p>}
            {status === "success" && (
                <p className="text-green-500">Email confirmé avec succès ! Redirection en cours...</p>
            )}
            {status === "error" && (
                <p className="text-red-500">Erreur de confirmation. Le lien est invalide ou expiré.</p>
            )}
        </div>
    );
};

export default ConfirmEmailPage;
