"use client";

import React, { useState } from "react";
import { PreparationType, StepType } from "@/lib/types/schemas_interfaces";
import IsAdmin from "@/components/isAdmin";
import EditItem from "@/components/layout/EditItemDrawer";
import UpdatePreparation from "./UpdatePreparation";
import DeleteItem from "@/components/layout/DeleteItemDialog";
import StepItem from "./(step)/StepItem";
import { PreparationItemProps } from "@/lib/types/props_interfaces";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ClockIcon, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// _________________________ COMPOSANT _________________________
const PreparationItem = ({ fetchedPreparation, onUpdate, onDelete }: PreparationItemProps) => {

    const [preparation, setPreparation] = useState<PreparationType>(fetchedPreparation);

    const updatePreparation = async (updatedPreparation: PreparationType) => {
        setPreparation(updatedPreparation); // Mettre à jour l'état local avec la préparation mise à jour
        await onUpdate(updatedPreparation); // Appeler onUpdate pour le parent MealItem
    }

    const updateStep = (updatedStep: StepType) => {
        setPreparation((prevPreparation) => { 
            if (!prevPreparation) return prevPreparation;

            const updatedSteps = prevPreparation.steps.map((step) =>
                step.id === updatedStep.id
                    ? { ...step, ...updatedStep }
                    : step
            );

            return { ...prevPreparation, steps: updatedSteps };
        });
    }

    const deleteStep = (id: string) => {
        setPreparation((prevPreparation) => {
            if (!prevPreparation) return prevPreparation;
            return {
                ...prevPreparation,
                steps: prevPreparation.steps.filter((step) => step.id !== id)
            };
        });
    }

    // _________________________ RENDU _________________________
    return (
        <div className="card-content space-y-2">
            <div className="p-2">
                <div className="flex items-center justify-between">
                
                    <div className="flex flex-wrap gap-3 pt-2">
                        <Badge variant="outline" className="border-orange-100 bg-orange-50 text-orange-700">
                            <ClockIcon className="mr-1 size-3.5" />
                            Préparation: {preparation.prepTime} min
                        </Badge>
                        
                        <Badge variant="outline" className="border-red-100 bg-red-50 text-red-700">
                            <ClockIcon className="mr-1 size-3.5" />
                            Cuisson: {preparation.cookTime} min
                        </Badge>
                    </div>
                    {/* Menu d'actions admin avec Popover */}
                    <IsAdmin>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" size="sm" className="size-8 p-0">
                                    <MoreVertical className="size-4 text-gray-500" />
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
                <ol className="w-full space-y-4">
                    {preparation.steps.map((step) => (
                            <li key={step.id} className="card-content p-4">
                                <StepItem
                                    key={step.id}
                                    step={step}
                                    onUpdate={updateStep}
                                    onDelete={deleteStep}
                                />
                            </li>
                        ))}
                </ol>
            ) : (
                <p className="text-center text-gray-500">Aucune étape n&apos;a été ajoutée à cette préparation.</p>
            )}
        </div>
    );
}

export default PreparationItem;