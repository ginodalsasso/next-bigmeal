// page.tsx (page d'accueil)
"use client";

import InstallPrompt from "@/components/pwa/InstallPrompt";
import IsNotAuthenticated from "@/components/isNotAuthenticated";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
    return (
        <section className="mt-10 flex flex-col items-center justify-center p-4">
            <h1 className="mb-6 text-2xl font-bold">Bienvenue sur Big-Meal</h1> 
            <IsNotAuthenticated>
                <div className="mb-8 max-w-md text-center">
                    <p className="mb-6">
                        Préparez vos listes de courses avec facilité.
                    </p>
                    
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Button variant="default">
                            <Link
                                href="/login"
                            >
                                Se connecter
                            </Link>
                        </Button>
                        <Button variant="secondary">

                            <Link
                                href="/register"
                            >
                                S&apos;inscrire
                            </Link>
                        </Button>
                    </div>
                </div>
                
                <InstallPrompt />
            </IsNotAuthenticated>
        </section>
    );
}
