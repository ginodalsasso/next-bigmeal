"use client";

import React, { useState } from "react";

import { CompositionType, MealType, PreparationType, StepType } from "@/lib/types/schemas_interfaces";

import CreateComposition from "./(composition)/CreateComposition";
import IsAdmin from "@/components/isAdmin";
import CreatePreparation from "./(preparation)/CreatePreparation";
import CreateStep from "./(preparation)/(step)/CreateStep";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Bookmark, ChefHat, ClipboardList, Plus, Sparkles, Utensils } from "lucide-react";

import CompositionItem from "./(composition)/CompositionItem";
import PreparationItem from "./(preparation)/PreparationItem";
import { ucFirst } from "@/lib/utils";
import { notFound } from "next/navigation";
import ShareButton from "@/components/ShareButton";
import { URL } from "@/lib/constants/api_routes";


export default function MealItem( {fetchedMeal}: { fetchedMeal: MealType }) {

    const [meal, setMeal] = useState<MealType>(fetchedMeal);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [currentAction, setCurrentAction] = useState<"composition" | "preparation" | "step">("composition");

    const createComposition = (compositions: CompositionType[]) => {
        setMeal((prevMeal) => {
            if (!prevMeal) return prevMeal;
            return { ...prevMeal, compositions: [...compositions] };
        });
        setIsDialogOpen(false);
    };

    const updateComposition = (updatedComposition: CompositionType) => {
        setMeal((prevMeal) => {
            if (!prevMeal) return prevMeal;
            const updatedCompositions = prevMeal.compositions.map((composition) =>
                composition.id === updatedComposition.id
                    ? { ...composition, ...updatedComposition }
                    : composition
            );
            return { ...prevMeal, compositions: updatedCompositions };
        });
    };

    const deleteComposition = (id: string) => {
        setMeal((prevMeal) => {
            if (!prevMeal) return prevMeal;
            return {
                ...prevMeal,
                compositions: prevMeal.compositions.filter(
                    (composition) => composition.id !== id
                ),
            };
        });
    };

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

    const createStep = (steps: StepType[]) => {
        setMeal((prevMeal) => {
            if (!prevMeal || !prevMeal.preparation) return prevMeal;
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
    };

    if (!meal) return notFound();

    return (
        <div className="mx-auto max-w-4xl space-y-6">

            {/* En-tête */}
            <header className="relative rounded-xl border border-warm-border bg-warm-subtle p-6 text-center">
                <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-full bg-warm-accent/15">
                    <ChefHat size={26} className="text-warm-accent" aria-hidden="true" />
                </div>
                <h1 className="mb-1 text-2xl font-bold text-warm-primary">{ucFirst(meal.name)}</h1>
                {meal.categoryMeal && (
                    <span className="mb-2 inline-block rounded-full bg-warm-accent/15 px-3 py-0.5 text-xs font-medium text-warm-primary">
                        {meal.categoryMeal.name}
                    </span>
                )}
                <p className="mx-auto max-w-2xl text-sm text-warm-secondary">
                    {meal.description || "Aucune description disponible pour ce repas."}
                </p>
                <ShareButton
                    className="absolute right-4 top-4 text-warm-disabled hover:text-warm-accent"
                    title={meal.name}
                    text={meal.description || "Aucune description disponible pour ce repas."}
                    url={`${URL}/meals/${meal.name}`}
                />
            </header>

            {/* Conseil */}
            <div className="flex items-start gap-3 rounded-xl border border-warm-border bg-warm-muted px-4 py-3">
                <Bookmark size={16} className="mt-0.5 shrink-0 text-warm-accent" aria-hidden="true" />
                <p className="text-sm text-warm-secondary">
                    Préparez tous vos ingrédients à l&apos;avance pour faciliter la réalisation de cette recette.
                </p>
            </div>

            {/* Options admin */}
            <IsAdmin>
                <div className="rounded-xl border border-warm-border bg-warm-subtle p-4">
                    <h2 className="h2-title">
                        <Sparkles className="h2-icons" />
                        Options d&apos;administration
                    </h2>
                    <Drawer open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <div className="flex flex-wrap gap-2">
                            <Button
                                variant="default"
                                className="w-full"
                                onClick={() => { setCurrentAction("composition"); setIsDialogOpen(true); }}
                            >
                                <Utensils className="button-icons" />
                                Ajouter des ingrédients
                            </Button>

                            {!meal.preparation && (
                                <Button
                                    variant="default"
                                    className="w-full"
                                    onClick={() => { setCurrentAction("preparation"); setIsDialogOpen(true); }}
                                >
                                    <ClipboardList className="button-icons" />
                                    Ajouter une préparation
                                </Button>
                            )}

                            {meal.preparation && (
                                <Button
                                    variant="default"
                                    className="w-full"
                                    onClick={() => { setCurrentAction("step"); setIsDialogOpen(true); }}
                                >
                                    <Plus className="button-icons" />
                                    Ajouter des étapes
                                </Button>
                            )}
                        </div>

                        <DrawerContent className="px-4">
                            <DrawerHeader>
                                <DrawerTitle>
                                    {currentAction === "composition" && "Ajouter des ingrédients"}
                                    {currentAction === "preparation" && "Ajouter une préparation"}
                                    {currentAction === "step" && "Ajouter des étapes"}
                                </DrawerTitle>
                            </DrawerHeader>

                            {currentAction === "composition" && (
                                <CreateComposition mealId={meal.id} onSubmit={createComposition} />
                            )}
                            {currentAction === "preparation" && (
                                <CreatePreparation mealId={meal.id} onSubmit={createPreparation} />
                            )}
                            {currentAction === "step" && (
                                <CreateStep preparationId={meal.preparation?.id || ""} onSubmit={createStep} />
                            )}
                        </DrawerContent>
                    </Drawer>
                </div>
            </IsAdmin>

            {/* Contenu principal : ingrédients + préparation */}
            <div className="grid gap-6 md:grid-cols-2">

                <section className="card">
                    <h2 className="h2-title">
                        <Utensils className="h2-icons" />
                        Ingrédients
                    </h2>

                    {meal.compositions.length > 0 ? (
                        <div className="space-y-2">
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
                        <div className="rounded-xl bg-warm-muted py-6 text-center">
                            <Utensils className="mx-auto mb-2 size-8 text-warm-disabled" />
                            <p className="text-sm text-warm-secondary">Aucun ingrédient renseigné.</p>
                        </div>
                    )}
                </section>

                <section className="card">
                    <h2 className="h2-title">
                        <ClipboardList className="h2-icons"/>
                        Préparation
                    </h2>

                    {meal.preparation ? (
                        <PreparationItem
                            key={meal.preparation.id}
                            fetchedPreparation={meal.preparation}
                            onUpdate={updatePreparation}
                            onDelete={deletePreparation}
                        />
                    ) : (
                        <div className="rounded-xl bg-warm-muted py-6 text-center">
                            <ClipboardList className="mx-auto mb-2 text-warm-disabled" />
                            <p className="text-sm text-warm-secondary">Aucune préparation renseignée.</p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
