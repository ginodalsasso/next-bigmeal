import { NextResponse } from "next/server";
import webpush from "web-push";

interface NotificationPayload {
    title?: string;
    body?: string;
    icon?: string;
    badge?: string;
    url?: string;
}

interface RequestBody {
    subscription: webpush.PushSubscription;
    title?: string;
    message?: string;
}

// Configurer les clés VAPID
webpush.setVapidDetails(
    "mailto:" + (process.env.VAPID_MAILTO || "example@example.com"),
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || "",
    process.env.VAPID_PRIVATE_KEY || ""
);

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const body: RequestBody = await request.json();
        const { subscription, title, message } = body;

        if (!subscription) {
            return NextResponse.json(
                { success: false, error: "Subscription not provided" },
                { status: 400 }
            );
        }

        const payload: NotificationPayload = {
            title: title || "Nouvelle notification",
            body: message || "Bienvenue sur Big Meal !",
            icon: "/icon-192x192.png",
            badge: "/icon-72x72.png",
        };

        await webpush.sendNotification(subscription, JSON.stringify(payload));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(
            "Error sending notification:",
            error instanceof Error ? error.message : String(error)
        );
        return NextResponse.json(
            { success: false, error: "Failed to send notification" },
            { status: 500 }
        );
    }
}
