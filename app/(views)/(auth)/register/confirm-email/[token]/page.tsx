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
                    }, 4000);
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
        <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
            <div className="w-full max-w-md rounded-lg bg-white p-6">
                {status === "loading" && (
                    <div className="py-8">
                        <div className="mx-auto size-10 animate-spin rounded-full border-y-2 border-gray-400"></div>
                        <p className="mt-4 text-gray-600">Vérification de votre email...</p>
                    </div>
                )}
                
                {status === "success" && (
                    <div className="py-8">
                        <h2 className="mt-4 text-xl font-semibold text-gray-800">Email confirmé</h2>
                        <p className="mt-2 text-gray-600">Votre compte est en attente de validation par l&apos;administrateur.</p>
                        <p className="mt-4 text-sm text-gray-500">Vous allez être redirigé automatiquement...</p>
                    </div>
                )}
                
                {status === "error" && (
                    <div className="py-8">
                        <h2 className="mt-4 text-xl font-semibold text-gray-800">Erreur de confirmation</h2>
                        <p className="mt-2 text-gray-600">Le lien que vous avez utilisé est invalide ou a expiré.</p>
                    </div>
                )}
            </div>
        </div>
    );
    
};

export default ConfirmEmailPage;
