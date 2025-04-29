"use client";

// Bibliothèques tierces
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

// Hooks personnalisés
import { useFormValidation } from "@/app/hooks/useFormValidation";

// Composants UI
import { Button } from "@/components/ui/button";
import FormErrorMessage from "@/components/forms/FormErrorMessage";
import ForgotPasswordForm from "../_component/ForgotPasswordEmailForm";

// Contraintes
import { LoginConstraints } from "@/lib/constraints/forms_constraints";


export default function LoginPage() {
    
    const router = useRouter();
    const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false); // Affichage conditionnel des formulaires
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    
    // Utilisation du hook de validation
    const { error, setError, validate } = useFormValidation(
        LoginConstraints,
        ["email", "password"] // Liste des champs à valider
    );

    // Fonction pour se connecter avec les identifiants
    const credentialsAction = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email")?.toString() || "";
        const password = formData.get("password")?.toString() || "";

        // Validation via le hook
        const isValid = validate({ email, password });
        if (!isValid) return;

        setIsLoading(true);

        try {
            const response = await signIn("credentials", {
                redirect: true,
                email,
                password,
            });

            if (response?.error) {
                setError({ general: response.error || "Une erreur est survenue lors de la connexion." });
            }
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            setError({ general: "Impossible de se connecter. Veuillez réessayer plus tard." });
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="flex min-h-screen items-center justify-center px-4 py-12">
            <div className="w-full max-w-md rounded-xl bg-white p-4 transition-all duration-300">            {/* Affichage conditionnel des formulaires */}
                <div className={`transition-all duration-300 ${isForgotPassword ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}>
                    {isForgotPassword && (
                        <ForgotPasswordForm onBackToLogin={() => setIsForgotPassword(false)} />
                    )}
                </div>

                <div className={`transition-all duration-300 ${!isForgotPassword ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}>
                    {!isForgotPassword && (
                        <div className="space-y-6">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-gray-900">Bienvenue</h2>
                                <p className="mt-2 text-sm text-gray-600">Connectez-vous pour accéder à votre compte</p>
                            </div>
                            <FormErrorMessage message={error?.general} />

                            {/* Formulaire de connexion */}
                            <form onSubmit={credentialsAction} className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block font-medium text-gray-700">
                                        Adresse email
                                    </label>
                                    <div className="mt-1 shadow-sm">
                                        <input
                                            className="input-text-select"
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="email@exemple.com"
                                            required
                                            autoComplete="email"
                                            autoFocus
                                        />
                                    </div>
                                    <FormErrorMessage message={error?.email} />
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block font-medium text-gray-700">
                                            Mot de passe
                                        </label>

                                        {/* Lien mot de passe oublié pour afficher le formulaire de réinitialisation */}
                                        <Button 
                                            type="button" 
                                            variant="link" 
                                            className="text-xs font-medium text-blue-600 hover:text-blue-800" 
                                            onClick={() => {
                                                setIsForgotPassword(true);
                                            }}
                                        >
                                            Mot de passe oublié ?
                                        </Button>
                                    </div>

                                    <div className="mt-1">
                                        <input
                                            className="input-text-select"
                                            type="password"
                                            id="password"
                                            name="password"
                                            placeholder="••••••••"
                                            required
                                            autoComplete="current-password"
                                        />
                                    </div>
                                    <FormErrorMessage message={error?.password} />
                                </div>

                                {/* Bouton de connexion */}
                                <div>
                                    <Button 
                                        type="submit" 
                                        className="w-full"
                                        disabled={isLoading} 
                                        variant={isLoading ? "ghost" : "success"}
                                    >
                                        {isLoading ? "Connexion..." : "Se connecter"}
                                    </Button>
                                </div>
                            </form>

                            <div className="mt-6">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="bg-white px-2 text-gray-500">Ou continuer avec</span>
                                    </div>
                                </div>

                                { /* Connexion avec Google et GitHub */}
                                <div className="mt-6 grid grid-cols-2 gap-3">
                                    <Button 
                                        variant="outline" 
                                        onClick={() => signIn("google")} 
                                        className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                                    >
                                        <svg className="mr-2 size-5" viewBox="0 0 24 24">
                                            <path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"/>
                                            <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163129 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"/>
                                            <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"/>
                                            <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"/>
                                        </svg>
                                        Google
                                    </Button>

                                    <Button 
                                        variant="outline" 
                                        onClick={() => signIn("github")} 
                                        className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                                    >
                                        <svg className="mr-2 size-5" viewBox="0 0 24 24" fill="currentColor">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.481C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                                        </svg>
                                        GitHub
                                    </Button>
                                </div>
                            </div>

                            {/* Lien création de compte */}
                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-600">
                                    Pas encore de compte ?{" "}
                                    <Button
                                        variant="link"
                                        onClick={() => router.push("/register")}
                                        className="font-medium text-blue-600 hover:text-blue-500"
                                    >
                                        Créer un compte
                                    </Button>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}