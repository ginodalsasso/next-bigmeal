"use client";

import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";

// Définition des liens avec chemins des SVG
const links = [
    { icon: "/img/home.svg", url: "/", alt: "Accueil"},
    { icon: "/img/cart.svg", url: "/shopping-list", alt: "Liste de courses" },
];

const Bottombar = () => {
    const [active, setActive] = useState(""); // État de la navigation active
    const { isAuth } = useAuth(); // Utilisation du contexte d'authentification

    return (
        <>
            {isAuth ? (
                <div className="p-4">
                    <ul className="flex justify-around">
                        {links.map((link, index) => (
                            <li key={index}>
                                <Link
                                    href={link.url}
                                    className={`${
                                        active === link.url
                                            ? ""
                                            : ""
                                    }`}
                                    onClick={() => setActive(link.url)}
                                >
                                    <Image
                                        src={link.icon}
                                        width={28}
                                        height={28}
                                        alt={link.alt}
                                    />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null}
        </>
    );
};

export default Bottombar;
