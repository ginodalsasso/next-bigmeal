import React from "react";
import { Badge } from "@/components/ui/badge";
import { ucFirst } from "@/lib/utils";
import Link from "next/link";

interface ItemViewProps<T extends object> {
    title: string;
    details: T;
    linkToDetails?: string;
}

const ItemView = <T extends object>({
    title,
    details,
    linkToDetails,
}: ItemViewProps<T>) => {
    const badgeKeys = ["description"]; // Clés à afficher sous forme de badge

    return (
        <>
            {linkToDetails ? (
                <Link href={linkToDetails} passHref> 
                    <p className="mb-2 text-xl font-bold hover:underline">{ucFirst(title)}</p>
                </Link>
            ) : (
                <p className="mb-2 text-wrap text-xl font-bold">{ucFirst(title)}</p>
            )}

            <div className="flex">
                {Object.entries(details).map(([key, value]) =>
                    badgeKeys.includes(key) ? (
                        value ? ( // Vérifie que la valeur n'est pas null ou undefined
                            <p key={key}>
                                {ucFirst(value as string)}
                                </p>
                        ) : null
                    ) : value ? (
                        <Badge key={key}>
                            {ucFirst(value as string)}
                        </Badge>
                    ) : null
                )}
            </div>
        </>
    );
};

export default ItemView;
