"use client";

import { useEffect, useState } from "react";
import { PreparationType, StepType } from "@/lib/types/schemas_interfaces";
import IsAdmin from "@/components/auth/isAdmin";
import EditItem from "@/components/catalog/EditItemDrawer";
import UpdatePreparation from "./UpdatePreparation";
import DeleteItem from "@/components/catalog/DeleteItemDialog";
import StepItem from "./(step)/StepItem";
import { PreparationItemProps } from "@/lib/types/props_interfaces";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ClockIcon, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PreparationItem = ({ fetchedPreparation, onUpdate, onDelete }: PreparationItemProps) => {

    const [preparation, setPreparation] = useState<PreparationType>(fetchedPreparation);

    useEffect(() => {
        if (fetchedPreparation.steps) {
            setPreparation((prev) => ({ ...prev, steps: fetchedPreparation.steps }));
        }
    }, [fetchedPreparation.steps]);

    const updatePreparation = async (updatedPreparation: PreparationType) => {
        setPreparation((prev) => ({ ...prev, ...updatedPreparation, steps: prev.steps }));
        await onUpdate(updatedPreparation);
    };

    const updateStep = (updatedStep: StepType) => {
        setPreparation((prevPreparation) => {
            if (!prevPreparation) return prevPreparation;
            const updatedSteps = prevPreparation.steps.map((step) =>
                step.id === updatedStep.id ? { ...step, ...updatedStep } : step
            );
            return { ...prevPreparation, steps: updatedSteps };
        });
    };

    const deleteStep = (id: string) => {
        setPreparation((prevPreparation) => {
            if (!prevPreparation) return prevPreparation;
            const reorderedSteps = prevPreparation.steps
                .filter((step) => step.id !== id)
                .map((step, index) => ({ ...step, stepNumber: index + 1 }));
            return { ...prevPreparation, steps: reorderedSteps };
        });
    };

    return (
        <div className="card-content space-y-2">
            <div className="p-2">
                <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2 pt-1">
                        <Badge variant="outline" className="border-warm-border bg-warm-accent/15 text-warm-primary">
                            <ClockIcon className="mr-1 size-3.5" />
                            Préparation : {preparation.prepTime} min
                        </Badge>

                        <Badge variant="outline" className="border-warm-border bg-warm-danger/10 text-warm-danger">
                            <ClockIcon className="mr-1 size-3.5" />
                            Cuisson : {preparation.cookTime} min
                        </Badge>
                    </div>

                    <IsAdmin>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" size="sm" className="size-8 p-0">
                                    <MoreVertical className="size-4 text-warm-secondary" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto">
                                <div className="flex gap-2">
                                    <EditItem
                                        renderEditForm={(onClose) => (
                                            <UpdatePreparation
                                                initialPreparation={preparation}
                                                onSubmit={updatePreparation}
                                                onClose={onClose}
                                            />
                                        )}
                                    />
                                    <DeleteItem
                                        apiUrl="/api/preparation"
                                        id={preparation.id}
                                        onSubmit={onDelete}
                                    />
                                </div>
                            </PopoverContent>
                        </Popover>
                    </IsAdmin>
                </div>
            </div>

            {preparation.steps && preparation.steps.length > 0 ? (
                <ol className="w-full space-y-3 p-2">
                    {preparation.steps.map((step) => (
                        <li key={step.id} className="card-content p-3">
                            <StepItem
                                step={step}
                                onUpdate={updateStep}
                                onDelete={deleteStep}
                            />
                        </li>
                    ))}
                </ol>
            ) : (
                <p className="py-4 text-center text-sm text-warm-secondary">
                    Aucune étape n&apos;a été ajoutée à cette préparation.
                </p>
            )}
        </div>
    );
};

export default PreparationItem;
