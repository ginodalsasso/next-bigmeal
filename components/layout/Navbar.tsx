"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import openMenu from "@/public/img/openMenu.svg";
import closeMenu from "@/public/img/closeMenu.svg";
import { useAuth } from "@/app/context/AuthContext";

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
        <nav className="w-full max-w-7xl py-6 z-20 border-b border-gray-200">
            <div className="flex justify-between items-center mx-auto">
                {/* Logo */}
                <div className="flex">
                    <Link href="/" className="flex items-center text-lg font-bold">
                        Big-Meal
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <ul className="list-none hidden lg:flex flex-row items-center gap-6">
                    {/* Si l'utilisateur est connecté */}
                    {isAuth ? (
                        <>
                            <li>
                                <span className="text-gray-400 font-medium">
                                    Bonjour, {user?.username}
                                </span>
                            </li>
                            <li>
                                <button
                                    className="cursor-pointer hover:underline text-gray-400"
                                    onClick={handleLogout}
                                >
                                    Se déconnecter
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link
                                    href="/login"
                                    className="text-gray-400 font-medium cursor-pointer"
                                >
                                    Se connecter
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/register"
                                    className="text-gray-400 font-medium cursor-pointer"
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
                                <li>
                                    <button
                                        className="text-gray-400 font-medium cursor-pointer text-[22px]"
                                        onClick={handleLogout}
                                    >
                                        Se déconnecter
                                    </button>
                                </li>
                            ) : (
                                <>
                                    <li>
                                        <Link
                                            href="/login"
                                            className="text-gray-400 font-medium cursor-pointer text-[22px]"
                                            onClick={() => setToggle(!toggle)}
                                        >
                                            Se connecter
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/register"
                                            className="text-gray-400 font-medium cursor-pointer text-[22px]"
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
