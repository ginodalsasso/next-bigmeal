"use client";

import { useState, useEffect, Suspense } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import { useFormValidation } from "@/app/hooks/useFormValidation";
import FormErrorMessage from "@/components/forms/FormErrorMessage";
import ForgotPasswordForm from "../_component/ForgotPasswordEmailForm";
import { LoginConstraints } from "@/lib/constraints/forms_constraints";
import PasswordInput from "@/components/forms/PasswordInput";
import LoadingSpinner from "@/components/layout/LoadingSpinner";

const OAUTH_ERROR_MESSAGES: Record<string, string> = {
    OAuthSignin: "Erreur lors de la connexion OAuth. Veuillez réessayer.",
    OAuthCallback: "Erreur de callback OAuth. Veuillez réessayer.",
    OAuthCreateAccount: "Impossible de créer le compte. Veuillez réessayer.",
    OAuthAccountNotLinked: "Cet email est déjà utilisé avec un autre fournisseur.",
    CredentialsSignin: "Email ou mot de passe incorrect.",
    Default: "Une erreur s'est produite lors de la connexion.",
};

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { status } = useSession();

    const callbackUrl = searchParams.get("callbackUrl") || "/";
    const urlError = searchParams.get("error");

    const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { error, setError, validate } = useFormValidation(
        LoginConstraints,
        ["email", "password"]
    );

    useEffect(() => {
        if (status === "authenticated") {
            router.replace(callbackUrl);
        }
    }, [status, router, callbackUrl]);

    useEffect(() => {
        if (urlError) {
            const message = OAUTH_ERROR_MESSAGES[urlError] ?? OAUTH_ERROR_MESSAGES.Default;
            setError({ general: message });
        }
    }, [urlError, setError]);

    const credentialsAction = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email")?.toString() || "";
        const password = formData.get("password")?.toString() || "";

        const isValid = validate({ email, password });
        if (!isValid) return;

        setIsLoading(true);

        try {
            const response = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (response?.error) {
                setError({ general: "Email ou mot de passe incorrect." });
            } else {
                router.push(callbackUrl);
            }
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            setError({ general: "Impossible de se connecter. Veuillez réessayer plus tard." });
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading || status === "loading") {
        return <LoadingSpinner />;
    }

    return (
        <div className="flex min-h-dvh flex-col items-center justify-center bg-white px-4 antialiased dark:bg-zinc-950">
            <div className="relative w-full max-w-sm">
                <div className={`absolute inset-0 z-10 transition-all duration-300 ${isForgotPassword ? 'translate-x-0 opacity-100' : 'pointer-events-none -translate-x-4 opacity-0'}`}>
                    {isForgotPassword && (
                        <ForgotPasswordForm onBackToLogin={() => setIsForgotPassword(false)} />
                    )}
                </div>

                <div className={`transition-all duration-300 ${!isForgotPassword ? 'z-10 translate-x-0 opacity-100' : 'pointer-events-none -z-10 translate-x-4 opacity-0'}`}>
                    {!isForgotPassword && (
                        <div className="space-y-6">
                            <div className="text-center">
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Bienvenue</h2>
                                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Connectez-vous pour accéder à votre compte</p>
                            </div>
                            <FormErrorMessage message={error?.general} />

                            <form onSubmit={credentialsAction} className="space-y-4">
                                <div className="space-y-1.5">
                                    <label htmlFor="email" className="block text-sm font-medium text-zinc-900 dark:text-zinc-50">
                                        Adresse email
                                    </label>
                                    <input
                                        className="block w-full rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-sm text-zinc-900 transition-colors placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-800 dark:text-zinc-50 dark:placeholder:text-zinc-600 dark:focus:border-zinc-50 dark:focus:ring-zinc-50"
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="email@exemple.com"
                                        required
                                        autoComplete="email"
                                        autoFocus
                                    />
                                    <FormErrorMessage message={error?.email} />
                                </div>

                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm font-medium text-zinc-900 dark:text-zinc-50">
                                            Mot de passe
                                        </label>
                                        <button
                                            type="button"
                                            className="text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                                            onClick={() => setIsForgotPassword(true)}
                                        >
                                            Mot de passe oublié ?
                                        </button>
                                    </div>
                                    <PasswordInput
                                        id="password"
                                        name="password"
                                        placeholder="••••••••"
                                        error={error?.password}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="mt-2 flex h-11 w-full items-center justify-center rounded-md bg-zinc-900 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                                >
                                    {isLoading ? "Connexion..." : "Se connecter"}
                                </button>
                            </form>

                            <div className="my-6 flex items-center">
                                <div className="grow border-t border-zinc-200 dark:border-zinc-800"></div>
                                <span className="mx-4 text-xs font-medium text-zinc-500 dark:text-zinc-400">Ou continuer avec</span>
                                <div className="grow border-t border-zinc-200 dark:border-zinc-800"></div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => signIn("google", { callbackUrl })}
                                    type="button"
                                    className="flex h-11 items-center justify-center rounded-md border border-zinc-200 bg-transparent px-4 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-900"
                                >
                                    <svg className="mr-2 size-5" viewBox="0 0 24 24">
                                        <path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"/>
                                        <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163129 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"/>
                                        <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"/>
                                        <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"/>
                                    </svg>
                                    Google
                                </button>

                                <button
                                    onClick={() => signIn("github", { callbackUrl })}
                                    type="button"
                                    className="flex h-11 items-center justify-center rounded-md border border-zinc-200 bg-transparent px-4 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-900"
                                >
                                    <svg className="mr-2 size-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.481C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                                    </svg>
                                    GitHub
                                </button>
                            </div>

                            <div className="mt-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
                                Pas encore de compte ?{" "}
                                <button
                                    type="button"
                                    onClick={() => router.push("/register")}
                                    className="font-medium text-zinc-900 transition-colors hover:underline dark:text-zinc-50"
                                >
                                    Créer un compte
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <LoginForm />
        </Suspense>
    );
}
