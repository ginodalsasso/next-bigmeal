"use client";

import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import React, { useState } from "react";

const Bottombar = () => {
        const [active, setActive] = useState(""); // État de la navigation active
        const { isAuth } = useAuth(); // Utilisation du contexte d'authentification
        
        // Liens de navigation
        const links = [
            { icon: "home", url: "/" },
            { icon: "liste de courses", url: "/shopping-list" },

        ];

    return (
        <>
            {isAuth ? (
                <div className="p-4">
                    <ul className="flex justify-around">
                        {links.map((link) => (
                            <li key={link.icon}>
                                <Link
                                    href={link.url}
                                    className={`block px-4 py-2 ${
                                        active === link.icon
                                            ? "bg-gray-200 text-black"
                                            : "text-gray-200 hover:bg-gray-200 hover:text-black"
                                    }`}
                                    onClick={() => setActive(link.icon)}
                                >
                                    {link.icon}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ): null}
        </>
    );
};

export default Bottombar;
