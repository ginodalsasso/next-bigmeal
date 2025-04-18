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
import { useRouter } from "next/navigation";

// _________________________ COMPONENT _________________________
const CreateMealPage = () => {
    const router = useRouter()

    // _________________________ ETATS _________________________
    const [createdMealId, setCreatedMealId] = useState<string | null>(null);
    const [createdPreparationId, setCreatedPreparationId] = useState<string | null>(null);
    const [currentStep, setCurrentStep] = useState<
        "createMeal" |
        "createComposition" | 
        "createPreparation" | 
        "createStep"
    >("createMeal");

    // Barre de progression en fonction de l'étape actuelle
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
        router.push("/meals");
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
        <div className="mx-auto max-w-2xl">

            <div>
                <h1 className="text-2xl font-bold">Nouveau repas</h1>
                <p className="mt-2 text-gray-300">
                    Créez un nouveau repas en ajoutant des compositions, des préparations et des étapes.
                </p>

            </div>

            {/* Progress Bar */}
            <div className="my-8 h-2 w-full bg-gray-200">
                <div
                    className="h-2 bg-blue-500 transition-all"
                    style={{ width: progress }}
                />
                <p className="mt-1 text-center text-sm">{ progress }</p>
            </div>
            
            {/* Etapes */}
            {currentStep === "createMeal" && (
                <CreateMeal onSubmit={handleMealCreated} />
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
                <Button className="mt-2 w-full" variant="cancel" type="button" onClick={goBack}>
                    Revenir en arrière
                </Button>

            )}
            {createdMealId && (
                
                <div className="mt-4 flex justify-end">
                    <Button variant="ghost" onClick={() => setCurrentStep("createMeal")}>
                        Ajouter un autre repas
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CreateMealPage;