"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import IsUser from "../isUser";
import { signOut } from "next-auth/react";
import SearchBar from "./Search";
import { LogOut, Search, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const [toggleSearch, setToggleSearch] = useState(false);
    const searchContainerRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    // Ferme la recherche au changement de route
    useEffect(() => {
        setToggleSearch(false);
    }, [pathname]);

    // Ferme la recherche si clic en dehors
    useEffect(() => {
        if (!toggleSearch) return;
        const handleClickOutside = (e: MouseEvent) =>
            searchContainerRef.current?.contains(e.target as Node) || setToggleSearch(false);
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [toggleSearch]);

    return (
        <IsUser>
            <nav aria-label="Navigation principale" className="w-full max-w-7xl px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="hidden items-center gap-1 lg:flex">
                        <span className="text-xl font-bold text-orange-400 tracking-tight">Big-Meal</span>
                    </Link>

                    {/* Actions desktop */}
                    <ul className="hidden list-none flex-row items-center gap-1 lg:flex">
                        <li>
                            <button
                                className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
                                onClick={() => setToggleSearch(!toggleSearch)}
                                aria-label="Rechercher"
                                aria-expanded={toggleSearch}
                            >
                                <Search size={18} aria-hidden="true" />
                            </button>
                        </li>
                        <li>
                            <Link
                                href="/profile"
                                className="flex items-center rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
                                aria-label="Profil"
                            >
                                <UserRound size={18} aria-hidden="true" />
                            </Link>
                        </li>
                        <li>
                            <button
                                className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-red-500/10 hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                                onClick={() => signOut()}
                                aria-label="Déconnexion"
                            >
                                <LogOut size={18} aria-hidden="true" />
                            </button>
                        </li>
                    </ul>
                </div>

                {/* SearchBar mobile */}
                <div className="block lg:hidden" ref={searchContainerRef}>
                    <SearchBar onSearch={() => setToggleSearch(false)} />
                </div>

                {/* Overlay desktop */}
                {toggleSearch && (
                    <div className="fixed left-0 top-0 z-10 hidden h-screen w-full items-center justify-center bg-zinc-950/60 backdrop-blur-sm lg:flex">
                        <div ref={searchContainerRef}>
                            <SearchBar onSearch={() => setToggleSearch(false)} />
                        </div>
                    </div>
                )}
            </nav>
        </IsUser>
    );
};

export default Navbar;
