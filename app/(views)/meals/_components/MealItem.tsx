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
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Bookmark, ChefHat, ClipboardList, Plus, Sparkles, Utensils } from "lucide-react";

// Constantes
import CompositionItem from "./(composition)/CompositionItem";
import PreparationItem from "./(preparation)/PreparationItem";
import { ucFirst } from "@/lib/utils";
import { notFound } from "next/navigation";


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
    if (!meal) return  notFound();

    return (
        <div className="mx-auto max-w-4xl space-y-8">
            {/* En-tête du repas */}
            <header className="header-card">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <ChefHat size={36} />
                </div>
                <h1 className="h1-title">{ucFirst(meal.name)}</h1>
                <p className="mx-auto max-w-2xl text-emerald-600">
                    {meal.description || "Aucune description disponible pour ce repas."}
                </p>
            </header>

            {/* Boutons d'administration */}
            <IsAdmin>
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                    <h2 className="h2-title">
                        <Sparkles className="h2-icons" />
                        Options d&apos;administration
                    </h2>
                    <Drawer open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <div className="flex flex-wrap gap-2">
                            <Button 
                                variant="success" 
                                className="w-full"
                                onClick={() => {
                                    setCurrentAction("composition");
                                    setIsDialogOpen(true);
                                }}
                            >
                                <Utensils className="button-icons" />
                                Ajouter des ingrédients
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
                                    <ClipboardList className="button-icons" />
                                    Ajouter une préparation
                                </Button>
                            )}

                            {meal.preparation && (
                                <Button 
                                    variant="success"
                                    className="w-full"
                                    onClick={() => {
                                        setCurrentAction("step");
                                        setIsDialogOpen(true);
                                    }}
                                >
                                    <Plus className="button-icons" />
                                    Ajouter des étapes
                                </Button>
                            )}
                        </div>
                        
                        <DrawerContent className="px-4">
                            <DrawerHeader>
                                <DrawerTitle>
                                    {currentAction === "composition" && (
                                        <>
                                            Ajouter des ingrédients
                                        </>
                                    )}
                                    {currentAction === "preparation" && (
                                        <>
                                            Ajouter une préparation
                                        </>
                                    )}
                                    {currentAction === "step" && (
                                        <>
                                            Ajouter des étapes
                                        </>
                                    )}
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

            {/* Note  */}
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-800">
                <div className="flex items-start">
                    <Bookmark />
                    <div className="ml-3">
                        <h3 className="font-medium">Conseil de préparation</h3>
                        <p className="mt-1 text-sm">
                            Préparez tous vos ingrédients à l&apos;avance pour faciliter la réalisation de cette recette.
                        </p>
                    </div>
                </div>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
                {/* Liste des ingrédeints */}
                <section className="card">
                    <h2 className="h2-title">
                        <Utensils className="h2-icons" />
                        Liste des ingrédients
                    </h2>
                    
                    {meal.compositions.length > 0 ? (
                        <div className="space-y-4">
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
                        <div className="rounded-md bg-gray-50 py-6 text-center">
                            <Utensils className="mx-auto mb-3 size-8 text-gray-300" />
                            <p className="text-gray-500">Aucun ingrédient disponible pour ce repas.</p>
                            <p className="mt-1 text-sm text-gray-400">
                                Ajoutez des ingrédients en cliquant sur le bouton ci-dessus
                            </p>
                        </div>
                    )}
                </section>

                {/* section de préparation */}
                <section className="card">
                    <h2 className="h2-title">
                        <ClipboardList className="h2-icons"/>
                        Instructions de préparation
                    </h2>
                    
                    {meal.preparation ? (
                        <PreparationItem 
                            key={meal.preparation.id} 
                            fetchedPreparation={meal.preparation} 
                            onUpdate={updatePreparation}
                            onDelete={deletePreparation}
                        />
                    ) : (
                        <div className="rounded-md bg-gray-50 py-6 text-center">
                            <ClipboardList className="mx-auto mb-3 text-gray-300" />
                            <p className="text-gray-500">Aucune préparation disponible pour ce repas.</p>
                            <p className="mt-1 text-sm text-gray-400">
                                Ajoutez une méthode de préparation en cliquant sur le bouton ci-dessus
                            </p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};