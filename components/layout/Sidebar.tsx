"use client";

import Link from "next/link";
import React from "react";
import IsUser from "../isUser";
import { Carrot, Folder, ShoppingCart, SprayCan, Utensils } from "lucide-react";
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const pathname = usePathname();

    const links = [
        { icon: ShoppingCart, title: "Liste de courses",  url: "/shopping-list" },
        { icon: SprayCan,     title: "Produits ménagers", url: "/household-products" },
        { icon: Carrot,       title: "Ingrédients",       url: "/ingredients" },
        { icon: Utensils,     title: "Repas",             url: "/meals" },
        { icon: Folder,       title: "Catégories",        url: "/categories" },
    ];

    return (
        <IsUser>
            <div className="sticky top-0 h-screen w-56 bg-neutral-900 py-6">
                <nav aria-label="Navigation principale">
                    <ul className="flex flex-col gap-1 px-3">
                        {links.map((link) => {
                            const isActive =
                                pathname === link.url ||
                                pathname.startsWith(link.url + "/");
                            const Icon = link.icon;
                            return (
                                <li key={link.url}>
                                    <Link
                                        href={link.url}
                                        aria-current={isActive ? "page" : undefined}
                                        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 ${
                                            isActive
                                                ? "bg-orange-500/10 text-orange-400"
                                                : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                                        }`}
                                    >
                                        <Icon
                                            size={17}
                                            strokeWidth={isActive ? 2.5 : 1.75}
                                            className={isActive ? "text-orange-400" : "text-neutral-500"}
                                            aria-hidden="true"
                                        />
                                        {link.title}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </IsUser>
    );
};

export default Sidebar;
