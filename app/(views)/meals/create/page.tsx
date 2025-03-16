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

    const progress = {
        createMeal: "25%",
        createComposition: "50%",
        createPreparation: "75%",
        createStep: "100%",
    }[currentStep]; // Récupère la valeur de la clé correspondant à currentStep
    


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

    const goBack = () => {
        const steps = ["createMeal", "createComposition", "createPreparation", "createStep"];
        const currentIndex = steps.indexOf(currentStep);
        
        if (currentIndex > 0) {
            setCurrentStep(steps[currentIndex - 1] as "createMeal" | "createComposition" | "createPreparation" | "createStep");
        }
    };
    

    // _________________________ RENDU _________________________
    return (
        <div className="max-w-2xl mx-auto">

            <div>
                <h1 className="text-2xl font-bold">Nouveau repas</h1>
                <p className="text-gray-300 mt-2">
                    Créez un nouveau repas en ajoutant des compositions, des préparations et des étapes.
                </p>

            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-200 my-4">
                <div
                    className="h-2 bg-blue-500 transition-all"
                    style={{ width: progress }}
                />
            </div>
            
            {/* Etapes */}
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




            
            {currentStep !== "createMeal" && (
                <Button className="w-full mt-2" variant="cancel" type="button" onClick={goBack}>
                    Revenir en arrière
                </Button>

            )}
            {createdMealId && (
                
                <div className="flex justify-end mt-4">
                    <Button variant="ghost" onClick={() => setCurrentStep("createMeal")}>
                        Ajouter un autre repas
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CreateMealPage;