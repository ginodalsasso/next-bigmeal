"use client";

import { ucFirst } from "@/lib/utils";
import Link from "next/link";
import React, { useState } from "react";
import IsUser from "../isUser";
import Image from "next/image";

const Sidebar = () => {
    const [active, setActive] = useState(""); // État de la navigation active

    // Liens de navigation
    const links = [
        { icon: "/img/cart.svg", title: "liste de courses", url: "/shopping-list" },
        { icon: "/img/ingredient.svg", title: "ingrédients", url: "/ingredients" },
        { icon: "/img/meal.svg", title: "repas", url: "/meals" },
    ];

    const categories = [
        { title: "Catégorie Ingrédient", url: "/categories-ingredient" },
        { title: "Catégorie Repas", url: "/categories-meal" },
    ];

    return (
        <IsUser>
            <div className="sticky h-screen bg-neutral-900 py-4">
                <ul className="px-4">
                    {links.map((link) => (
                        <li className="align-icon flex-wrap-reverse" key={link.title}>
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

                    {/* Catégorie déroulante */}
                    <li className="flex items-baseline gap-6">
                        <Image src="/img/folder.svg" width={20} height={20} alt="Catégorie" />
                        <div className="w-full">
                            <details className="group">
                                <summary className="flex cursor-pointer items-center justify-between py-2 text-[18px] text-gray-200 hover:underline">
                                    Catégories 
                                    <span className="text-[12px] transition-transform duration-300 group-open:rotate-90">
                                        <Image src="/img/triangle.svg" width={8} height={8} alt="Catégorie" />
                                    </span>
                                    

                                </summary>
                                <ul>
                                    {categories.map((category) => (
                                        <li key={category.title}>
                                            <Link
                                                href={category.url}
                                                className="text-gray-200 hover:underline"
                                                onClick={() => setActive(category.title)}
                                            >
                                                {ucFirst(category.title)}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </details>
                        </div>
                    </li>

                </ul>
            </div>
        </IsUser>
    );
};

export default Sidebar;
