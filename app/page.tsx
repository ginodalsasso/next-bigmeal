'use client';

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return; // Attendre que la session soit chargée
        if (!session) {
            router.push("/login"); // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
        }
    }, [session, status, router]);

    return (
        <div>
            <h1>Home</h1>
        </div>
    );
}
