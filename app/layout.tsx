import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "sonner";
import { AuthProvider } from "@/app/context/AuthContext";

export const metadata: Metadata = {
    title: "Big Meal App",
    description: "A simple meal app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            {/* AuthProvider pour gérer l'authentification */}
            <AuthProvider> 
                <body>
                    <header className="px-4 md:px-6 mx-auto max-w-7xl">
                        <Navbar />
                    </header>
                    <main className="p-4 md:p-6 mx-auto max-w-7xl">{children}</main>
                    <Toaster />
                </body>
            </AuthProvider>
        </html>
    );
}
