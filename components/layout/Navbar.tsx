"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"; // Utilisation de Next.js Image
import { ucFirst } from "@/lib/utils";
import openMenu from "@/public/img/openMenu.svg";
import closeMenu from "@/public/img/closeMenu.svg";

const Navbar = () => {
    const [active, setActive] = useState(""); // État de la navigation active
    const [toggle, setToggle] = useState(false); // État du menu mobile
    const [isAuth, setIsAuth] = useState(false); // État de l'authentification

    const handleSession = async () => {
        try {
            const response = await fetch("/api/auth/status", {
                method: "GET",
            });
            if (response.ok) {
                const data = await response.json();
                setIsAuth(data.isAuth); // Si isAuth est vrai, l'utilisateur est authentifié
                console.log("Données de session:", data);
            } else {
                console.error("Erreur de réponse:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("Erreur lors de la vérification de la session:", error);
        }
    };
    

    // Vérifier la session utilisateur lors du chargement du composant
    useEffect(() => {
        handleSession();
    }, []);

    // Liens de navigation
    const links = [
        { title: "ingrédients", url: "/ingredients" },
        { title: "repas", url: "/meals" },
        { title: "catégorie ingrédient", url: "/categories-ingredient" },
        { title: "catégorie repas", url: "/categories-meal" },
        { title: "S'inscrire", url: "/register" },
        { title: "Se connecter", url: "/login" },
    ];

    // Fonction de déconnexion
    const handleLogout = async () => {
        try {
            const response = await fetch("/api/auth/logout", {
                method: "POST",
            });
            if (response.ok) {
                // Rediriger l'utilisateur vers la page de connexion ou la page d'accueil
                window.location.href = "/login";
            }
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error);
        }
    };

    return (
        <nav className="w-full flex py-6 z-20">
            <div className="w-full flex justify-between items-center mx-auto">
                {/* Logo */}
                <div className="flex">
                    <Link
                        href="/"
                        className="flex items-center text-lg font-bold"
                        onClick={() => {
                            setActive("");
                            window.scrollTo(0, 0);
                        }}
                    >
                        Big-Meal
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <ul className="list-none hidden lg:flex flex-row items-center gap-6">
                    {links.map((link) => (
                        <li key={link.title}>
                            <Link
                                href={link.url}
                                className={`cursor-pointer hover:underline ${
                                    active === link.title
                                        ? "text-white font-bold"
                                        : "text-gray-400"
                                }`}
                                onClick={() => setActive(link.title)}
                            >
                                {ucFirst(link.title)}
                            </Link>
                        </li>
                    ))}
                    {isAuth && (
                        <li>
                            <button
                                className="cursor-pointer hover:underline text-gray-400"
                                onClick={handleLogout}
                            >
                                Se déconnecter
                            </button>
                        </li>
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
                        {/* Liste des liens */}
                        <ul className="list-none flex justify-center items-end flex-col gap-5">
                            {links.map((link) => (
                                <li key={link.title}>
                                    <Link
                                        href={link.url}
                                        className={`${
                                            active === link.title
                                                ? "text-white"
                                                : "text-gray-400"
                                        } font-medium cursor-pointer text-[22px]`}
                                        onClick={() => {
                                            setToggle(!toggle);
                                            setActive(link.title);
                                        }}
                                    >
                                        {ucFirst(link.title)}
                                    </Link>
                                </li>
                            ))}
                            {isAuth && (
                                <li>
                                    <button
                                        className="text-gray-400 font-medium cursor-pointer text-[22px]"
                                        onClick={handleLogout}
                                    >
                                        Se déconnecter
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
