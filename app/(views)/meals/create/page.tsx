"use client";

// Bibliothèques tierces
import React, { useState } from "react";

// Composants
import CreateMeal from "../_components/CreateMeal";
import CreateComposition from "../_components/(composition)/CreateComposition";
import CreatePreparation from "../_components/(preparation)/CreatePreparation";
import CreateStep from "../_components/(preparation)/(step)/CreateStep";
import { Button } from "@/components/ui/button";

// Types
import { MealType, PreparationType } from "@/lib/types/schemas_interfaces";

// _________________________ COMPONENT _________________________
const CreateMealPage = () => {

    // _________________________ ETATS _________________________
    const [createdMealId, setCreatedMealId] = useState<string | null>(null);
    const [createdPreparationId, setCreatedPreparationId] = useState<string | null>(null);
    const [currentStep, setCurrentStep] = useState<
        "createMeal" |
        "createComposition" | 
        "createPreparation" | 
        "createStep"
    >("createMeal");

    // Callback pour la création de repas
    const handleMealCreated = (meal: MealType) => {
        setCreatedMealId(meal.id);
        setCurrentStep("createComposition");
    };

    // Callback pour la création de composition
    const handleCompositionCreated = () => {
        setCurrentStep("createPreparation");
    };

    // Callback pour la création de préparation
    const handlePreparationCreated = (preparation: PreparationType) => {
        setCreatedPreparationId(preparation.id);
        setCurrentStep("createStep");
    };
    
    const handleStepCreated = () => {
        setCreatedMealId(null);
        setCreatedPreparationId(null);
        setCurrentStep("createMeal");
    }


    // _________________________ RENDU _________________________
    return (
        <div className="p-5 max-w-2xl mx-auto">
            {currentStep === "createMeal" && (
                <CreateMeal onMealCreated={handleMealCreated} />
            )}
            
            {currentStep === "createComposition" && createdMealId && (
                <CreateComposition mealId={createdMealId} onSubmit={handleCompositionCreated} />
            )}

            {currentStep === "createPreparation" && createdMealId && (
                <CreatePreparation mealId={createdMealId} onSubmit={handlePreparationCreated} />
            )}

            {currentStep === "createStep" && createdMealId && createdPreparationId && (
                <CreateStep preparationId={createdPreparationId} onSubmit={handleStepCreated} />
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