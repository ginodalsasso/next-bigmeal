"use client";

import Link from "next/link";
import { ShieldOff, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function BlockedPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-white px-4 py-16">
            <section
                className="w-full max-w-md text-center"
                aria-labelledby="blocked-title"
                aria-describedby="blocked-desc"
            >
                <div className="mb-6 flex justify-center">
                    <div className="flex size-16 items-center justify-center rounded-full bg-warm-danger/10">
                        <ShieldOff className="size-8 text-warm-danger" aria-hidden="true" />
                    </div>
                </div>

                <h1
                    id="blocked-title"
                    className="mb-3 text-xl font-semibold text-zinc-900"
                >
                    Accès refusé
                </h1>

                <p
                    id="blocked-desc"
                    className="mb-8 text-zinc-600"
                >
                    Votre compte n&apos;est pas encore approuvé ou a été suspendu.
                    Si vous pensez qu&apos;il s&apos;agit d&apos;une erreur, contactez un administrateur.
                </p>

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Button asChild variant="outline">
                        <Link href="/">
                            Retour à l&apos;accueil
                        </Link>
                    </Button>

                    <Button
                        variant="delete"
                        onClick={() => signOut({ callbackUrl: "/login" })}
                        aria-label="Se déconnecter"
                    >
                        <LogOut className="size-4" aria-hidden="true" />
                        Se déconnecter
                    </Button>
                </div>
            </section>
        </main>
    );
}
