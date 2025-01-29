"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import openMenu from "@/public/img/openMenu.svg";
import closeMenu from "@/public/img/closeMenu.svg";
import { useAuth } from "@/app/context/AuthContext";
import { links } from "@/lib/constants/constants";
import { ucFirst } from "@/lib/utils";

const Navbar = () => {
    const [toggle, setToggle] = useState(false); // État du menu mobile
    const { isAuth, user } = useAuth(); // Utilisation du contexte d'authentification

    // Fonction de déconnexion
    const handleLogout = async () => {
        try {
            const response = await fetch("/api/auth/logout", {
                method: "POST",
                credentials: "include", // Inclure les cookies pour la déconnexion
            });
            if (response.ok) {
                window.location.href = "/login"; // Redirige l'utilisateur
            }
        } catch (error) {
            console.error("Erreur lors de la déconnexion :", error);
        }
    };

    return (
        <nav className="w-full max-w-7xl p-4">
            <div className="flex justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center text-lg font-bold">
                    Big-Meal
                </Link>

                {/* Desktop Navigation */}
                <ul className="list-none hidden lg:flex flex-row items-center gap-6">
                    {/* Si l'utilisateur est connecté */}
                    {isAuth ? (
                        <>
                            <li>
                                <span className="text-gray-200 cursor-default">
                                    Bonjour, 
                                    <Link href={`/${user?.username}`}>
                                        {user?.username}
                                    </Link>
                                </span>
                            </li>
                            <li>
                                <button
                                    className="nav-links-desktop align-icon"
                                    onClick={handleLogout}
                                >
                                    <span className="font-medium">
                                        Se déconnecter
                                    </span>
                                    <Image
                                        src={"/img/logout.svg"}
                                        width={20}
                                        height={20}
                                        alt="Déconnexion"
                                    />
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link
                                    href="/login"
                                    className="nav-links-desktop"
                                >
                                    Se connecter
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/register"
                                    className="nav-links-desktop"
                                >
                                    S&apos;inscrire
                                </Link>
                            </li>
                        </>
                    )}
                </ul>

                {/* Mobile Navigation */}
                <div className="lg:hidden">
                    <Image
                        src={openMenu}
                        alt="menu"
                        className="w-[24px]"
                        onClick={() => setToggle(!toggle)}
                    />
                    <div
                        className={`${
                            !toggle ? "hidden" : "flex"
                        } bg-black p-6 absolute top-0 right-0 w-full h-full z-10 flex justify-end`}
                    >
                        <Image
                            src={closeMenu}
                            alt="menu"
                            className="top-6 right-5 absolute"
                            onClick={() => setToggle(!toggle)}
                        />
                        <ul className="list-none flex justify-center items-end flex-col gap-5">
                            {isAuth ? ( 
                                <>
                                    {links.map((link) => (
                                        <li key={link.title}>
                                        <Link
                                            href={link.url}
                                            className="nav-links-mobile"
                                            onClick={() => setToggle(false)}
                                            >
                                            {ucFirst(link.title)}
                                        </Link>
                                        </li>
                                    ))}
                                    <li>
                                        <button
                                            className="nav-links-desktop align-icon"
                                            onClick={handleLogout}
                                        >
                                            <span className="text-xl">
                                                Se déconnecter
                                            </span>
                                            <Image
                                                src={"/img/logout.svg"}
                                                width={20}
                                                height={20}
                                                alt="Déconnexion"
                                            />
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link
                                            href="/login"
                                            className="nav-links-mobile"
                                            onClick={() => setToggle(!toggle)}
                                        >
                                            Se connecter
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/register"
                                            className="nav-links-mobile"
                                            onClick={() => setToggle(!toggle)}
                                        >
                                            S&apos;inscrire
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
