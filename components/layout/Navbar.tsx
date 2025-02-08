"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import openMenu from "@/public/img/openMenu.svg";
import closeMenu from "@/public/img/closeMenu.svg";
import { links } from "@/lib/constants/constants";
import { ucFirst } from "@/lib/utils";
import IsUser from "../isUser";
import { signOut } from "next-auth/react";
import IsNotAuthenticated from "../isNotAuthenticated";

const Navbar = () => {
    const [toggle, setToggle] = useState(false); // État du menu mobile
    
    return (
        <nav className="w-full max-w-7xl p-4">
            <div className="flex justify-between items-center ">
                {/* Logo */}
                <Link href="/" className="flex items-center text-lg font-bold">
                    Big-Meal
                </Link>

                {/* Desktop Navigation */}
                <ul className="list-none hidden lg:flex flex-row items-center gap-6">
                    {/* Si l'utilisateur est connecté */}
                    <IsUser>
                        <li>
                            {/* <span className="text-gray-200 cursor-default">
                                Bonjour, 
                                <Link href={`/${user?.username}`}>
                                    {user?.username}
                                </Link>
                            </span> */}
                        </li>
                        <li>
                            <button 
                                className="nav-links-desktop align-icon"
                                onClick={() => signOut()}
                            > 
                                <Image
                                    src={"/img/logout.svg"}
                                    width={20}
                                    height={20}
                                    alt="Déconnexion"
                                />
                                <span>
                                    Se déconnecter
                                </span>
                            </button>
                        </li>
                    </IsUser>
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
                        } bg-black p-6 absolute top-0 right-0 w-full h-full z-10 flex justify-end`}
                    >
                        <Image
                            src={closeMenu}
                            alt="menu"
                            className="top-6 right-5 absolute"
                            onClick={() => setToggle(!toggle)}
                        />
                        <ul className="list-none flex justify-center items-end flex-col gap-5">
                            <IsUser>
                                {links.map((link) => (
                                    <li key={link.title} className="nav-links-desktop align-icon">
                                        {link.icon && (
                                            <Image
                                                src={link.icon}
                                                width={20}
                                                height={20}
                                                alt={link.title}
                                            />
                                        )}
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
                                        onClick={() => signOut()}
                                    > 
                                        <Image
                                            src={"/img/logout.svg"}
                                            width={20}
                                            height={20}
                                            alt="Déconnexion"
                                        />
                                        <span>
                                            Se déconnecter
                                        </span>
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
