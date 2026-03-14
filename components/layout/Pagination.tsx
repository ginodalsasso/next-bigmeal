'use client'

import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

interface PaginationProps {
    currentPage: number;
    hasNextPage: boolean;
}

export default function Pagination({ currentPage, hasNextPage }: PaginationProps) {

    const searchParams = useSearchParams();
    const pathname = usePathname();

    const createPageURL = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    return (
        <nav aria-label="Pagination" className="mt-6 flex items-center justify-between">
            {currentPage > 1 ? (
                <Button asChild variant="secondary" aria-label="Page précédente">
                    <Link href={createPageURL(currentPage - 1)}>
                        <ArrowLeft aria-hidden="true" />
                    </Link>
                </Button>
            ) : (
                <span />
            )}

            <span className="text-sm text-neutral-400" aria-current="page">
                Page {currentPage}
            </span>

            {hasNextPage ? (
                <Button asChild variant="secondary" aria-label="Page suivante">
                    <Link href={createPageURL(currentPage + 1)}>
                        <ArrowRight aria-hidden="true" />
                    </Link>
                </Button>
            ) : (
                <span />
            )}
        </nav>
    );
}
