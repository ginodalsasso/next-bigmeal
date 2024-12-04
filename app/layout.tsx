import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import { ucFirst } from "@/lib/utils";
import Navbar from "@/components/Navbar";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });

export const metadata: Metadata = {
    title: "Big Meal App",
    description: "A simple meal app",
};

const links = [
    { title: "ingredients", url: "/ingredients" },
    { title: "creer ingredient", url: "/ingredients/create" },
    { title: "catégorie ingrédient", url: "/categories-ingredient" },
    { title: "catégorie repas", url: "/categories-meal" },

];

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <header className="px-4 md:px-6 mx-auto max-w-7xl">
                    <Navbar/>
                </header>
                <main className="p-4 md:p-6 mx-auto max-w-7xl">{children}</main>
            </body>
        </html>
    );
}
