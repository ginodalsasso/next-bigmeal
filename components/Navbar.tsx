"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Utilisation de Next.js Image
import { ucFirst } from "@/lib/utils";
import openMenu from "@/public/img/openMenu.svg";
import closeMenu from "@/public/img/closeMenu.svg"; 

const Navbar = () => {
    const [active, setActive] = useState("");
    const [toggle, setToggle] = useState(false);

    const links = [
        { title: "ingrédients", url: "/ingredients" },
        { title: "catégorie ingrédient", url: "/categories-ingredient" },
        { title: "catégorie repas", url: "/categories-meal" },
    ];

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
                                    active === link.title ? "text-white font-bold" : "text-gray-400"
                                }`}
                                onClick={() => setActive(link.title)}
                            >
                                {ucFirst(link.title)}
                            </Link>
                        </li>
                    ))}
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
                            {links.map((link) => (
                                <li key={link.title}>
                                    <Link href={link.url}
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
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
