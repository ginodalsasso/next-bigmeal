"use client";

import React from "react";
import IsAdmin from "@/components/isAdmin";
import EditItem from "@/components/layout/EditItemDrawer";
import DeleteItem from "@/components/layout/DeleteItemDialog";
import UpdateStep from "./UpdateStep";
import { StepItemProps } from "@/lib/types/props_interfaces";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";

// _________________________ COMPOSANT _________________________
const StepItem = ({ step, onUpdate, onDelete }: StepItemProps) => {

    // _________________________ RENDU _________________________
    return (
        <div className="flex w-full">
            {/* Première ligne: contenu */}
            <div className="flex items-start gap-2">
                {/* Numéro d'étape */}
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-semibold text-orange-800">
                    {step.stepNumber}
                </span>

                <p className="flex-1 break-all text-sm font-medium text-zinc-900">
                    {step.description}
                </p>
            </div>

            {/* Menu d'actions admin avec Popover */}
            <IsAdmin>
                <div className="ml-auto">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="link" size="icon" aria-label="Actions" className="size-8 text-zinc-500 hover:bg-zinc-100">
                                <MoreVertical className="size-4" aria-hidden="true" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto">
                            <div className="flex gap-2">
                                <EditItem
                                    renderEditForm={(onClose) => (
                                        <UpdateStep
                                            initialStep={step}
                                            onSubmit={onUpdate}
                                            onClose={onClose}
                                        />
                                    )}
                                />
                                <DeleteItem 
                                    apiUrl="/api/step" 
                                    id={step.id} 
                                    onSubmit={onDelete} 
                                />
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </IsAdmin>
        </div>
    );
}

export default StepItem;