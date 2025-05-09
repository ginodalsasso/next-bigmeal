"use client";

// Bibliothèques tierces
import React, { useState } from "react";

// Types
import { CompositionType, MealType, PreparationType } from "@/lib/types/schemas_interfaces";

// Composants
import CreateComposition from "./(composition)/CreateComposition";
import IsAdmin from "@/components/isAdmin";
import CreatePreparation from "./(preparation)/CreatePreparation";
import CreateStep from "./(preparation)/(step)/CreateStep";

// Composants UI
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

// Constantes
import CompositionItem from "./(composition)/CompositionItem";
import PreparationItem from "./(preparation)/PreparationItem";
import { ucFirst } from "@/lib/utils";
import { Plus } from "lucide-react";


// _________________________ COMPOSANT _________________________
export default function MealItem( {fetchedMeal}: { fetchedMeal: MealType }) {

    // _________________________ ETATS _________________________
    const [meal, setMeal] = useState<MealType>(fetchedMeal);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [currentAction, setCurrentAction] = useState<"composition" | "preparation" | "step">("composition");

    // _________________________ CRUD _________________________
    const updateComposition = (updatedComposition: CompositionType) => {
        setMeal((prevMeal) => {
            // Vérifie si `prevMeal` est nul ou non défini.
            if (!prevMeal) return prevMeal;
    
            // Mise à jour des compositions en parcourant le tableau `prevMeal.compositions`
            const updatedCompositions = prevMeal.compositions.map((composition) =>
                // Si l'ID de la composition correspond à celui de `updatedComposition`
                composition.id === updatedComposition.id
                    ? { ...composition, ...updatedComposition } // On fusionne les propriétés existantes et mises à jour
                    : composition // Sinon, on garde la composition inchangée
            );
    
            // Retourne un nouvel objet pour `meal` avec la liste mise à jour des compositions
            return { ...prevMeal, compositions: updatedCompositions };
        });
    };
    
    // Suppression d'un repas dans le state après suppression API
    const deleteComposition = (id: string) => {
        setMeal((prevMeal) => {
            if (!prevMeal) return prevMeal; // Vérifie si prevMeal est nul ou non défini.
            return {
                ...prevMeal, // Copie des propriétés existantes
                compositions: prevMeal.compositions.filter(
                    // Retourne toutes les compositions sauf celle avec l'ID correspondant
                    (composition) => composition.id !== id
                ),
            };
        });
    };

    const updatePreparation = async (updatedPreparation: PreparationType) => {
        setMeal((prevMeal) => {
            if (!prevMeal) return prevMeal;
            const updatedPreparations = prevMeal.preparations.map((preparation) =>
                preparation.id === updatedPreparation.id
                    ? { ...preparation, ...updatedPreparation }
                    : preparation
            );
            return { ...prevMeal, preparations: updatedPreparations };
        });
    };

    const deletePreparation = (id: string) => {
        setMeal((prevMeal) => {
            if (!prevMeal) return prevMeal;
            return {
                ...prevMeal,
                preparations: prevMeal.preparations.filter(
                    (preparation) => preparation.id !== id
                ),
            };
        });
    }


    
    // _________________________ RENDU _________________________
    if (!meal) return <div>Repas introuvable.</div>;

    return (
        <div className="mx-auto border bg-neutral-900 p-6">
            <h1 className="mb-2 text-center text-4xl font-semibold text-emerald-500">{ucFirst(meal.name)}</h1>
            <p>{meal.description || "Aucune description disponible pour ce repas."}</p>
            <IsAdmin>
                <div className="mt-4">
                    {/* Dialog pour ajouter une composition ou une préparation */}
                    <Drawer open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DrawerTrigger asChild>
                            <div className="flex flex-col gap-4">
                                <Button 
                                    variant="success" 
                                    className="w-full" 
                                    onClick= {() => {
                                        setCurrentAction("composition");
                                        setIsDialogOpen(true);
                                    }}
                                >
                                    Ajouter une composition<Plus />
                                </Button>
                                
                                <Button 
                                    variant="success" 
                                    className="w-full" 
                                    onClick= {() => {
                                        setCurrentAction("preparation");
                                        setIsDialogOpen(true);
                                    }}
                                >
                                    Ajouter une préparation<Plus />
                                </Button>

                                <Button 
                                    variant="success" 
                                    className="w-full" 
                                    onClick= {() => {
                                        setCurrentAction("step");
                                        setIsDialogOpen(true);
                                    }}
                                >
                                    Ajouter une étape<Plus />
                                </Button>
                            </div>
                            
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>
                                    {currentAction === "composition" && "Ajouter une composition"}
                                    {currentAction === "preparation" && "Ajouter une préparation"}
                                    {currentAction === "step" && "Ajouter des étapes"}
                                </DrawerTitle>
                            </DrawerHeader>
                            {currentAction === "composition" && (
                                <CreateComposition
                                    mealId={meal.id}
                                    onSubmit={(compositions) => {
                                        setMeal((prevMeal) => {
                                            if (!prevMeal) return prevMeal;
                                            return { ...prevMeal, compositions: [...compositions] };
                                        });
                                        setIsDialogOpen(false);
                                    }}
                                />
                            )}

                            {currentAction === "preparation" && (
                                <CreatePreparation
                                    mealId={meal.id}
                                    onSubmit={(preparation) => {
                                        setMeal((prevMeal) => {
                                            if (!prevMeal) return prevMeal;
                                            return { ...prevMeal, preparation };
                                        });
                                        setIsDialogOpen(false);
                                    }}
                                />
                            )}

                            {currentAction === "step" && (
                                <CreateStep
                                    preparationId={meal.preparations} 
                                    onSubmit={(newStep) => {
                                        setMeal((prevMeal) => {
                                            if (!prevMeal) return prevMeal;
                                            return {
                                                ...prevMeal,
                                                preparations: prevMeal.preparations.map((preparation) => {
                                                    if (preparation.id) {
                                                        return {
                                                            ...preparation,
                                                            steps: [...(preparation.steps || []), newStep]
                                                        };
                                                    }
                                                    return preparation;
                                                })
                                            };
                                        });

                                        setIsDialogOpen(false);
                                    }}
                                />
                            )}
                        </DrawerContent>
                    </Drawer>
                </div>
            </IsAdmin>

            <div className="mt-6">
                {meal.compositions.length > 0 ? (
                    meal.compositions.map((composition) => (
                        <CompositionItem
                            key={composition.id}
                            composition={composition}
                            onUpdate={updateComposition}
                            onDelete={deleteComposition}
                        />
                    ))
                ) : (
                    <p className="text-gray-500">Aucun ingrédient disponible pour ce repas.</p>
                )}
            </div>
            <div>
                <p className="mt-6">Préparation :</p>
                <ul>
                    {meal.preparations.length > 0 ? (
                        meal.preparations.map((preparation) => (
                            <PreparationItem 
                                key={preparation.id} 
                                fetchedPreparation={preparation} 
                                onUpdate={updatePreparation}
                                onDelete={deletePreparation}
                            />
                        ))
                    ) : (
                        <p className="text-gray-500">Aucune préparation disponible pour ce repas.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};