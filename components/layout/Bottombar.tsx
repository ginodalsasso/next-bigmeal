"use client";

import Link from "next/link";
import React, { useState } from "react";
import IsUser from "../isUser";
import { Home, ShoppingCart, UserRound } from "lucide-react";



const Bottombar = () => {
    const [active, setActive] = useState(""); // État de la navigation active

    const links = [
        { icon: <Home />, url: "/", alt: "Accueil"},
        { icon: <UserRound />, url: "/profile", alt: "Profil" },
        { icon: <ShoppingCart /> , url: "/shopping-list", alt: "Liste de courses" },
    ];

    return (
        <>
            <IsUser>
                <div className="p-4">
                    <ul className="flex justify-around">
                        {links.map((link, index) => (
                            <li key={index}>
                                <Link
                                    href={link.url}
                                    className={`${
                                        active === link.url
                                            ? "text-white"
                                            : "text-gray-400"
                                    }`}
                                    onClick={() => setActive(link.url)}
                                >
                                    {link.icon}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </IsUser>
        </>
    );
};

export default Bottombar;
