"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";

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
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        setIsClient(true);

        // Vérifier si l'application est sur iOS
        const isAppleDevice =
            /iPad|iPhone|iPod/.test(navigator.userAgent) &&
            !("MSStream" in window);
        setIsIOS(isAppleDevice);

        setIsStandalone(
            window.matchMedia("(display-mode: standalone)").matches ||
            ("standalone" in navigator && (navigator as Navigator & { standalone: boolean }).standalone === true)
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
    if (!isClient || isStandalone || isDismissed) {
        return null;
    }

    return (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-warm-border bg-warm-base p-4 shadow-lg">
            <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-warm-primary">Installer l&apos;appli</h3>
                    <button
                        onClick={() => setIsDismissed(true)}
                        aria-label="Fermer"
                        className="rounded-lg p-1 text-warm-secondary hover:bg-warm-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-accent"
                    >
                        <X size={18} aria-hidden="true" />
                    </button>
                </div>

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
                            <div className="mt-2 rounded-lg border border-warm-border bg-warm-subtle p-3">
                                <p className="text-sm text-warm-primary">
                                    Pour installer cette application sur votre
                                    appareil iOS :
                                </p>
                                <ol className="mt-2 list-decimal pl-5 text-sm text-warm-secondary">
                                    <li>
                                        Appuyez sur le bouton Partager
                                    </li>
                                    <li>
                                        Faites défiler et appuyez sur{" "}
                                        <span className="font-bold">
                                            &quot;Sur l&apos;écran d&apos;accueil&quot;
                                        </span>
                                    </li>
                                    <li>
                                        Appuyez sur{" "}
                                        <span className="font-bold">
                                            &quot;Ajouter&quot;
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
                        // disabled={!deferredPrompt}
                    >
                        Ajouter à l&apos;écran d&apos;accueil
                    </Button>
                )}
            </div>
        </div>
    );
}
