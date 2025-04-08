"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ucFirst } from "@/lib/utils";
import IsUser from "../isUser";
import { signOut } from "next-auth/react";
import IsNotAuthenticated from "../isNotAuthenticated";
import SearchBar from "@/components/layout/SearchBar";
import { Carrot, Folder, LogOut, Menu, Search, ShoppingCart, UserRound, Utensils, X } from "lucide-react";

const Navbar = () => {
    const [toggle, setToggle] = useState(false); // État du menu mobile
    const [toggleSearch, setToggleSearch] = useState(false); // État de la barre de recherche

    const searchContainerRef = useRef<HTMLDivElement>(null); // Référence au conteneur de recherche

    // Liens de navigation
    const links = [
        { icon: <ShoppingCart />, title: "liste de courses", url: "/shopping-list" },
        { icon: <Carrot />, title: "ingrédients", url: "/ingredients" },
        { icon: <Utensils />, title: "repas", url: "/meals" },
        { icon:<Folder />, title: "catégorie ingrédient", url: "/categories-ingredient" },
        { icon:<Folder />, title: "catégorie repas", url: "/categories-meal" }
    ];

    
    useEffect(() => {
        // Si la recherche n'est pas visible, pas besoin d'ajouter l'écouteur
        if (!toggleSearch) return;
        
        // Ferme la recherche si le clic est en dehors du conteneur
        const handleClickOutside = (e: MouseEvent) => 
            searchContainerRef.current?.contains(e.target as Node) || setToggleSearch(false); // Si le clic est en dehors du conteneur, on ferme la recherche
        
        document.addEventListener('mousedown', handleClickOutside);
        // Nettoyage de l'écouteur d'événements lorsque le composant est démonté ou que toggleSearch change
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [toggleSearch]);

    return (
        <nav className="w-full max-w-7xl p-4">
            <div className="flex items-center justify-between ">
                {/* Logo */}
                <Link href="/" className="flex items-center text-lg font-bold">
                    Big-Meal
                </Link>

                {/* Desktop Navigation */}
                <ul className="hidden list-none flex-row items-center gap-6 lg:flex">
                    {/* Si l'utilisateur est connecté */}
                    <IsUser>
                        <li className="nav-links-desktop align-icon">                         
                            <Search
                                onClick={() => setToggleSearch(!toggleSearch)}
                            />
                        </li>
                        <li className="nav-links-desktop align-icon">
                            <Link
                                href="/profile"
                                className="nav-links-desktop"
                                title="Profil"
                            >
                                <UserRound />
                            </Link>
                        </li>
                        <li>
                            <button 
                                className="nav-links-desktop align-icon"
                                onClick={() => signOut()}
                                title="Déconnexion"
                            > 
                                <LogOut />
                            </button>
                        </li>
                    </IsUser>
                    {/* Si l'utilisateur n'est pas connecté */}
                    <IsNotAuthenticated>
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
                    </IsNotAuthenticated>
                </ul>


                {/* Mobile Navigation */}
                <div className="lg:hidden">
                    <Menu
                        onClick={() => setToggle(!toggle)}
                    />
                    <div
                        className={`${
                            !toggle ? "hidden" : "flex"
                        } absolute right-0 top-0 z-10 flex size-full justify-end bg-black p-6`}
                    >
                        <X
                            className="absolute right-5 top-6"
                            onClick={() => setToggle(!toggle)}
                        />
                        <ul className="flex list-none flex-col items-end justify-center gap-5">
                            <IsUser>
                                <li>
                                    <button 
                                        className="nav-links-mobile align-icon" 
                                        onClick={() => setToggleSearch(!toggleSearch)}
                                    >                   
                                        <span>
                                            Recherche
                                        </span>
                                        <Search />
                                    </button>
                                </li>

                                {links.map((link) => (
                                    <li key={link.title} className="nav-links-desktop align-icon">
                                        <Link
                                            href={link.url}
                                            className="nav-links-mobile"
                                            onClick={() => setToggle(false)}
                                            >
                                            {ucFirst(link.title)}
                                        </Link>
                                        {link.icon && link.icon}
                                    </li>
                                ))}
                                <li>
                                    <button 
                                        className="nav-links-mobile align-icon"
                                        onClick={() => signOut()}
                                    > 
                                        <span>
                                            Déconnexion
                                        </span>
                                        <LogOut />
                                </button>
                                </li>
                            </IsUser>
                            <IsNotAuthenticated>
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
                            </IsNotAuthenticated>
                        </ul>
                    </div>
                </div>
            </div>
            {/* Afficher le composant SearchBar si toggleSearch est true */}
            {toggleSearch && (
                <div className="fixed left-0 top-0  z-10 flex h-screen w-full items-center justify-center bg-zinc-950/50 p-10 backdrop-blur-sm">
                    <div ref={searchContainerRef}>
                        <SearchBar onSearch={() => setToggleSearch(false)} />
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
