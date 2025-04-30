"use client";

import Link from "next/link";
import React, { useState } from "react";
import IsUser from "../isUser";
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
import IsNotAuthenticated from "../isNotAuthenticated";
import { signOut } from "next-auth/react";

const Bottombar = () => {
    const [active, setActive] = useState(""); // État de la navigation active
    const [toggle, setToggle] = useState(false); // État du menu mobile

    // Liens de navigation
    const hamburgerLinks = [
        { icon: <ShoppingCart />, title: "liste de courses", url: "/shopping-list" },
        { icon: <SprayCan />, title: "Produits ménagers", url: "/household-products" },
        { icon: <Carrot />, title: "ingrédients", url: "/ingredients" },
        { icon: <Utensils />, title: "repas", url: "/meals" },
        { icon: <Folder />, title: "catégories", url: "/categories" }
    ];

    const links = [
        { icon: <Home />, url: "/", alt: "Accueil" },
        { icon: <UserRound />, url: "/profile", alt: "Profil" },
        { icon: <ShoppingCart />, url: "/shopping-list", alt: "Liste de courses"}
    ];

    return (
        <>
            <IsUser>
                <div className="p-4">
                    <ul className="flex justify-around">
                        {links.map((link, index) => (
                            <li key={index}>
                                <Link
                                    href={link.url}
                                    className={`${
                                        active === link.url
                                            ? "text-white"
                                            : "text-gray-400"
                                    }`}
                                    onClick={() => setActive(link.url)}
                                >
                                    {link.icon}
                                </Link>
                            </li>
                        ))}
                        <li>
                            {/* Mobile Navigation */}
                            <div className="lg:hidden">
                                {!toggle ? (
                                    <Menu className="text-gray-400" onClick={() => setToggle(true)} />
                                ) : (
                                    <X className="text-white" onClick={() => setToggle(false)} />
                                )}
                            </div>
                            {/* Menu Overlay */}
                            <div
                                // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
                                className={`fixed inset-0 z-50 transform bg-black text-white transition-transform duration-300 ${
                                    toggle ? "translate-x-0" : "translate-x-full"
                                } flex flex-col items-center justify-center`}
                            >
                                <ul className="flex flex-col items-end gap-8 text-2xl">
                                <X
                                    className="absolute right-5 top-6"
                                    onClick={() => setToggle(!toggle)}
                                />
                                <IsUser>
                                    {hamburgerLinks.map((link) => (
                                        <li key={link.title} className="align-icon">
                                            <Link
                                                href={link.url}
                                                onClick={() => setToggle(false)}
                                                className="align-icon"
                                            >
                                                {ucFirst(link.title)} {link.icon && link.icon}
                                            </Link>
                                        </li>
                                    ))} 
                                    <li>
                                        <button
                                            onClick={() => {
                                                setToggle(false);
                                                signOut();
                                            }}
                                            className="align-icon"
                                        >
                                            Déconnexion <LogOut size={20} />
                                        </button>
                                    </li>
                                </IsUser>

                                <IsNotAuthenticated>
                                    <li>
                                        <Link
                                            href="/login"
                                            onClick={() => setToggle(false)}
                                            className="hover:underline"
                                        >
                                            Se connecter
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/register"
                                            onClick={() => setToggle(false)}
                                            className="hover:underline"
                                        >
                                            S&apos;inscrire
                                        </Link>
                                    </li>
                                    </IsNotAuthenticated>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </IsUser>
        </>
    );
};

export default Bottombar;
