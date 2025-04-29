"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{
        outcome: "accepted" | "dismissed";
        platform: string;
    }>;
}

export default function InstallPrompt() {
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);
    const [deferredPrompt, setDeferredPrompt] =
        useState<BeforeInstallPromptEvent | null>(null);
    const [showIOSInstructions, setShowIOSInstructions] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);

        // Vérifier si l'application est sur iOS
        const isAppleDevice =
            /iPad|iPhone|iPod/.test(navigator.userAgent) &&
            !("MSStream" in window);
        setIsIOS(isAppleDevice);

        // Vérifier si l'application est déjà installée
        setIsStandalone(
            window.matchMedia("(display-mode: standalone)").matches
        );

        // Intercepter l'événement beforeinstallprompt pour les appareils non-iOS
        const handleBeforeInstallPrompt = (e: Event) => {
            // Empêcher Chrome d'afficher automatiquement l'invite
            e.preventDefault();
            // Stocker l'événement pour pouvoir le déclencher plus tard
            setDeferredPrompt(e as BeforeInstallPromptEvent);
        };

        window.addEventListener(
            "beforeinstallprompt",
            handleBeforeInstallPrompt
        );

        return () => {
            window.removeEventListener(
                "beforeinstallprompt",
                handleBeforeInstallPrompt
            );
        };
    }, []);

    const installApp = async () => {
        if (deferredPrompt) {
            // Afficher l'invite d'installation
            deferredPrompt.prompt();

            // Attendre que l'utilisateur réponde à l'invite
            const { outcome } = await deferredPrompt.userChoice;

            console.log(`Réponse: ${outcome}`);

            // On a utilisé l'invite, donc on ne peut plus l'utiliser
            setDeferredPrompt(null);
        } else if (isIOS) {
            // Sur iOS, afficher les instructions d'installation
            setShowIOSInstructions(true);
        }
    };

    // Ne rien afficher pendant le rendu côté serveur ou si l'app est déjà installée
    if (!isClient || isStandalone) {
        return null;
    }

    return (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-neutral-900 p-4 shadow-lg">
            <div className="flex flex-col space-y-2">
                <h3 className="text-lg font-semibold">Installer l&apos;appli</h3>

                {isIOS ? (
                    <div>
                        <Button
                            variant="edit"
                            className="w-full"
                            onClick={installApp}
                        >
                            Comment installer
                        </Button>

                        {showIOSInstructions && (
                            <div className="mt-2 rounded-lg bg-gray-100 p-3">
                                <p className="text-sm">
                                    Pour installer cette application sur votre
                                    appareil iOS :
                                </p>
                                <ol className="mt-2 list-decimal pl-5 text-sm">
                                    <li>
                                        Appuyez sur le bouton Partager{" "}
                                        <span className="font-bold">⎋</span>
                                    </li>
                                    <li>
                                        Faites défiler et appuyez sur{" "}
                                        <span className="font-bold">
                                            Sur l&apos;écran d&apos;accueil&quot;
                                        </span>
                                    </li>
                                    <li>
                                        Appuyez sur{" "}
                                        <span className="font-bold">
                                            Ajouter&quot;
                                        </span>{" "}
                                        en haut à droite
                                    </li>
                                </ol>
                            </div>
                        )}
                    </div>
                ) : (
                    <Button
                        onClick={installApp}
                        variant={`${
                            deferredPrompt
                                ? "outline"
                                : "edit"
                        }`}
                        className="w-full"
                        disabled={!deferredPrompt}
                    >
                        Ajouter à l&apos;écran d&apos;accueil
                    </Button>
                )}
            </div>
        </div>
    );
}
