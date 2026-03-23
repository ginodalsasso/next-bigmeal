"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import IsUser from "../auth/isUser";
import { signOut } from "next-auth/react";
import SearchBar from "../search/Search";
import { LogOut, Search, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const [toggleSearch, setToggleSearch] = useState(false);
    const searchContainerRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        setToggleSearch(false);
    }, [pathname]);

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
                    <Link href="/" className="hidden items-center gap-1 lg:flex">
                        <span className="text-xl font-bold tracking-tight text-warm-accent">Big-Meal</span>
                    </Link>

                    <ul className="hidden list-none flex-row items-center gap-1 lg:flex">
                        <li>
                            <button
                                className="rounded-lg p-2 text-warm-secondary transition-colors hover:bg-warm-subtle hover:text-warm-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-accent"
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
                                className="flex items-center rounded-lg p-2 text-warm-secondary transition-colors hover:bg-warm-subtle hover:text-warm-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-accent"
                                aria-label="Profil"
                            >
                                <UserRound size={18} aria-hidden="true" />
                            </Link>
                        </li>
                        <li>
                            <button
                                className="rounded-lg p-2 text-warm-secondary transition-colors hover:bg-warm-danger/10 hover:text-warm-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-danger"
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
                    <div className="fixed left-0 top-0 z-10 hidden h-screen w-full items-center justify-center bg-warm-primary/30 backdrop-blur-sm lg:flex">
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
