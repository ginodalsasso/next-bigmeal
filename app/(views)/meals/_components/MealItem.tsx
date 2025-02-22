"use client";

import React, { useState } from "react";
import { CompositionType, MealType } from "@/lib/types/schemas_interfaces";
import { translatedUnit, ucFirst } from "@/lib/utils";
import CreateComposition from "../_components/CreateComposition";
import UpdateComposition from "../_components/UpdateComposition";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import add from "@/public/img/add.svg";
import IsAdmin from "@/components/isAdmin";
import { getCsrfToken } from "next-auth/react";

// _________________________ COMPOSANT _________________________
export default function MealItem( {fetchedMeal}: { fetchedMeal: MealType }) {

    // _________________________ ETATS _________________________
    const [meal, setMeal] = useState<MealType>(fetchedMeal);
    const [error, setError] = useState<string | null>(null);
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
    
    
    const deleteComposition = async (id: string) => {
        const csrfToken = await getCsrfToken();
        try {
            const response = await fetch("/api/compositions", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-Token": csrfToken,
                },
                body: JSON.stringify({ id }),
            });
            if (!response.ok) throw new Error("Failed to delete composition");

            setMeal((prevMeal) => {
                if (!prevMeal) return prevMeal;
                return {
                    ...prevMeal,
                    compositions: prevMeal.compositions.filter(
                        (composition) => composition.id !== id
                    ),
                };
            });
            
            toast("Composition supprimée avec succès");
        } catch (error) {
            console.error("Erreur lors de la suppression:", error);
            setError("Erreur lors de la suppression.");
        }
    };

    
    // _________________________ RENDU _________________________
    if (error) return <div>{error}</div>;
    if (!meal) return <div>Repas introuvable.</div>;

    return (
        <div className="mx-auto border bg-neutral-900 p-6 xl:w-[70%]">
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
                                    {/* Popover pour l'édition */}
                                    <Popover 
                                        open={isPopoverOpen === composition.id}
                                        onOpenChange={(open) => {
                                            setIsPopoverOpen(open ? composition.id : null);
                                        }}
                                    >
                                        <PopoverTrigger asChild>
                                            <Button variant="edit">Modifier</Button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <UpdateComposition
                                                initialComposition={composition}                                
                                                onCompositionUpdated={updateComposition}
                                                onClose={() => setIsPopoverOpen(null)}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <Button
                                        variant="delete"
                                        onClick={() => deleteComposition(composition.id)}
                                    >
                                        Supprimer
                                    </Button>
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