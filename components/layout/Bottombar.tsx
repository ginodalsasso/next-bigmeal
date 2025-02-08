"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import IsUser from "../isUser";



const Bottombar = () => {
    const [active, setActive] = useState(""); // État de la navigation active

    // const [cartItems, setCartItems] = useState(0); // État pour le nombre d'articles

    // useEffect(() => {
    //     const fetchCart = async () => {
    //         const response = await fetch("/api/shopping-list/shopping-list-items");
    //         const data = await response.json();
    //         if (data.totalCartQuantity) {
    //             setCartItems(data.totalCartQuantity);
    //         } else {
    //             setCartItems(0);
    //         }

    //     };
    //     fetchCart();
    // }, []);
// Définition des liens avec chemins des SVG

    const links = [
        { icon: "/img/home.svg", url: "/", alt: "Accueil"},
        // { icon: "/img/user.svg", url: `/${user?.username}`, alt: "Profil" },
        { icon: "/img/cart.svg", url: "/shopping-list", alt: "Liste de courses" },
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
                                            ? "text-blue-500"
                                            : "text-gray-500"
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
                                {/* {link.url === "/shopping-list" && cartItems > 0 && (
                                    <span>{cartItems}</span>
                                )} */}
                            </li>
                        ))}
                    </ul>
                </div>
            </IsUser>
        </>
    );
};

export default Bottombar;
