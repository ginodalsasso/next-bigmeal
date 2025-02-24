"use client";

import React, { useEffect, useState } from "react";
import { UserType } from "@/lib/types/schemas_interfaces";
import { dateToString } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCsrfToken } from "@/app/hooks/useCsrfToken";

const ProfilePage = () => {
    // _________________________ ETATS _________________________
    const csrfToken = useCsrfToken();
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [isChangedPassword, setIsChangedPassword] = useState<boolean>(false); // Affichage conditionnel des formulaires

    // _________________________ LOGIQUE _________________________
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("/api/profile");
                if (!response.ok) throw new Error("Utilisateur non trouvé");
                
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

    const handleChangedPassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const password = formData.get("password")?.toString() || "";
        const newPassword = formData.get("new-password")?.toString() || "";
        const confirmPassword = formData.get("confirm-password")?.toString() || "";

        if(!password || !newPassword || !confirmPassword) {
            setError("Veuillez remplir tous les champs.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        if (!csrfToken) {
            console.error("CSRF token invalide");
            return;
        }
        try {
            const response = await fetch("/api/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-Token": csrfToken,
                },
                body: JSON.stringify({ password, newPassword }),
            });

            if (response.ok) {
                setError("");
                setIsChangedPassword(false);
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Une erreur est survenue lors de la modification du mot de passe.");
            }
        } catch (error) {
            console.error("Erreur lors de la modification du mot de passe :", error);
            setError("Impossible de modifier le mot de passe.");
        }
    }



    // _________________________ RENDU _________________________
    if (loading) return <div>Chargement...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!user) return <div>Utilisateur introuvable.</div>;

    return (
        <div className="border p-4">
            {/* Affichage conditionnel des formulaires */}
            {isChangedPassword ? (
                <div>
                    <form className="mb-2" onSubmit={handleChangedPassword}>
                        <label htmlFor="password">Votre mot de passe actuel</label>
                        <input
                            className="input-text-select mb-6"
                            type="password"
                            id="password"
                            name="password"
                            required
                        />
                        <label htmlFor="new-password">Nouveau mot de passe</label>
                        <input
                            className="input-text-select"
                            type="password"
                            id="new-password"
                            name="new-password"
                            required
                        />
                        <label htmlFor="confirm-password">Confirmer votre nouveau mot de passe</label>
                        <input
                            className="input-text-select"
                            type="password"
                            id="confirm-password"
                            name="confirm-password"
                            required
                        />
                        <Button type="submit">Modifier mon mot de passe</Button>
                    </form>
                    <Button variant="secondary" onClick={() => setIsChangedPassword(false)}>Revenir en arrière</Button>
                </div>
                ) : (
                    <div>
                        <h1 className="text-2xl font-bold">{user.email}</h1>
                        <p>Role: {user.role}</p>
                        <p>Compte créé le: {dateToString(user.createdAt)}</p>

                        <h2 className="mt-6 text-xl font-semibold">Liste de courses</h2>
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

                        {/* Bouton pour passer à la modification du mot de passe */}
                        <Button onClick={() => setIsChangedPassword(true)}>Changer mon mot de passe</Button>
                    </div>
                )}
        </div>
    );
};

export default ProfilePage;
