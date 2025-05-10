"use client";

// Bibliothèques tierces
import React, { useState } from "react";

// Types
import { CompositionType, MealType, PreparationType, StepType } from "@/lib/types/schemas_interfaces";

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
    // COMPOSITION
    const createComposition = (compositions: CompositionType[]) => {
        setMeal((prevMeal) => {
            // Vérifie si `prevMeal` est nul ou non défini.
            if (!prevMeal) return prevMeal;
    
            // Retourne un nouvel objet pour `meal` avec la liste mise à jour des compositions
            return { ...prevMeal, compositions: [...compositions] };
        });
        setIsDialogOpen(false); 
    };

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

    // PREPARATION
    const createPreparation = (preparation: PreparationType) => {
        setMeal((prevMeal) => {
            if (!prevMeal) return prevMeal;
            return { ...prevMeal, preparation };
        });
        setIsDialogOpen(false);
    };

    const updatePreparation = (updatedPreparation: PreparationType) => {
        setMeal((prevMeal) => {
            if (!prevMeal) return prevMeal;
            return { ...prevMeal, preparation: updatedPreparation };
        });
    };

    const deletePreparation = () => {
        setMeal((prevMeal) => {
            if (!prevMeal) return prevMeal;
            return { ...prevMeal, preparation: undefined };
        });
    };

    // STEPS
    const createStep = (steps: StepType[]) => {
        setMeal((prevMeal) => {
            if (!prevMeal || !prevMeal.preparation) {
                return prevMeal;
            }
            return {
                ...prevMeal, 
                preparation: { 
                    ...prevMeal.preparation,
                    steps: { 
                        ...prevMeal.preparation?.steps,
                        steps: [...steps],
                    },
                },
            };
        });
        setIsDialogOpen(false);
    }
    
    // _________________________ RENDU _________________________
    if (!meal) return <div>Repas introuvable.</div>;

    return (
        <div className="mx-auto">
            {/* En-tête du repas */}
            <header className="mb-8 text-center">
                <h1 className="mb-3 text-4xl font-semibold">{ucFirst(meal.name)}</h1>
                <p className="text-gray-500">{meal.description || "Aucune description disponible pour ce repas."}</p>
            </header>
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

                                {!meal.preparation && (
                                    <Button 
                                        variant="success" 
                                        className="w-full" 
                                        onClick={() => {
                                            setCurrentAction("preparation");
                                            setIsDialogOpen(true);
                                        }}
                                    >
                                        Ajouter une préparation<Plus />
                                    </Button>
                                )}

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
                                    onSubmit={createComposition}
                                />
                            )}

                            {currentAction === "preparation" && (
                                <CreatePreparation
                                    mealId={meal.id}
                                    onSubmit={createPreparation}
                                />
                            )}

                            {currentAction === "step" && (
                                <CreateStep
                                    preparationId={meal.preparation?.id || ""}
                                    onSubmit={createStep}
                                />
                            )}
                        </DrawerContent>
                    </Drawer>
                </div>
            </IsAdmin>


            <div className="mt-8 grid gap-8 md:grid-cols-2">
                {/* Colonne des ingrédients */}
                <section className="rounded-lg border border-gray-100 bg-zinc-900 p-4">
                    <h2 className="mb-4 flex items-center text-2xl font-medium text-emerald-600">
                        Ingrédients
                    </h2>
                    
                    {meal.compositions.length > 0 ? (
                        <div className="space-y-3">
                            {meal.compositions.map((composition) => (
                                <CompositionItem
                                    key={composition.id}
                                    composition={composition}
                                    onUpdate={updateComposition}
                                    onDelete={deleteComposition}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">Aucun ingrédient disponible pour ce repas.</p>
                    )}
                </section>

                {/* Colonne de la préparation */}
                <section className="relative rounded-lg border border-gray-100 bg-zinc-900 p-4">
                    <h2 className="mb-4 flex items-center text-2xl font-medium text-emerald-600">
                        Recette
                    </h2>
                    
                    {meal.preparation ? (
                        <PreparationItem 
                            key={meal.preparation.id} 
                            fetchedPreparation={meal.preparation} 
                            onUpdate={updatePreparation}
                            onDelete={deletePreparation}
                        />
                    ) : (
                        <p className="text-gray-500">Aucune préparation disponible pour ce repas.</p>
                    )}
                </section>
            </div>
        </div>
    );
};