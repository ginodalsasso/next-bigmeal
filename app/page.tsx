// page.tsx (page d'accueil)
"use client";

import InstallPrompt from "@/components/pwa/InstallPrompt";
import IsNotAuthenticated from "@/components/isNotAuthenticated";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
    return (
        <section className="flex min-h-dvh flex-col items-center justify-center bg-white px-4 py-12 antialiased dark:bg-zinc-950">
            <div className="w-full max-w-sm space-y-8 text-center">
                
                {/* En-tête simple et très lisible */}
                <div className="space-y-3">
                    <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Big-Meal
                    </h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Préparez vos listes de courses avec facilité.
                    </p>
                </div>

                <IsNotAuthenticated>
                    <div className="flex flex-col space-y-3">
                        <Button 
                            asChild 
                            className="h-11 w-full rounded-md bg-zinc-900 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                        >
                            <Link href="/login">Se connecter</Link>
                        </Button>

                        <Button 
                            asChild 
                            variant="outline" 
                            className="h-11 w-full rounded-md border border-zinc-200 bg-transparent text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-900"
                        >
                            <Link href="/register">Créer un compte</Link>
                        </Button>
                    </div>
                </IsNotAuthenticated>

                <div className="pt-4">
                    <InstallPrompt />
                </div>
            </div>
        </section>
    );
}
