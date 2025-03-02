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

// Composants UI
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

// Images
import add from "@/public/img/add.svg";
import API_ROUTES from "@/lib/constants/api_routes";
import EditItem from "@/components/layout/EditItemDrawer";


// _________________________ COMPOSANT _________________________
export default function MealItem( {fetchedMeal}: { fetchedMeal: MealType }) {

    // _________________________ ETATS _________________________
    const [meal, setMeal] = useState<MealType>(fetchedMeal);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState<string | null>(null);

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
                                    onClose={() => setIsDialogOpen(false)}
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
        </div>
    );
};