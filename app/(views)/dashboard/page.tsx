"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link"


export default function AuthComponent() {
    const { data: session } = useSession();


    if (session?.user.role === "ADMIN") {
        return (
            <>
                <h1>Welcome {session?.user?.role}</h1>
                <button onClick={() => signOut()}> 
                    Déconnexion
                </button>

                
            </>
        );
    }

    return (
        <>
            <Link href="/login">
                    <button>Connexion</button >
            </Link >      
        </>
    );
}
