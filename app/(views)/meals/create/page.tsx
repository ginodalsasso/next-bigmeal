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

    // Titres pour chaque étape
    const stepTitles = {
        createMeal: "Création du repas",
        createComposition: "Ajout des ingrédients",
        createPreparation: "Définition des préparations",
        createStep: "Description des étapes"
    };
    
    // Messages pour chaque étape
    const stepMessages = {
        createMeal: "Commencez par créer un nouveau repas en remplissant les informations de base.",
        createComposition: "Ajoutez maintenant les ingrédients qui composent votre repas.",
        createPreparation: "Définissez les temps de préparation nécessaires pour réaliser ce repas.",
        createStep: "Décrivez les étapes détaillées pour préparer ce repas.",
    };

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

            <h1 className="text-center text-2xl font-bold">Nouveau repas</h1>

            {/* Progress Bar */}
            <p className="mt-3 text-center text-sm">{ progress }</p>
            <div className="h-2 w-full bg-gray-200">
                <div
                    className="h-2 bg-blue-500 transition-all"
                    style={{ width: progress }}
                />
            </div>

            {/* Message contextualisé pour l'étape actuelle */}
            <div className="my-8 rounded-md border border-blue-200 bg-blue-50 p-4">
                <h2 className="text-lg font-semibold text-blue-700">{stepTitles[currentStep]}</h2>
                <p className="text-blue-600">{stepMessages[currentStep]}</p>
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