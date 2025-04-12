"use client";

// Bibliothèques tierces
import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";

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
import Link from "next/link";
import IsAdmin from "@/components/isAdmin";
import LoadingSpinner from "@/components/layout/LoadingSpinner";
import { LogOut } from "lucide-react";
import ChangeEmailForm from "../_component/ChangeEmailForm";
import { set } from "zod";


// _________________________ COMPONENT _________________________
const ProfilePage = () => {

    // _________________________ ETATS _________________________
    const [user, setUser] = useState<UserType>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [isChangedPassword, setIsChangedPassword] = useState<boolean>(false); // Affichage conditionnel des formulaires
    const [isChangedEmail, setIsChangedEmail] = useState<boolean>(false); // Affichage conditionnel des formulaires

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

    const updateEmail = async (email: string) => {
        setUser((prevUser) =>
            prevUser ? { ...prevUser, email } : prevUser
        );
    };



    // _________________________ RENDU _________________________
    if (loading || !user) return <LoadingSpinner />;
    if (error) return <div className="text-red-500">{error}</div>;


    return (
        <div className="border p-4">
            {/* Affichage conditionnel des formulaires */}
            {isChangedPassword ? (
                    // Formulaire de modification du mot de passe
                    <ResetPasswordForm onBackToProfile={() => setIsChangedPassword(false)} />
                ) : (
                    <div>
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-semibold">Mon profil</h1>
                            <button 
                                className="align-icon"

                                onClick={() => signOut()}
                                title="Déconnexion"
                            >
                                <LogOut />
                            </button>
                        </div>
                        <section className="my-4 border-y py-4">
                            {!isChangedEmail ? (
                                <>
                                <p>Email: {user.email}</p>
                                <span 
                                    onClick={() => setIsChangedEmail(true)} 
                                    className="cursor-pointer text-blue-500 hover:underline"
                                >
                                    Modifier mon email
                                </span>
                                </>
                            ) : (
                                // Formulaire de modification de l'email
                                <ChangeEmailForm
                                    user={user}
                                    onSubmit={(newEmail) => {
                                        // Mettre à jour l'utilisateur avec le nouvel email
                                        setUser((prevUser) => 
                                            prevUser ? { ...prevUser, email: newEmail } : prevUser
                                        );
                                        setIsChangedEmail(false);
                                    }}
                                    onBackToProfile={() => setIsChangedEmail(false)}
                                />
                            )}
                            <p>Rôle: {user.role}</p>
                            <p>Compte créé le: {dateToString(user.createdAt)}</p>
                        </section>

                        <ShoppingLists shoppingLists={user.shoppingList} />


                        <div className="mt-4 flex flex-col gap-4 border-t pt-4">
                            <IsAdmin>
                                <Button variant="secondary" className="w-full">
                                    <Link href="/dashboard">Dashboard</Link>
                                </Button>
                            </IsAdmin>
                            {/* Bouton pour passer à la modification du mot de passe */}
                            <Button onClick={() => setIsChangedPassword(true)}>Changer mon mot de passe</Button>

                            {/* Bouton pour supprimer le compte */}
                            <DeleteProfile userId={user.id} />
                        </div>


                    </div>
                )}
        </div>
    );
};

export default ProfilePage;
