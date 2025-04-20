// app/api/sendNotification/route.ts
import { NextResponse } from "next/server";
import webpush from "web-push";


webpush.setVapidDetails(
    `mailto:${process.env.EMAIL_USER}`,
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
);

export async function POST(req: Request) {
    const { subscription, message } = await req.json();

    try {
        await webpush.sendNotification(
            subscription,
            JSON.stringify({
                title: "Test Notification",
                body: message,
                icon: "/favicon/favicon192x192.png",
            })
        );
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error sending notification:", error);
        return NextResponse.json(
            { success: false, error: "Failed to send notification" },
            { status: 500 }
        );
    }
}
