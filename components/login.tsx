"use client";
import { signIn } from "next-auth/react";

export default function Login() {
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
                <input type="email" id="email" name="email" required />

                <label htmlFor="password">Mot de passe</label>
                <input type="password" id="password" name="password" required />
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
}
