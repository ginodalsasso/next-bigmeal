"use client";

import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "sonner";
import { AuthProvider } from "@/app/context/AuthContext";
import Sidebar from "@/components/layout/Sidebar";
import Bottombar from "@/components/layout/Bottombar";
import { useEffect, useState } from "react";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [csrfToken, setCsrfToken] = useState("");

    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                const response = await fetch("/api/csrf-token");
    
                if (!response.ok) {
                    throw new Error(`Failed to fetch CSRF token. Status: ${response.status}`);
                }
    
                const data = await response.json();
    
                if (!data || !data.csrfToken) {
                    throw new Error("Invalid CSRF token response.");
                }
                
                setCsrfToken(data.csrfToken);
            } catch (error) {
                console.error("Error fetching CSRF token:", error);
            }
        };
        fetchCsrfToken();
    }, []);
    

    return (
        <html lang="en">
            <head>
                <title>Big Meal App</title>
                <meta name="description" content="A simple meal app" />
                <meta name="csrf-token" content={csrfToken} />
            </head>
            <AuthProvider>
                <body className="flex flex-col min-h-screen">
                    <header className="flex justify-center border-b border-gray-200">
                        <Navbar />
                    </header>
                    <div className="flex">
                        <aside className="hidden lg:block border-r">
                            <Sidebar />
                        </aside>
                        <main className="flex-1 px-4 pt-4 pb-20 md:p-6">{children}</main>
                    </div>
                    <div className="lg:hidden fixed w-full bottom-0 bg-black border-t">
                        <Bottombar />
                    </div>
                    <Toaster />
                </body>
            </AuthProvider>
        </html>
    );
}
