"use client";

import { links } from "@/lib/constants/constants";
import { ucFirst } from "@/lib/utils";
import Link from "next/link";
import React, { useState } from "react";
import IsUser from "../isUser";
import Image from "next/image";

const Sidebar = () => {
        const [active, setActive] = useState(""); // État de la navigation active
        

    return (
        <>
            <IsUser>
                <div className="sticky h-screen bg-neutral-900 py-4">
                    <ul className="px-4">
                        {links.map((link) => (
                            <li className="align-icon flex-wrap-reverse	" key={link.title}>
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
                    </ul>
                </div>.
            </IsUser>
        </>
    );
};

export default Sidebar;
