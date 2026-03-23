import { CalendarRange, Edit, IdCard, Mail, ShieldCheck, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import ResetPasswordForm from "./ResetPasswordForm";
import DeleteProfile from "./DeleteProfile";
import ChangeEmailForm from "./ChangeEmailForm";
import IsAdmin from "@/components/auth/isAdmin";
import Link from "next/link";
import { dateToString } from "@/lib/utils";
import { UserType } from "@/lib/types/schemas_interfaces";

interface UserInformationProps {
    user: UserType;
    isChangedPassword: boolean;
    setIsChangedPassword: (val: boolean) => void;
    isChangedEmail: boolean;
    setIsChangedEmail: (val: boolean) => void;
    updateEmail: (newEmail: string) => void;
}

const UserInformation = ({
    user,
    isChangedPassword,
    setIsChangedPassword,
    isChangedEmail,
    setIsChangedEmail,
    updateEmail,
}: UserInformationProps) => {

    return (
        <>
            {isChangedPassword ? (
                <ResetPasswordForm onBackToProfile={() => setIsChangedPassword(false)} />
            ) : (
                <div className="space-y-4">

                    {/* Informations personnelles */}
                    <div className="card">
                        <h2 className="h2-title">
                            <IdCard className="h2-icons" />
                            Informations personnelles
                        </h2>

                        {isChangedEmail ? (
                            <ChangeEmailForm
                                user={user}
                                onSubmit={updateEmail}
                                onBackToProfile={() => setIsChangedEmail(false)}
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
                                                onClick={() => setIsChangedEmail(true)}
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

                    {/* Actions du compte */}
                    <div className="card">
                        <h2 className="h2-title">
                            <UserCog className="h2-icons" />
                            Actions du compte
                        </h2>
                        <div className="grid gap-3 md:grid-cols-2">
                            <Button
                                variant="edit"
                                onClick={() => setIsChangedPassword(true)}
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
            )}
        </>
    );
};

export default UserInformation;
