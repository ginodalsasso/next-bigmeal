"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import IsUser from "../auth/isUser";
import IsAdmin from "../auth/isAdmin";
import {
    Carrot,
    Folder,
    Home,
    LogOut,
    Menu,
    ShoppingCart,
    SprayCan,
    UserRound,
    Utensils,
    X,
} from "lucide-react";
import { ucFirst } from "@/lib/utils";
import IsNotAuthenticated from "../auth/isNotAuthenticated";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

const Bottombar = () => {
    const [toggle, setToggle] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setToggle(false);
    }, [pathname]);

    const hamburgerLinks = [
        { icon: ShoppingCart, title: "liste de courses",  url: "/shopping-list" },
        { icon: SprayCan,     title: "Produits ménagers", url: "/household-products" },
        { icon: Carrot,       title: "ingrédients",       url: "/ingredients" },
        { icon: Utensils,     title: "repas",             url: "/meals" },
    ];

    const quickLinks = [
        { icon: Home,         url: "/",              alt: "Accueil" },
        { icon: UserRound,    url: "/profile",       alt: "Profil" },
        { icon: ShoppingCart, url: "/shopping-list", alt: "Liste de courses" },
    ];

    return (
        <>
            <IsUser>
                {/* Barre du bas */}
                <div className="p-2">
                    <ul className="flex items-center justify-around">
                        {quickLinks.map((link, index) => {
                            const isActive = pathname === link.url;
                            const Icon = link.icon;
                            return (
                                <li key={index}>
                                    <Link
                                        href={link.url}
                                        title={link.alt}
                                        className={`flex items-center justify-center rounded-xl px-5 py-2 transition-colors duration-150 ${
                                            isActive
                                                ? "text-warm-accent"
                                                : "text-warm-secondary hover:text-warm-primary"
                                        }`}
                                    >
                                        <Icon size={22} strokeWidth={isActive ? 2.5 : 1.5} />
                                    </Link>
                                </li>
                            );
                        })}

                        <li>
                            <button
                                className="flex items-center justify-center rounded-xl px-5 py-2 text-warm-secondary transition-colors hover:text-warm-primary"
                                onClick={() => setToggle(true)}
                                title="Menu"
                            >
                                <Menu size={22} strokeWidth={1.5} />
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Overlay slide-up */}
                <div
                    className={`fixed inset-0 z-50 flex flex-col bg-warm-base transition-all duration-300 ease-in-out ${
                        toggle
                            ? "translate-y-0 opacity-100"
                            : "pointer-events-none translate-y-full opacity-0"
                    }`}
                >
                    <div className="flex items-center justify-between border-b border-warm-border px-6 py-5">
                        <span className="text-base font-semibold text-warm-primary">Menu</span>
                        <button
                            onClick={() => setToggle(false)}
                            className="rounded-lg p-2 text-warm-secondary transition-colors hover:bg-warm-subtle hover:text-warm-primary"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <nav className="flex-1 overflow-y-auto p-4">
                        <ul className="flex flex-col gap-1">
                            <IsUser>
                                {hamburgerLinks.map((link) => {
                                    const isActive =
                                        pathname === link.url ||
                                        pathname.startsWith(link.url + "/");
                                    const Icon = link.icon;
                                    return (
                                        <li key={link.title}>
                                            <Link
                                                href={link.url}
                                                className={`flex items-center gap-4 rounded-xl px-4 py-3.5 text-base font-medium transition-colors duration-150 active:bg-warm-accent/15 active:text-warm-primary ${
                                                    isActive
                                                        ? "bg-warm-accent/15 text-warm-primary"
                                                        : "text-warm-secondary hover:bg-warm-subtle hover:text-warm-primary"
                                                }`}
                                            >
                                                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.75} />
                                                {ucFirst(link.title)}
                                            </Link>
                                        </li>
                                    );
                                })}

                                <IsAdmin>
                                    {(() => {
                                        const isActive = pathname === "/categories" || pathname.startsWith("/categories/");
                                        return (
                                            <li>
                                                <Link
                                                    href="/categories"
                                                    className={`flex items-center gap-4 rounded-xl px-4 py-3.5 text-base font-medium transition-colors duration-150 active:bg-warm-accent/15 active:text-warm-primary ${
                                                        isActive
                                                            ? "bg-warm-accent/15 text-warm-primary"
                                                            : "text-warm-secondary hover:bg-warm-subtle hover:text-warm-primary"
                                                    }`}
                                                >
                                                    <Folder size={20} strokeWidth={isActive ? 2.5 : 1.75} />
                                                    {ucFirst("catégories")}
                                                </Link>
                                            </li>
                                        );
                                    })()}
                                </IsAdmin>

                                <li className="mt-4 border-t border-warm-border pt-4">
                                    <button
                                        onClick={() => signOut()}
                                        className="flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-base font-medium text-warm-danger transition-colors hover:bg-warm-danger/10"
                                    >
                                        <LogOut size={20} strokeWidth={1.75} />
                                        Déconnexion
                                    </button>
                                </li>
                            </IsUser>

                            <IsNotAuthenticated>
                                <li>
                                    <Link
                                        href="/login"
                                        className="flex items-center gap-4 rounded-xl px-4 py-3.5 text-base font-medium text-warm-secondary transition-colors hover:bg-warm-subtle hover:text-warm-primary"
                                    >
                                        Se connecter
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/register"
                                        className="flex items-center gap-4 rounded-xl px-4 py-3.5 text-base font-medium text-warm-secondary transition-colors hover:bg-warm-subtle hover:text-warm-primary"
                                    >
                                        S&apos;inscrire
                                    </Link>
                                </li>
                            </IsNotAuthenticated>
                        </ul>
                    </nav>
                </div>
            </IsUser>
        </>
    );
};

export default Bottombar;
