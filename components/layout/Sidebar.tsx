"use client";

import { ucFirst } from "@/lib/utils";
import Link from "next/link";
import React, { useState } from "react";
import IsUser from "../isUser";
import { Carrot, Folder, ShoppingCart, SprayCan, Utensils } from "lucide-react";

const Sidebar = () => {
    const [active, setActive] = useState(""); // État de la navigation active

    // Liens de navigation
    const links = [
        { icon: <ShoppingCart />, title: "liste de courses", url: "/shopping-list" },
        { icon: <SprayCan />, title: "Produits ménagers", url: "/household-products" },
        { icon: <Carrot />, title: "ingrédients", url: "/ingredients" },
        { icon: <Utensils />, title: "repas", url: "/meals" },
        { icon:<Folder />, title: "catégorie ingrédient", url: "/categories-ingredient" },
        { icon:<Folder />, title: "catégorie repas", url: "/categories-meal" },
        { icon:<Folder />, title: "catégorie produits ménagers", url: "/categories-household-product" }
        
    ];

    return (
        <IsUser>
            <div className="sticky h-screen bg-neutral-900 py-4">
                <ul className="px-4">
                    {links.map((link) => (
                        <li className="align-icon flex-wrap-reverse" key={link.title}>
                            {link.icon && link.icon}
                            <Link
                                href={link.url}
                                className={`block py-2 text-[18px] text-gray-200 ${
                                    active === link.title
                                        ? "text-black underline"
                                        : "hover:underline"
                                }`}
                                onClick={() => setActive(link.title)}
                            >
                                {ucFirst(link.title)}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </IsUser>
    );
};

export default Sidebar;
