import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "sonner";
import { AuthProvider } from "@/app/context/AuthContext";
import Sidebar from "@/components/layout/Sidebar";
import Bottombar from "@/components/layout/Bottombar";

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
                    <header className="flex justify-center  border-b border-gray-200">
                        <Navbar />
                    </header>
                    <div className="flex">
                        {/* Sidebar */}
                        <aside className="hidden lg:block border-r">
                            <Sidebar  />
                        </aside>
                        <main className="flex-1 p-4 md:p-6">{children}</main>
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
