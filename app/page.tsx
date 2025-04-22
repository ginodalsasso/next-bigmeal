"use client";

import InstallPrompt from "@/components/pwa/InstallPrompt";

export default function InstallPage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">PWA Installation</h1>
            <div className="space-y-8">
                {/* <PushNotificationManager /> */}
                <InstallPrompt />
            </div>
        </div>
    );
}