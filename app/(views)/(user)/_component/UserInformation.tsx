"use client";

import { useState } from "react";
import { CalendarRange, Edit, IdCard, Mail, ShieldCheck, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import ResetPasswordForm from "./ResetPasswordForm";
import DeleteProfile from "./DeleteProfile";
import ChangeEmailForm from "./ChangeEmailForm";
import IsAdmin from "@/components/auth/isAdmin";
import Link from "next/link";
import { dateToString } from "@/lib/utils";

type UserInformationProps = {
    user: { id: string; email: string; role: string; createdAt: Date };
    onEmailUpdate: (newEmail: string) => void;
};

const UserInformation = ({ user, onEmailUpdate }: UserInformationProps) => {
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [isChangingEmail, setIsChangingEmail] = useState(false);

    if (isChangingPassword) {
        return <ResetPasswordForm onBackToProfile={() => setIsChangingPassword(false)} />;
    }

    return (
        <div className="space-y-4">

            <div className="card">
                <h2 className="h2-title">
                    <IdCard className="h2-icons" />
                    Informations personnelles
                </h2>

                {isChangingEmail ? (
                    <ChangeEmailForm
                        user={user}
                        onSubmit={(newEmail) => { onEmailUpdate(newEmail); setIsChangingEmail(false); }}
                        onBackToProfile={() => setIsChangingEmail(false)}
                    />
                ) : (
                    <div className="card-content divide-y divide-warm-border">

                        <div className="flex items-center gap-3 p-3">
                            <Mail size={18} className="shrink-0 text-warm-secondary" aria-hidden="true" />
                            <div className="min-w-0 flex-1">
                                <p className="text-xs text-warm-secondary">Adresse e-mail</p>
                                <div className="flex items-center gap-2">
                                    <p className="truncate text-sm font-medium text-warm-primary">
                                        {user.email}
                                    </p>
                                    <button
                                        onClick={() => setIsChangingEmail(true)}
                                        aria-label="Modifier l'adresse e-mail"
                                        className="shrink-0 rounded text-warm-accent hover:text-warm-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-accent"
                                    >
                                        <Edit size={15} aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3">
                            <ShieldCheck size={18} className="shrink-0 text-warm-secondary" aria-hidden="true" />
                            <div>
                                <p className="text-xs text-warm-secondary">Rôle</p>
                                <p className="text-sm font-medium text-warm-primary">
                                    {user.role === "ADMIN" ? "Administrateur" : "Utilisateur"}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3">
                            <CalendarRange size={18} className="shrink-0 text-warm-secondary" aria-hidden="true" />
                            <div>
                                <p className="text-xs text-warm-secondary">Membre depuis</p>
                                <p className="text-sm font-medium text-warm-primary">
                                    {dateToString(user.createdAt)}
                                </p>
                            </div>
                        </div>

                    </div>
                )}
            </div>

            <div className="card">
                <h2 className="h2-title">
                    <UserCog className="h2-icons" />
                    Actions du compte
                </h2>
                <div className="grid gap-3 md:grid-cols-2">
                    <Button
                        variant="edit"
                        onClick={() => setIsChangingPassword(true)}
                        className="w-full"
                    >
                        Changer mon mot de passe
                    </Button>

                    <IsAdmin>
                        <Button asChild variant="default" className="w-full">
                            <Link href="/dashboard">
                                Accéder au dashboard
                            </Link>
                        </Button>
                    </IsAdmin>

                    <DeleteProfile userId={user.id} />
                </div>
            </div>

        </div>
    );
};

export default UserInformation;
