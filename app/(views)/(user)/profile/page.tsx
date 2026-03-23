"use client";

import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { UserType } from "@/lib/types/schemas_interfaces";
import { Button } from "@/components/ui/button";
import ResetPasswordForm from "../_component/ResetPasswordForm";
import { fetchUserProfileAPI } from "@/lib/services/user_service";
import ShoppingLists from "../_component/ShoppingLists";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
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
    };

    if (loading) return <LoadingSpinner />;
    if (!user) return notFound();

    return (
        <div className="mx-auto max-w-2xl">
            {isChangedPassword ? (
                <ResetPasswordForm onBackToProfile={() => setIsChangedPassword(false)} />
            ) : (
                <div className="space-y-4">

                    {/* En-tête du profil */}
                    <div className="flex items-center justify-between rounded-xl border border-warm-border bg-warm-subtle p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex size-11 items-center justify-center rounded-full bg-warm-accent/15">
                                <User size={22} className="text-warm-accent" aria-hidden="true" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-warm-primary">Mon profil</p>
                                <p className="text-xs text-warm-secondary">{user.email}</p>
                            </div>
                        </div>
                        <Button
                            onClick={() => signOut()}
                            variant="ghost"
                            size="sm"
                            className="text-warm-danger hover:bg-warm-danger/10 hover:text-warm-danger"
                        >
                            <LogOut size={15} aria-hidden="true" />
                            Déconnexion
                        </Button>
                    </div>

                    <Tabs defaultValue="profile">
                        <TabsList className="mb-2 w-full">
                            <TabsTrigger value="profile" className="flex-1">
                                Informations
                            </TabsTrigger>
                            <TabsTrigger value="shoppingList" className="flex-1">
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
