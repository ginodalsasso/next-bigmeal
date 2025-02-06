"use client";

// import { useAuth } from "@/app/context/AuthContext";
import { links } from "@/lib/constants/constants";
import { ucFirst } from "@/lib/utils";
import Link from "next/link";
import React, { useState } from "react";

const Sidebar = () => {
        const [active, setActive] = useState(""); // État de la navigation active
        // const { isAuth } = useAuth(); // Utilisation du contexte d'authentification
        

    return (
        <>
            {/* {isAuth ? ( */}
                <div className="h-screen sticky bg-neutral-900 py-4">
                    <ul>
                        {links.map((link) => (
                            <li key={link.title}>
                                <Link
                                    href={link.url}
                                    className={`block px-4 py-2 ${
                                        active === link.title
                                            ? "bg-gray-200 text-black"
                                            : "text-gray-200 hover:bg-gray-200 hover:text-black"
                                    }`}
                                    onClick={() => setActive(link.title)}
                                >
                                    {ucFirst(link.title)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            {/* ): null} */}
        </>
    );
};

export default Sidebar;
