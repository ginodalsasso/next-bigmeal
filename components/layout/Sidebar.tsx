"use client";

import Link from "next/link";
import IsUser from "../auth/isUser";
import IsAdmin from "../auth/isAdmin";
import { Carrot, Folder, ShoppingCart, SprayCan, Utensils } from "lucide-react";
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const pathname = usePathname();

    const links = [
        { icon: ShoppingCart, title: "Liste de courses",  url: "/shopping-list" },
        { icon: SprayCan,     title: "Produits ménagers", url: "/household-products" },
        { icon: Carrot,       title: "Ingrédients",       url: "/ingredients" },
        { icon: Utensils,     title: "Repas",             url: "/meals" },
    ];

    const renderLink = (link: { icon: React.ElementType; title: string; url: string }) => {
        const isActive = pathname === link.url || pathname.startsWith(link.url + "/");
        const Icon = link.icon;
        return (
            <li key={link.url}>
                <Link
                    href={link.url}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-accent ${
                        isActive
                            ? "bg-warm-accent/15 text-warm-primary"
                            : "text-warm-secondary hover:bg-warm-subtle hover:text-warm-primary"
                    }`}
                >
                    <Icon
                        size={17}
                        strokeWidth={isActive ? 2.5 : 1.75}
                        className={isActive ? "text-warm-accent" : "text-warm-secondary"}
                        aria-hidden="true"
                    />
                    {link.title}
                </Link>
            </li>
        );
    };

    return (
        <IsUser>
            <div className="sticky top-0 h-screen w-56 bg-warm-base py-6">
                <nav aria-label="Navigation principale">
                    <ul className="flex flex-col gap-1 px-3">
                        {links.map(renderLink)}
                        <IsAdmin>
                            {renderLink({ icon: Folder, title: "Catégories", url: "/categories" })}
                        </IsAdmin>
                    </ul>
                </nav>
            </div>
        </IsUser>
    );
};

export default Sidebar;
