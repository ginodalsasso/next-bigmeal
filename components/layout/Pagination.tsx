'use client'

import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
        <div className="mt-6 flex justify-between">
            {currentPage > 1 && (
                <Button variant="secondary">
                    <a href={createPageURL(currentPage - 1)}>
                        <ArrowLeft/>
                    </a>
                </Button>
            )}
            
            <span className="self-center">Page {currentPage}</span>
            
            {hasNextPage && (
                <>
                    <Button variant="secondary">
                        <a href={createPageURL(currentPage + 1)}>
                            <ArrowRight/>
                        </a>
                    </Button>
                </>
            )}
        </div>
    );
}
