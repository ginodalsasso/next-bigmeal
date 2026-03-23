"use client";

import React from "react";
import { translatedUnit, ucFirst } from "@/lib/utils";
import IsAdmin from "@/components/auth/isAdmin";
import DeleteItem from "@/components/catalog/DeleteItemDialog";
import EditItem from "@/components/catalog/EditItemDrawer";
import UpdateComposition from "./UpdateComposition";
import { CompositionItemProps } from "@/lib/types/props_interfaces";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

const CompositionItem = ({ composition, onUpdate, onDelete }: CompositionItemProps) => {
    return (
        <div className="card-content group relative p-2">
            <div className="flex items-center">
                <Badge
                    variant="outline"
                    className="mr-3 shrink-0 border-warm-border bg-warm-accent/15 font-medium text-warm-primary"
                >
                    {composition.quantity} {translatedUnit(composition.unit)}
                </Badge>

                <p className="flex-1 text-sm font-medium text-warm-primary">
                    {ucFirst(composition.ingredient?.name || "Ingrédient inconnu")}
                </p>

                <IsAdmin>
                    <div className="ml-auto">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="link" aria-label="Actions">
                                    <MoreVertical className="text-warm-secondary" aria-hidden="true" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto">
                                <div className="flex gap-2">
                                    <EditItem
                                        renderEditForm={(onClose) => (
                                            <UpdateComposition
                                                initialComposition={composition}
                                                onSubmit={onUpdate}
                                                onClose={onClose}
                                            />
                                        )}
                                    />
                                    <DeleteItem
                                        apiUrl="/api/compositions"
                                        id={composition.id}
                                        onSubmit={onDelete}
                                    />
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </IsAdmin>
            </div>
        </div>
    );
};

export default CompositionItem;
