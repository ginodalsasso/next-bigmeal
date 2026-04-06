"use client";

import IsAdmin from "@/components/auth/isAdmin";
import EditItem from "@/components/catalog/EditItemDrawer";
import DeleteItem from "@/components/catalog/DeleteItemDialog";
import UpdateStep from "./UpdateStep";
import { StepItemProps } from "@/lib/types/props_interfaces";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";

const StepItem = ({ step, onUpdate, onDelete }: StepItemProps) => {
    return (
        <div className="flex w-full items-start gap-3">
            <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-warm-accent/15 text-sm font-semibold text-warm-accent">
                {step.stepNumber}
            </span>

            <p className="flex-1 break-words text-sm text-warm-primary">
                {step.description}
            </p>

            <IsAdmin>
                <div className="ml-auto shrink-0">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon" aria-label="Actions" className="size-7 text-warm-secondary hover:bg-warm-subtle">
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
};

export default StepItem;
