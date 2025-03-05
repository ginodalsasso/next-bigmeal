"use client";

import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "sonner";
import Sidebar from "@/components/layout/Sidebar";
import Bottombar from "@/components/layout/Bottombar";
import { SessionProvider }  from "next-auth/react";
import { CsrfTokenProvider } from "./hooks/useCsrfToken";

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
            <SessionProvider>
                <CsrfTokenProvider>
                    <body className="flex min-h-screen flex-col">
                        <header className="flex justify-center border-b border-neutral-500 bg-neutral-900">
                            <Navbar />
                        </header>
                        <div className="flex">
                            <aside className="hidden border-r border-neutral-500 lg:block">
                                <Sidebar />
                            </aside>
                            <main className="flex-1 px-4 pb-20 pt-4 md:p-6">{children}</main>
                        </div>
                        <div className="fixed bottom-0 w-full border-t bg-black lg:hidden">
                            <Bottombar />
                        </div>
                        <Toaster />
                    </body>
                </CsrfTokenProvider>
            </SessionProvider>
        </html>
    );
}
