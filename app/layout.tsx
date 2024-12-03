import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import { ucFirst } from "@/lib/utils";

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
                <header>
                    <nav>
                        <ul className="flex justify-center p-2">
                        {links.map((link) =>
                            <Link key={link.title} href={link.url}>
                                <li className="mr-5 cursor-pointer hover:underline">
                                    {ucFirst(link.title)}
                                </li>
                            </Link>
                        )}
                        </ul>
                    </nav>
                </header>
                <main className="md:p-6">{children}</main>
            </body>
        </html>
    );
}
