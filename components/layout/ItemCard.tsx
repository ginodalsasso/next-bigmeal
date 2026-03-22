import React from "react";
import IsAdmin from "@/components/isAdmin";

type ItemCardProps = {
    adminActions?: React.ReactNode;
    children: React.ReactNode;
    footer?: React.ReactNode;
};

export default function ItemCard({ adminActions, children, footer }: ItemCardProps) {
    return (
        <article className="relative flex h-full flex-col rounded-xl border border-warm-border bg-warm-card shadow-sm transition-shadow hover:shadow-md">
            {adminActions && (
                <IsAdmin>
                    <div className="absolute right-1 top-1 z-10">
                        {adminActions}
                    </div>
                </IsAdmin>
            )}

            <div className="flex flex-1 flex-col">
                {children}
            </div>

            {footer && (
                <div className="border-t border-warm-border px-3 py-2">
                    {footer}
                </div>
            )}
        </article>
    );
}
