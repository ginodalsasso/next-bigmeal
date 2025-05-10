"use client";

import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { UserType } from "@/lib/types/schemas_interfaces";
import { dateToString } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import DeleteProfile from "../_component/DeleteProfile";
import ResetPasswordForm from "../_component/ResetPasswordForm";
import { fetchUserProfileAPI } from "@/lib/services/user_service";
import ShoppingLists from "../_component/ShoppingLists";
import Link from "next/link";
import IsAdmin from "@/components/isAdmin";
import LoadingSpinner from "@/components/layout/LoadingSpinner";
import { CalendarRange, Edit, LogOut, Mail, ShieldCheck, User } from "lucide-react";
import ChangeEmailForm from "../_component/ChangeEmailForm";

const ProfilePage = () => {
    // États existants
    const [user, setUser] = useState<UserType>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [isChangedPassword, setIsChangedPassword] = useState<boolean>(false);
    const [isChangedEmail, setIsChangedEmail] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<'profile' | 'shoppingList'>('profile');

    // Logique existante
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

    // Composant principal avec nouvelle mise en page
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

                    {/* Onglets de navigation */}
                    <div className="mb-6 flex justify-between border-b">
                        <button
                            className={`px-6 py-3 font-medium ${
                                activeTab === 'profile' 
                                    ? 'border-b-2 border-emerald-500 text-emerald-600' 
                                    : 'text-gray-500 hover:text-gray-800'
                            }`}
                            onClick={() => setActiveTab('profile')}
                        >
                            Informations
                        </button>
                        <button
                            className={`px-6 py-3 font-medium ${
                                activeTab === 'shoppingList' 
                                    ? 'border-b-2 border-emerald-500 text-emerald-600' 
                                    : 'text-gray-500 hover:text-gray-800'
                            }`}
                            onClick={() => setActiveTab('shoppingList')}
                        >
                            Listes de courses
                        </button>
                    </div>

                    {activeTab === 'profile' ? (
                        <div>
                            {/* Informations personnelles */}
                            <div className="mb-6 rounded-lg bg-white p-6">
                                <h2 className="mb-4 text-xl font-semibold text-gray-800">Informations personnelles</h2>
                                
                                {isChangedEmail ? (
                                    <ChangeEmailForm
                                        user={user}
                                        onSubmit={updateEmail}
                                        onBackToProfile={() => setIsChangedEmail(false)}
                                    />
                                ) : (
                                    <div className="space-y-4">
                                        <div className="flex items-center align-middle">
                                            <Mail className="mr-3 text-gray-500" size={20} />
                                            <div>
                                                <p className=" text-gray-500">Adresse e-mail</p>
                                                <div className="flex items-center">
                                                    <p className="font-medium text-black">{user.email}</p>
                                                    <button 
                                                        onClick={() => setIsChangedEmail(true)}
                                                        className="ml-3 text-emerald-500 hover:text-emerald-600"
                                                    >
                                                        <Edit/>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center">
                                            <ShieldCheck className="mr-3 text-gray-500" size={20} />
                                            <div>
                                                <p className="text-sm text-gray-500">Rôle</p>
                                                <p className="font-medium text-black">
                                                    {user.role === 'ADMIN' ? 'Administrateur' : 'Utilisateur'}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center">
                                            <CalendarRange className="mr-3 text-gray-500" size={20} />
                                            <div>
                                                <p className="text-sm text-gray-500">Date d&apos;inscription</p>
                                                <p className="font-medium text-black">{dateToString(user.createdAt)}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            {/* Actions du compte */}
                            <div className="rounded-lg bg-white p-6 shadow-sm">
                                <h2 className="mb-4 text-xl font-semibold text-gray-800">Actions du compte</h2>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <Button 
                                        variant="edit" 
                                        onClick={() => setIsChangedPassword(true)}
                                        className="w-full"
                                    >
                                        Changer mon mot de passe
                                    </Button>
                                    
                                    <IsAdmin>
                                        <Button 
                                            variant="default"
                                            className="w-full"
                                        >
                                            <Link href="/dashboard">Accéder au dashboard</Link>
                                        </Button>
                                    </IsAdmin>
                                    
                                    <DeleteProfile userId={user.id} />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-lg bg-white p-6 shadow-sm">
                            {/* Composant ShoppingLists avec style amélioré */}
                            <ShoppingLists shoppingLists={user.shoppingList} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProfilePage;