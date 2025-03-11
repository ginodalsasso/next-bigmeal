"use client";

// Bibliothèques tierces
import React, { useState } from "react";
import Image from "next/image";

// Types
import { CompositionType, MealType } from "@/lib/types/schemas_interfaces";

// Utils
import { translatedUnit, ucFirst } from "@/lib/utils";

// Composants
import CreateComposition from "../_components/CreateComposition";
import UpdateComposition from "../_components/UpdateComposition";
import IsAdmin from "@/components/isAdmin";
import DeleteItem from "@/components/layout/DeleteItemDialog";
import EditItem from "@/components/layout/EditItemDrawer";

// Composants UI
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Images
import add from "@/public/img/add.svg";

// Constantes
import API_ROUTES from "@/lib/constants/api_routes";


// _________________________ COMPOSANT _________________________
export default function MealItem( {fetchedMeal}: { fetchedMeal: MealType }) {

    // _________________________ ETATS _________________________
    const [meal, setMeal] = useState<MealType>(fetchedMeal);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    console.table(meal);
    console.table(meal.preparations);
    console.table(meal.preparations[0].steps);
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


    
    // _________________________ RENDU _________________________
    if (!meal) return <div>Repas introuvable.</div>;

    return (
        <div className="mx-auto border bg-neutral-900 p-6">
            <h1 className="mb-2 text-center text-4xl font-semibold text-emerald-500">{ucFirst(meal.name)}</h1>
            <p>{meal.description || "Aucune description disponible pour ce repas."}</p>
            <IsAdmin>
                <div className="mt-4">
                    {/* Dialog pour ajouter une composition */}
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="success" className="w-full" onClick={() => setIsDialogOpen(true)}>
                                <Image src={add} alt="Ajouter une composition" className="w-4" />
                                Ajouter une composition
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Ajouter une composition</DialogTitle>
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
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </IsAdmin>

            <div className="mt-6">
                {Array.isArray(meal.compositions) && meal.compositions.length > 0 ? (
                    meal.compositions.map((composition) => (
                        <div
                            key={composition.id}
                            className="flex items-center justify-between border-b py-2"
                        >
                            <p className="font-medium">{ucFirst(composition.ingredient?.name || "Ingrédient inconnu")}</p>
                            <div className="flex items-center gap-1">
                                <p>{composition.quantity}</p>
                                <p>{translatedUnit(composition.unit)}</p>
                                <IsAdmin>
                                    {/* Drawer pour l'édition */}
                                    <EditItem
                                        renderEditForm={(onClose) => (
                                            <UpdateComposition
                                                initialComposition={composition}                                
                                                onCompositionUpdated={updateComposition}
                                                onClose={onClose}
                                            />
                                        )}
                                    />

                                    <DeleteItem
                                        apiUrl={API_ROUTES.compositions}
                                        id={composition.id}
                                        onSubmit={deleteComposition}
                                    />
                                </IsAdmin>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">Aucun ingrédient disponible pour ce repas.</p>
                )}
            </div>
            <div>
                <p className="mt-6">Préparation :</p>
                <ul>
                    {Array.isArray(meal.preparations) && meal.preparations.length > 0 ? (
                        meal.preparations.map((preparation) => (
                            <li key={preparation.id}>
                                <p>Temps de préparation: {preparation.prepTime}</p>
                                <p>Temps de cuisson: {preparation.cookTime}</p>

                                <ul>
                                    {preparation.steps.map((step) => (
                                        <li key={step.id}>
                                            {step.stepNumber}.{step.description}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500">Aucune préparation disponible pour ce repas.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};