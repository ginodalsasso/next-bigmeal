import React from "react";
import Link from "next/link";

interface ButtonProps {
    label?: string;
    href?: string;
    style: string;
    type?: "button" | "submit" | "reset"; // Type de bouton
    disabled?: boolean; // Désactive le bouton
    onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void; // fonction otpionnelle
}

const Button: React.FC<ButtonProps> = ({ label, href, type, style, onClick }) => {
    // Vérifie si le bouton est un lien et si onClick n'est pas défini
    if(href && !onClick) {
        return (
            <Link
                className={style}
                href={href}
            >
                {label}
            </Link>
        );
    }

    // sinon on retourne un bouton
    return (
        <button className={style} type={type} onClick={onClick}>
            {label}
        </button>
    );
};

export default Button;
