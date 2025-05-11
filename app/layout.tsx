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
        <html lang="en">
            <head>
                <title>Big Meal App</title>
                <meta name="description" content="A simple meal app" />
            </head>
            <body className="flex flex-col">
                <SessionProvider>
                    <header className="flex justify-center border-b border-neutral-500 bg-neutral-900">
                        <Navbar />
                    </header>
                    <div className="flex">
                        <aside className="hidden border-r border-neutral-500 lg:block">
                            <Sidebar />
                        </aside>
                        <main className="flex-1 bg-zinc-900 overflow-hidden p-4 pb-20" >{children}</main>
                    </div>
                    <div className="fixed bottom-0 w-full border-t bg-black lg:hidden">
                        <Bottombar />
                    </div>
                    <Toaster />
                </SessionProvider>
            </body>
        </html>
    );
}
