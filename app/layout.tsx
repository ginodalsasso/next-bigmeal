import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "sonner";
import { AuthProvider } from "@/app/context/AuthContext";
import Sidebar from "@/components/layout/Sidebar";

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
            <AuthProvider>
                <body className="flex flex-col min-h-screen">
                    <header className="px-4 md:px-6 flex justify-center">
                        <Navbar />
                    </header>
                    <div className="flex">
                        {/* Sidebar */}
                        <aside>
                            <Sidebar  />
                        </aside>
                        <main className="flex-1 p-4 md:p-6">{children}</main>
                    </div>
                    <Toaster />
                </body>
            </AuthProvider>
        </html>
    );
}
