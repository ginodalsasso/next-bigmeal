"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import IsUser from "../isUser";
import { signOut } from "next-auth/react";
import SearchBar from "./Search";
import { LogOut, Search,UserRound } from "lucide-react";

const Navbar = () => {
    const [toggleSearch, setToggleSearch] = useState(false); // État de la barre de recherche

    const searchContainerRef = useRef<HTMLDivElement>(null); // Référence au conteneur de recherche
    
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
        <IsUser>
            <nav className="w-full max-w-7xl p-4">
                <div className="flex items-center justify-between ">
                    {/* Logo */}
                    <Link href="/" className="hidden items-center text-lg font-bold lg:flex">
                        Big-Meal
                    </Link>

                        {/* Desktop Navigation */}
                        <ul className="hidden list-none flex-row items-center gap-6 lg:flex">
                            {/* Si l'utilisateur est connecté */}
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
                        </ul>
                </div>
                {/* Mobile SearchBar visible */}
                <div className="block lg:hidden" ref={searchContainerRef}>
                    <SearchBar onSearch={() => setToggleSearch(false)} />
                </div>
                {toggleSearch && (
                    <>
                        {/* Desktop Overlay */}
                        <div className="fixed left-0 top-0 z-10 hidden h-screen w-full items-center justify-center bg-zinc-950/50 backdrop-blur-sm lg:flex">
                            <div ref={searchContainerRef}>
                                <SearchBar onSearch={() => setToggleSearch(false)} />
                            </div>
                        </div>
                    </>
                )}
            </nav>
        </IsUser>
    );
};

export default Navbar;
