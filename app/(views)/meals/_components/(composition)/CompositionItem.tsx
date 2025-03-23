"use client";

import React from "react";
import { translatedUnit, ucFirst } from "@/lib/utils";
import IsAdmin from "@/components/isAdmin";
import DeleteItem from "@/components/layout/DeleteItemDialog";
import EditItem from "@/components/layout/EditItemDrawer";
import UpdateComposition from "./UpdateComposition";
import { CompositionItemProps } from "@/lib/types/props_interfaces";

// _________________________ COMPOSANT _________________________
const CompositionItem = ({ composition, onUpdate, onDelete }: CompositionItemProps) => {

    // _________________________ RENDU __________________
    return (
        <div className="flex items-center justify-between border-b py-2">
            <p className="font-medium">{ucFirst(composition.ingredient?.name || "Ingrédient inconnu")}</p>
            <div className="flex items-center gap-1">
                <p>{composition.quantity}</p>
                <p>{translatedUnit(composition.unit)}</p>
                <IsAdmin>
                    <EditItem
                        renderEditForm={(onClose) => (
                            <UpdateComposition
                                initialComposition={composition}
                                onSubmit={onUpdate}
                                onClose={onClose}
                            />
                        )}
                    />
                    <DeleteItem apiUrl="/api/compositions" id={composition.id} onSubmit={onDelete} />
                </IsAdmin>
            </div>
        </div>
    );
};

export default CompositionItem;