"use client";

import React, { useEffect, useState, use } from "react";
import { UserType } from "@/lib/types/schemas_interfaces";
import { dateToString } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const ProfilePage = 
    ({ 
        params 
    }: { 
        params: Promise<{ username: string }> 
    }) => {

    const { username } = use(params);

    // _________________________ ETATS _________________________
    const [user, setUser] = useState<UserType | null>(null);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // _________________________ LOGIQUE _________________________
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/${username}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch user");
                }
                const data: UserType = await response.json();
                setUser(data);
            } catch (error) {
                console.error("Erreur lors de la récupération de l'utilisateur :", error);
                setError('Erreur lors de la récupération de l\'utilisateur');
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [username]);


    const forgotPassword = async () => {
        try {

            const response = await fetch(`/api/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: user?.username }),
            });
            console.log(response);
            if (!response.ok) {
                throw new Error("Failed to send an email to reset the password");
            }

            alert('Email envoyé');
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'email de réinitialisation du mot de passe :", error);
            alert('Erreur lors de l\'envoi de l\'email de réinitialisation du mot de passe');
        }
    }

    // _________________________ RENDU _________________________
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!user) return <div>Utilisateur introuvable.</div>;

    return (
        <div className="border rounded-lg p-6 xl:w-[70%] mx-auto">
            <h1 className="text-2xl font-bold">{user.username}</h1>
            <p>Role: {user.role}</p>            
            <p>Compte créé le: {dateToString(user.createdAt)}</p>

            <h2 className="text-xl font-semibold mt-6">Liste de courses</h2>
                {user.shoppingList && user.shoppingList.map((list) => (
                    
                    <div key={list.id}>
                        <details>
                            <summary className="flex cursor-pointer"> 
                                <h3>Liste de courses du {dateToString(list.createdAt)}</h3>
                            </summary>
                            <div>
                                {list.comment && <p>Commentaire: {list.comment}</p> }
                                <ul>
                                    {list.items.map((item) => (
                                        <li key={item.id}>
                                            <span>{item.quantity} {item.ingredient?.name || "Ingrédient inconnu"}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </details>
                    </div>
                ))}

            <Button variant="edit" onClick={forgotPassword}>
                Réinitialiser le mot de passe
            </Button>

        </div>
    );
};

export default ProfilePage;
