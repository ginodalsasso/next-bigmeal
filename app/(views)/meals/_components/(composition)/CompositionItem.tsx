"use client";

import React from "react";
import { translatedUnit, ucFirst } from "@/lib/utils";
import IsAdmin from "@/components/isAdmin";
import DeleteItem from "@/components/layout/DeleteItemDialog";
import EditItem from "@/components/layout/EditItemDrawer";
import UpdateComposition from "./UpdateComposition";
import { CompositionItemProps } from "@/lib/types/props_interfaces";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

// _________________________ COMPOSANT _________________________
const CompositionItem = ({ composition, onUpdate, onDelete }: CompositionItemProps) => {

    // _________________________ RENDU __________________
    return (
        <div className="group relative rounded-md border border-gray-100 bg-white p-2 transition-all shadow-sm hover:border-emerald-200 hover:shadow-sm">
            <div className="flex items-center">
                {/* Quantité et unité dans un badge */}
                <Badge 
                    variant="outline" 
                    className="mr-3 border-emerald-100 bg-emerald-50 font-medium text-emerald-700"
                >
                    {composition.quantity} {translatedUnit(composition.unit)}
                </Badge>
                
                {/* Nom d'ingrédient */}
                <p className="flex-1 font-medium text-gray-700">
                    {ucFirst(composition.ingredient?.name || "Ingrédient inconnu")}
                </p>
                
                {/* Menu d'actions admin avec Popover */}
                <IsAdmin>
                    <div className="ml-auto">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="link">
                                    <MoreVertical className="text-gray-500" />
                                </Button>
                                {/* </Button> */}
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