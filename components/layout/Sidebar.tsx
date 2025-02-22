"use client";

import { ucFirst } from "@/lib/utils";
import Link from "next/link";
import React, { useState } from "react";
import IsUser from "../isUser";
import Image from "next/image";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

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
                    <li className="align-icon flex-wrap-reverse">
                        <Image src="/img/folder.svg" width={20} height={20} alt="Catégorie" />
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="flex py-2 text-[18px] text-gray-200 hover:underline">
                                        Catégories
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent className="bg-neutral-800 p-2">
                                        <ul className="flex flex-col">
                                            {categories.map((category) => (
                                                <li key={category.title}>
                                                    <Link
                                                        href={category.url}
                                                        className="block px-3 py-2 text-gray-200 hover:underline"
                                                        onClick={() => setActive(category.title)}
                                                    >
                                                        {ucFirst(category.title)}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </li>
                </ul>
            </div>
        </IsUser>
    );
};

export default Sidebar;
