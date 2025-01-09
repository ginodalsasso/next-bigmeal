"use client";

import { useAuth } from "@/app/context/AuthContext";
import { ucFirst } from "@/lib/utils";
import Link from "next/link";
import React, { useState } from "react";

const Sidebar = () => {
        const [active, setActive] = useState(""); // État de la navigation active
        const { isAuth } = useAuth(); // Utilisation du contexte d'authentification
        

        // Liens de navigation
        const links = [
            { title: "ingrédients", url: "/ingredients" },
            { title: "repas", url: "/meals" },
            { title: "catégorie ingrédient", url: "/categories-ingredient" },
            { title: "catégorie repas", url: "/categories-meal" },
            { title: "liste de courses", url: "/shopping-list" },
        ];
    return (
        <>
            {isAuth ? (
                <div className="h-screen sticky flex flex-col p-4">
                    <ul className="space-y-4">
                        {links.map((link) => (
                            <li key={link.title}>
                                <Link
                                    href={link.url}
                                    className={`block px-4 py-2 ${
                                        active === link.title
                                            ? "bg-gray-600 text-white font-bold"
                                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                    }`}
                                    onClick={() => setActive(link.title)}
                                >
                                    {ucFirst(link.title)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ): null}
        </>
    );
};

export default Sidebar;
