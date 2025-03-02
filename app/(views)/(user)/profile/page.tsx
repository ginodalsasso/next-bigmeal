"use client";

// Bibliothèques tierces
import React, { useEffect, useState } from "react";

// Types et utils
import { UserType } from "@/lib/types/schemas_interfaces";
import { dateToString } from "@/lib/utils";

// Composants UI
import { Button } from "@/components/ui/button";
import DeleteProfile from "../_component/DeleteProfile";
import ResetPasswordForm from "../_component/ResetPasswordForm";

// Services
import { fetchUserProfileAPI } from "@/lib/services/user_service";
import ShoppingLists from "../_component/ShoppingLists";


// _________________________ COMPONENT _________________________
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
                fetchUserProfileAPI().then((data) => 
                    setUser(data)
            );
            } catch (error) {
                console.error("Erreur lors de la récupération de l'utilisateur :", error);
                setError("Impossible de charger le profil.");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);


    // _________________________ RENDU _________________________
    if (loading) return <div>Chargement...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!user) return <div>Utilisateur introuvable.</div>;


    return (
        <div className="border p-4">
            {/* Affichage conditionnel des formulaires */}
            {isChangedPassword ? (
                    // Formulaire de modification du mot de passe
                    <ResetPasswordForm onBackToProfile={() => setIsChangedPassword(false)} />
                ) : (
                    <div>
                        <h1 className="text-2xl font-bold">{user.email}</h1>
                        <p>Role: {user.role}</p>
                        <p>Compte créé le: {dateToString(user.createdAt)}</p>

                        <ShoppingLists shoppingLists={user.shoppingList} />

                        {/* Bouton pour passer à la modification du mot de passe */}
                        <Button onClick={() => setIsChangedPassword(true)}>Changer mon mot de passe</Button>

                        {/* Bouton pour supprimer le compte */}
                        <DeleteProfile userId={user.id} />

                    </div>
                )}
        </div>
    );
};

export default ProfilePage;
