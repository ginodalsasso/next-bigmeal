"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <div className="w-full max-w-md p-8">
                <h1 className="text-center text-4xl font-extrabold text-white">
                    404
                </h1>

                <p className="mt-2 text-center text-2xl font-semibold text-white">
                    Page introuvable
                </p>

                <p className="mt-4 text-center text-white">
                    Désolé, la page que vous recherchez semble avoir disparu ou n&apos;existe pas.
                </p>

                <div className="mt-8">
                    <Button
                        onClick={() => router.back()}
                        variant="default"
                        className="flex w-full items-center justify-center"
                    >
                        <ArrowLeft className="size-4" />
                        <span>Retour à la page précédente</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
