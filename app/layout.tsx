import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "sonner";

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
            <body>
                <header className="px-4 md:px-6 mx-auto max-w-7xl">
                    <Navbar />
                </header>
                <main className="p-4 md:p-6 mx-auto max-w-7xl">{children}</main>
                <Toaster />
            </body>
        </html>
    );
}
