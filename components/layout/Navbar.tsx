"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import openMenu from "@/public/img/openMenu.svg";
import closeMenu from "@/public/img/closeMenu.svg";
import { links } from "@/lib/constants/ui_constants";
import { ucFirst } from "@/lib/utils";
import IsUser from "../isUser";
import { signOut } from "next-auth/react";
import IsNotAuthenticated from "../isNotAuthenticated";

const Navbar = () => {
    const [toggle, setToggle] = useState(false); // État du menu mobile
    
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
                            <Link
                                href="/profile"
                                className="nav-links-desktop"
                                title="Profil"
                            >
                                <Image
                                    src={"/img/user.svg"}
                                    width={18}
                                    height={18}
                                    alt="Profil"
                                />
                            </Link>
                        </li>
                        <li>
                            <button 
                                className="nav-links-desktop align-icon"
                                onClick={() => signOut()}
                                title="Déconnexion"
                            > 
                                <Image
                                    src={"/img/logout.svg"}
                                    width={20}
                                    height={20}
                                    alt="Déconnexion"
                                />
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
                    <Image
                        src={openMenu}
                        alt="menu"
                        width={28}
                        onClick={() => setToggle(!toggle)}
                    />
                    <div
                        className={`${
                            !toggle ? "hidden" : "flex"
                        } absolute right-0 top-0 z-10 flex size-full justify-end bg-black p-6`}
                    >
                        <Image
                            src={closeMenu}
                            alt="menu"
                            className="absolute right-5 top-6"
                            onClick={() => setToggle(!toggle)}
                        />
                        <ul className="flex list-none flex-col items-end justify-center gap-5">
                            <IsUser>
                                {links.map((link) => (
                                    <li key={link.title} className="nav-links-desktop align-icon">
                                        <Link
                                            href={link.url}
                                            className="nav-links-mobile"
                                            onClick={() => setToggle(false)}
                                            >
                                            {ucFirst(link.title)}
                                        </Link>
                                        {link.icon && (
                                            <Image
                                                src={link.icon}
                                                width={20}
                                                height={20}
                                                alt={link.title}
                                            />
                                        )}
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
                                        <Image
                                            src={"/img/logout.svg"}
                                            width={20}
                                            height={20}
                                            alt="Déconnexion"
                                        />
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
        </nav>
    );
};

export default Navbar;
