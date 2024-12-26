'use client';

import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function LoginPage() {
    const router = useRouter();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const username = formData.get("username");
        const password = formData.get("password");

        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            router.push("/ingredients");
        } else {
            // Handle errors
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="Pseudo" required />
            <input
                type="password"
                name="password"
                placeholder="Password"
                required
            />
            <button type="submit">Login</button>
        </form>
    );
}
