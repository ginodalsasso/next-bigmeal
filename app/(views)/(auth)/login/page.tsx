'use client';

// import { Button } from "@/components/ui/button";
// import { RegisterConstraints } from "@/lib/constraints/forms_constraints";
// import { UserFormErrorType } from "@/lib/types/forms_interfaces";
// import { useRouter } from "next/navigation";
// // import { useRouter } from "next/navigation";
// import { FormEvent, useState } from "react";
// import { toast } from "sonner";

// export default function LoginPage() {

//     // __________________ HOOKS __________________
//     const router = useRouter();
//     const [error, setError] = useState<UserFormErrorType>({});
//     const [isLoading, setIsLoading] = useState(false);


//     // _________________________ LOGIQUE _________________________
//     async function handleSubmit(event: FormEvent<HTMLFormElement>) {
//         event.preventDefault();
    
//         const formData = new FormData(event.currentTarget);
//         const username = formData.get("username")?.toString();
//         const password = formData.get("password")?.toString();
    
//         // Valider les données du formulaire avec zod
//         const validationResult = RegisterConstraints.safeParse({ username, password });
//         if (!validationResult.success) {
//             const errors = validationResult.error.flatten().fieldErrors;
//             setError({
//                 username: errors.username?.[0],
//                 password: errors.password?.[0],
//             });
//             return;
//         }

//         if(username === "" || password === "") {
//             setError({
//                 general: "Veuillez remplir tous les champs.",
//             });
//             return;
//         }
    
//         setIsLoading(true);
//         setError({}); // Réinitialiser les erreurs
    
//         try {
//             const response = await fetch("/api/auth/login", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ username, password }),
//             });
    
//             if (response.ok) {
//                 window.location.href = "/ingredients";
//                 toast.success(`Bienvenue ${username} :)`);
//             } else {
//                 const errorData = await response.json();
//                 setError({
//                     general: errorData.message || "Une erreur est survenue lors de la connexion.",
//                 });
//             }
//         } catch (error) {
//             console.error("Erreur lors de la connexion :", error);
//             setError({ general: "Impossible de se connecter. Veuillez réessayer plus tard." });
//         } finally {
//             setIsLoading(false);
//         }
//     }

//     // _________________________ RENDU _________________________
//     return (
//         <form 
//             className="border px-4 py-8 mx-auto mt-[10%] sm:w-[400px] flex flex-col gap-2" 
//             onSubmit={handleSubmit}
//         >
//             {error.general && (
//                 <p className="error-form">
//                     {error.general}
//                 </p>
//             )}
//             <input 
//                 className="input-text-select" 
//                 type="text" 
//                 name="username" 
//                 placeholder="Pseudo" 
//                 required 
//             />
//             {error.username && (
//                 <p className="error-form">
//                     {error.username}
//                 </p>
//             )}

//             <input
//                 className="input-text-select"
//                 type="password"
//                 name="password"
//                 placeholder="Mot de passe"
//                 required
//             />
//             {error.password && (
//                 <p className="error-form">
//                     {error.password}
//                 </p>
//             )}

//             <Button
//                 type="submit"
//                 disabled={isLoading}
//                 variant={isLoading ? "ghost" : "success"}
//             >
//                 {isLoading ? "Connexion..." : "Se connecter"}
//             </Button>
//             <Button
//                 variant="link"
//                 onClick={() => router.push("/register")}
//             >
//                 S&apos;inscrire
//             </Button>
//         </form>
//     );
// }

"use client";
import { auth } from "@/lib/auth";
import { signIn } from "next-auth/react";

export default function LoginPage() {
    const credentialsAction = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
        });
    };

    return (
        <div>
            <button onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>
                Se connecter avec Google
            </button>
            <button onClick={() => signIn("github", { callbackUrl: "/dashboard" })}>
                Se connecter avec GitHub
            </button>

            <form onSubmit={credentialsAction}>
                <label htmlFor="email">Email</label>
                <input className="text-black" type="email" id="email" name="email" required />

                <label htmlFor="password">Mot de passe</label>
                <input className="text-black" type="password" id="password" name="password" required />
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
}
