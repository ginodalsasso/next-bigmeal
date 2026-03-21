"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    const router = useRouter();

    return (
        <main className="flex min-h-screen items-center justify-center bg-white px-4 py-16 dark:bg-gray-950">
            <section
                className="w-full max-w-md text-center"
                aria-labelledby="notfound-title"
                aria-describedby="notfound-desc"
            >
                <div className="mb-6" role="alert" aria-live="polite">
                    <h1
                        id="notfound-code"
                        className="text-5xl font-extrabold text-gray-800 dark:text-gray-100"
                    >
                        404
                    </h1>
                </div>

                <h2
                    id="notfound-title"
                    className="mb-3 text-xl font-semibold text-gray-800 dark:text-gray-100"
                >
                    Page introuvable
                </h2>

                <p
                    id="notfound-desc"
                    className="mb-8 text-gray-600 dark:text-gray-400"
                >
                    La page que vous cherchez n&apos;existe pas ou a été supprimée.
                    Vous pouvez retourner à la page d’accueil ou revenir à la page précédente.
                </p>

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Button
                        onClick={() => router.back()}
                        variant="outline"
                        className="flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        aria-label="Retour à la page précédente"
                    >
                        <ArrowLeft className="size-4" aria-hidden="true" />
                        Retour
                    </Button>

                    <Link href="/" passHref>
                        <Button
                            variant="default"
                            className="flex w-full items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                            aria-label="Aller à la page d’accueil"
                        >
                            <Home className="size-4" aria-hidden="true" />
                            Accueil
                        </Button>
                    </Link>
                </div>
            </section>
        </main>
    );
}
