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
                    <h2 className="text-xl font-bold hover:underline">{ucFirst(title)}</h2>
                </Link>
            ) : (
                <h2 className="text-xl font-bold">{ucFirst(title)}</h2>
            )}

            <div className="flex">
                {Object.entries(details).map(([key, value]) =>
                    badgeKeys.includes(key) ? (
                        <p key={key}>{ucFirst(value as string)}</p>
                    ) : (
                        <Badge key={key}>
                            {ucFirst(value as string)}
                        </Badge>
                    )
                )}
            </div>
        </>
    );
};

export default ItemView;
