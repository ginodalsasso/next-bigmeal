"use client";

import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "sonner";
import Sidebar from "@/components/layout/Sidebar";
import Bottombar from "@/components/layout/Bottombar";
import { SessionProvider }  from "next-auth/react";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <html lang="fr">
            <head>
                <title>Big Meal App</title>
                <meta name="description" content="A simple meal app" />
                <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content="Big Meal" />
                <link rel="apple-touch-icon" href="/favicon192x192.png" />
            </head>
            <body className="flex flex-col antialiased">
                <SessionProvider>
                    <header className="flex justify-center border-b border-warm-border bg-warm-base">
                        <Navbar />
                    </header>
                    <div className="flex">
                        <aside className="hidden border-r border-warm-border lg:block">
                            <Sidebar />
                        </aside>
                        <main className="flex-1 overflow-hidden p-4 pb-20">{children}</main>
                    </div>
                    <div className="fixed bottom-0 z-40 w-full border-t border-warm-border bg-warm-base lg:hidden">
                        <Bottombar />
                    </div>
                    <Toaster />
                </SessionProvider>
            </body>
        </html>
    );
}
