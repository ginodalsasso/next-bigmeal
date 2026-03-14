"use client";

import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { UserType } from "@/lib/types/schemas_interfaces";
import { Button } from "@/components/ui/button";
import ResetPasswordForm from "../_component/ResetPasswordForm";
import { fetchUserProfileAPI } from "@/lib/services/user_service";
import ShoppingLists from "../_component/ShoppingLists";
import LoadingSpinner from "@/components/layout/LoadingSpinner";
import { LogOut, User } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import UserInformation from "../_component/UserInformation";
import { notFound } from "next/navigation";

const ProfilePage = () => {
    const [user, setUser] = useState<UserType>();
    const [loading, setLoading] = useState<boolean>(true);
    const [isChangedPassword, setIsChangedPassword] = useState<boolean>(false);
    const [isChangedEmail, setIsChangedEmail] = useState<boolean>(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data: UserType = await fetchUserProfileAPI();
                setUser(data);
            } catch (error) {
                console.error("Erreur lors de la récupération de l'utilisateur :", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);


    const updateEmail = (newEmail: string) => {
        setUser((prevUser) => 
            prevUser ? { ...prevUser, email: newEmail } : prevUser
        );
        setIsChangedEmail(false);
    }

    if (loading) return <LoadingSpinner />;
    if (!user) return notFound();

    return (
        <div className="mx-auto">
            {isChangedPassword ? (
                <div className="rounded-lg shadow-md">
                    <ResetPasswordForm onBackToProfile={() => setIsChangedPassword(false)} />
                </div>
            ) : (
                <div>
                    {/* En-tête du profil */}
                    <div className="mb-4 flex flex-col items-center gap-4 rounded-lg border border-neutral-800 bg-neutral-900 p-5 text-white">
                        <div className="flex items-center gap-3">
                            <div className="rounded-full bg-neutral-800 p-2 text-orange-400">
                                <User size={28} aria-hidden="true" />
                            </div>
                            <div>
                                <h1 className="text-lg font-semibold leading-tight">Mon profil</h1>
                                <p className="text-sm text-neutral-400">{user.email}</p>
                            </div>
                        </div>
                        <Button
                            onClick={() => signOut()}
                            variant="ghost"
                            className="w-full text-neutral-300 hover:bg-neutral-800 hover:text-white"
                        >
                            <LogOut size={16} aria-hidden="true" />
                            Déconnexion
                        </Button>
                    </div>
                    <Tabs defaultValue="profile">
                        <TabsList className="mb-2 w-full">
                            <TabsTrigger value="profile">
                                Informations
                            </TabsTrigger>
                            <TabsTrigger value="shoppingList">
                                Listes de courses
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="profile">
                            <UserInformation
                                user={user}
                                isChangedPassword={isChangedPassword}
                                setIsChangedPassword={setIsChangedPassword}
                                isChangedEmail={isChangedEmail}
                                setIsChangedEmail={setIsChangedEmail}
                                updateEmail={updateEmail}
                            />
                        </TabsContent>
                        <TabsContent value="shoppingList">
                            <ShoppingLists shoppingLists={user.shoppingList} />
                        </TabsContent>
                    </Tabs>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;