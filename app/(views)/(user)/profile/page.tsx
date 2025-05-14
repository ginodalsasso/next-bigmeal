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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import UserInformation from "../_component/UserInformation";

const ProfilePage = () => {
    const [user, setUser] = useState<UserType>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [isChangedPassword, setIsChangedPassword] = useState<boolean>(false);
    const [isChangedEmail, setIsChangedEmail] = useState<boolean>(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                fetchUserProfileAPI().then((data) => setUser(data));
            } catch (error) {
                console.error("Erreur lors de la récupération de l'utilisateur :", error);
                setError("Impossible de charger le profil.");
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

    if (loading || !user) return <LoadingSpinner />;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="mx-auto">
            {isChangedPassword ? (
                <div className="rounded-lg shadow-md">
                    <ResetPasswordForm onBackToProfile={() => setIsChangedPassword(false)} />
                </div>
            ) : (
                <div>
                    {/* En-tête du profil */}
                    <div className="mb-6 flex flex-col items-center justify-between rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white">
                        <div className="mb-4 flex items-center md:mb-0">
                            <div className="mr-4 rounded-full bg-white p-3 text-emerald-500">
                                <User size={36} />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">Mon profil</h1>
                                <p className="text-emerald-100">{user.email}</p>
                            </div>
                        </div>
                        <Button
                            onClick={() => signOut()}
                            variant="ghost"
                            size="lg"
                        >
                            <LogOut className="mr-2"/>
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
                            <div className="rounded-lg bg-white p-6 shadow-sm">
                                <ShoppingLists shoppingLists={user.shoppingList} />
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;