"use client";

import { useState, useEffect } from "react";

// fonction utilitaire pour convertir une chaîne base64 en Uint8Array pour la clé publique VAPID
function urlBase64ToUint8Array(base64String: string) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64); // Décoder la chaîne base64
    const outputArray = new Uint8Array(rawData.length);


    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export default function PushNotificationManager() {
    const [isSupported, setIsSupported] = useState(false);
    const [subscription, setSubscription] = useState<PushSubscription | null>(null);
    const [message, setMessage] = useState("");
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        // Vérifier si le navigateur supporte les notifications push et le service worker
        if (
            typeof window !== "undefined" &&
            "serviceWorker" in navigator &&
            "PushManager" in window
        ) {
            setIsSupported(true);
            registerServiceWorker(); // Enregistrer le service worker
        }
    }, []);


    // Fonction pour enregistrer le service worker
    async function registerServiceWorker() {
        try {
            const registration = await navigator.serviceWorker.register(
                "/sw.js",
                {
                    scope: "/", // Définir le scope du service worker
                }
            );
            console.log(
                "Service Worker registered with scope:",
                registration.scope
            );

            const currentSubscription =
                await registration.pushManager.getSubscription(); // Vérifier si l'utilisateur est déjà abonné
            setSubscription(currentSubscription); 
        } catch (error) {
            console.error("registerServiceWorker", error);
        }
    }

    // Fonction pour s'abonner aux notifications push
    async function subscribeToPush() {
        try {
            const registration = await navigator.serviceWorker.ready; // S'assurer que le service worker est prêt
            const sub = await registration.pushManager.subscribe({ // Demander la souscription à l'utilisateur
                userVisibleOnly: true, 
                applicationServerKey: urlBase64ToUint8Array(
                    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || ""
                ),
            });

            setSubscription(sub); // Mettre à jour l'état local

            // Envoyer la souscription au serveur
            await saveSubscription(sub);
        } catch (error) {
            console.error("subscribeToPush", error);
        }
    }

    // Fonction pour enregistrer la souscription sur le serveur
    async function saveSubscription(subscription: PushSubscription) {
        try {
            await fetch("/api/save-subscription", { // ROUTE A CREER
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(subscription),
            });
        } catch (error) {
            console.error("[API_ERROR] saveSubscription", error);
            throw error;          
        }
    }

    // async function unsubscribeFromPush() {
    //     try {
    //         if (subscription) {
    //             await subscription.unsubscribe(); // Annuler la souscription
    //             setSubscription(null); // Mettre à jour l'état local

    //             // Supprimer la souscription du serveur
    //             await fetch("/api/delete-subscription", { // ROUTE A CREER
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify({ 
    //                     endpoint: subscription.endpoint 
    //                 }),
    //             });
    //         }
    //     } catch (error) {
    //         console.error("[API_ERROR] unsubscribeFromPush", error);
    //         throw error;
    //     }
    // }

    async function sendTestNotification() {
        if (subscription) {
            try {
                await fetch("/api/send-notification", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        subscription: JSON.parse(JSON.stringify(subscription)),
                        title: "Test Notification", // PROVISOIRE
                        message: message
                    }),
                });
                setMessage("");
            } catch (error) {
                console.error("[API_ERROR] sendTestNotification", error);
                throw error;            
            }
        }
    }

    if (!isClient) {
        return null;
    }

    if (!isSupported) {
        return (
            <p className="text-red-500">
                Notifications Push ne sont pas supportées par ce navigateur.
            </p>
        );
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Push Notifications</h3>
            {subscription ? (
                <div className="space-y-4">
                    <p className="text-green-600">
                        You are subscribed to push notifications.
                    </p>
                    <div className="space-y-2">
                        <input
                            type="text"
                            placeholder="Enter notification message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                        <div className="flex space-x-2">
                            <button
                                onClick={sendTestNotification}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Send Test Notification
                            </button>
                            <button
                                // onClick={unsubscribeFromPush}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Unsubscribe
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <p className="mb-4">
                        You are not subscribed to push notifications.
                    </p>
                    <button
                        onClick={subscribeToPush}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Subscribe to Notifications
                    </button>
                </div>
            )}
        </div>
    );
}
