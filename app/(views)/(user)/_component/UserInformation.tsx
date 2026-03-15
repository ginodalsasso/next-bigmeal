import { CalendarRange, Edit, IdCard, Mail, ShieldCheck, UserCog} from "lucide-react";
import { Button } from "@/components/ui/button";
import ResetPasswordForm from "./ResetPasswordForm";
import DeleteProfile from "./DeleteProfile";
import ChangeEmailForm from "./ChangeEmailForm";
import IsAdmin from "@/components/isAdmin";
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
                <>
                    {/* Infos personnelles */}
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
                            <div className="card-content space-y-4 p-4">
                                <div className="flex items-center align-middle">
                                    <Mail
                                        className="mr-3 text-zinc-500"
                                        size={20}
                                        aria-hidden="true"
                                    />
                                    <div>
                                        <p className="text-zinc-500">
                                            Adresse e-mail
                                        </p>
                                        <div className="flex items-center">
                                            <p className="font-medium text-zinc-900">
                                                {user.email}
                                            </p>
                                            <button
                                                onClick={() =>
                                                    setIsChangedEmail(true)
                                                }
                                                aria-label="Modifier l'adresse e-mail"
                                                className="ml-3 rounded text-orange-500 hover:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                                            >
                                                <Edit size={18} aria-hidden="true" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <ShieldCheck
                                        className="mr-3 text-zinc-500"
                                        size={20}
                                        aria-hidden="true"
                                    />
                                    <div>
                                        <p className="text-sm text-zinc-500">
                                            Rôle
                                        </p>
                                        <p className="font-medium text-zinc-900">
                                            {user.role === "ADMIN"
                                                ? "Administrateur"
                                                : "Utilisateur"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <CalendarRange
                                        className="mr-3 text-zinc-500"
                                        size={20}
                                        aria-hidden="true"
                                    />
                                    <div>
                                        <p className="text-sm text-zinc-500">
                                            Date d&apos;inscription
                                        </p>
                                        <p className="font-medium text-zinc-900">
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
                        <div className="grid gap-4 md:grid-cols-2">
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
                </>
            )}
        </>
    );
};

export default UserInformation;
