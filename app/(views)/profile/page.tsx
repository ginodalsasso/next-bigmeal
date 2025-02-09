"use client";

import React, { useEffect, useState } from "react";
import { UserType } from "@/lib/types/schemas_interfaces";
import { dateToString } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ProfilePage = () => {
    // _________________________ ETATS _________________________
    const [user, setUser] = useState<UserType | null>(null);
    const [recipient, setRecipient] = useState({ email: "" });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // _________________________ LOGIQUE _________________________
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("/api/profile");
                if (!response.ok) {
                    throw new Error("Utilisateur non trouvé");
                }
                const data: UserType = await response.json();
                setUser(data);
            } catch (error) {
                console.error("Erreur lors de la récupération de l'utilisateur :", error);
                setError("Impossible de charger le profil.");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    // Fonction pour envoyer un email de réinitialisation du mot de passe
    const forgotPasswordEmail = async () => {
        if (!recipient.email) {
            toast("Veuillez fournir un email");
            return;
        }

        try {
            const response = await fetch(`/api/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ recipient: recipient.email }),
            });

            if (!response.ok) throw new Error("Échec de l'envoi");

            toast("Email de réinitialisation envoyé !");
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'email :", error);
            toast("Erreur lors de l'envoi de l'email");
        }
    };

    // _________________________ RENDU _________________________
    if (loading) return <div>Chargement...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!user) return <div>Utilisateur introuvable.</div>;

    return (
        <div className="border p-4">
            <h1 className="text-2xl font-bold">{user.email}</h1>
            <p>Role: {user.role}</p>
            <p>Compte créé le: {dateToString(user.createdAt)}</p>

            <h2 className="text-xl font-semibold mt-6">Liste de courses</h2>
            {user.shoppingList && user.shoppingList.length > 0 ? (
                user.shoppingList.map((list) => (
                    <div key={list.id}>
                        <details>
                            <summary className="flex cursor-pointer">
                                <h3>Liste de courses du {dateToString(list.createdAt)}</h3>
                            </summary>
                            <div>
                                {list.comment && <p>Commentaire: {list.comment}</p>}
                                <ul>
                                    {list.items.map((item) => (
                                        <li key={item.id}>
                                            <span>
                                                {item.quantity} {item.ingredient?.name || "Ingrédient inconnu"}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </details>
                    </div>
                ))
            ) : (
                <p>Aucune liste de courses enregistrée.</p>
            )}

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    forgotPasswordEmail();
                }}
                className="mt-6"
            >
                <input
                    type="email"
                    className="input-text-select"
                    placeholder="Email"
                    value={recipient.email}
                    onChange={(e) => setRecipient({ email: e.target.value })}
                />
                <Button type="submit" variant={"edit"}>
                    Réinitialiser le mot de passe
                </Button>
            </form>
        </div>
    );
};

export default ProfilePage;
