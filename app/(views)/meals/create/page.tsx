"use client";

// Bibliothèques tierces
import React, { useState } from "react";

// Composants
import CreateMeal from "../_components/CreateMeal";
import CreateComposition from "../_components/CreateComposition";
import { Button } from "@/components/ui/button";

// Types
import { MealType } from "@/lib/types/schemas_interfaces";

// _________________________ COMPONENT _________________________
const CreateMealPage = () => {

    // _________________________ ETATS _________________________
    const [createdMealId, setCreatedMealId] = useState<string | null>(null);
    const [currentStep, setCurrentStep] = useState<"createMeal" | "createComposition">("createMeal");

    // Callback pour la création de repas
    const handleMealCreated = (meal: MealType) => {
        setCreatedMealId(meal.id);
        setCurrentStep("createComposition");
    };

    // Callback pour la création de composition
    const handleCompositionCreated = () => {
        setCreatedMealId(null);
        setCurrentStep("createMeal");
    };


    // _________________________ RENDU _________________________
    return (
        <div className="p-5 max-w-2xl mx-auto">
            {currentStep === "createMeal" && (
                <CreateMeal onMealCreated={handleMealCreated} />
            )}
            
            {currentStep === "createComposition" && createdMealId && (
                <CreateComposition mealId={createdMealId} onSubmit={handleCompositionCreated} />
            )}
            
            {createdMealId && (
                <div className="flex justify-center mt-4">
                    <Button onClick={() => setCurrentStep("createMeal")} variant="secondary">
                        Ajouter un autre repas
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CreateMealPage;