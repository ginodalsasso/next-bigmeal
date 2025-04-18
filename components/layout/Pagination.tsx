'use client'

import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
    currentPage: number;
    hasNextPage: boolean;
}

export default function Pagination({ currentPage, hasNextPage }:PaginationProps) {

    const searchParams = useSearchParams(); // Récupérer les paramètres de recherche de l'URL ex: ?categories=plat&page=1
    const pathname = usePathname() // Récupérer le chemin de l'URL actuelle ex: /meals

    // Fonction pour créer une URL avec tous les paramètres actuels plus le numéro de page
    const createPageURL = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams.toString()); // paramètres de recherche actuels
        params.set('page', pageNumber.toString()); // attribuer le numéro de page à la clé 'page'
        
        return `${pathname}?${params.toString()}`; // ex:/meals?categories=plat&page=1
    };
    
    return (
        <div className="mt-4 flex justify-between">
            {currentPage > 1 && (
                <a 
                href={createPageURL(currentPage - 1)}
                className="bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                    Page Précédente
                </a>
            )}
            
            
            {hasNextPage && (
                <>
                    <span className="self-center">Page {currentPage}</span>
                    <a 
                    href={createPageURL(currentPage + 1)}
                    className="bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    >
                        Page Suivante
                    </a>
                </>
            )}
        </div>
    );
}
