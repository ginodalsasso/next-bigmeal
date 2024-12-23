"use client";

import React, { useEffect, useState, use } from "react";
import { CompositionType, MealType } from "@/lib/types/schemas_interfaces";
import { translatedUnit } from "@/lib/utils";
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

const MealDetailPage = 
    ({ 
        params 
    }: { 
        params: Promise<{ mealName: string }> 
    }) => {
    const { mealName } = use(params);

    // _________________________ ETATS _________________________
    const [meal, setMeal] = useState<MealType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState<string | null>(null);

    // _________________________ LOGIQUE _________________________
    useEffect(() => {
        const fetchMeal = async () => {
            try {
                const response = await fetch(`/api/meals/${mealName}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch meal");
                }
                const data: MealType = await response.json();
                setMeal(data);
            } catch (error) {
                console.error("Erreur lors de la récupération du repas :", error);
                setError("Erreur lors de la récupération du repas");
            } finally {
                setLoading(false);
            }
        };
        fetchMeal();
    }, [mealName]);


    const handleUpdateComposition = (updatedComposition: CompositionType) => {
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
        try {
            const response = await fetch("/api/compositions", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                throw new Error("Failed to delete composition");
            }
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
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!meal) return <div>Repas introuvable.</div>;

    return (
        <div className="border rounded-lg p-6 xl:w-[70%] mx-auto">
            <h1 className="text-4xl font-semibold text-emerald-500 text-center mb-2">{meal.name}</h1>
            <p>{meal.description || "Aucune description disponible pour ce repas."}</p>

            <div className="mt-4">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="success" onClick={() => setIsDialogOpen(true)}>
                            <Image src={add} alt="Ajouter une composition" className="w-4" />
                            Ajouter une composition
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Ajouter une composition</DialogTitle>
                            <CreateComposition
                                mealId={meal.id}
                                onCompositionCreated={(compositions) => {
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

            <div className="mt-6">
                {Array.isArray(meal.compositions) && meal.compositions.length > 0 ? (
                    meal.compositions.map((composition) => (
                        <div
                            key={composition.id}
                            className="flex justify-between items-center border-b py-2"
                        >
                            <p className="font-medium">{composition.ingredient?.name || "Ingrédient inconnu"}</p>
                            <div className="flex items-center gap-1">
                                <p>{composition.quantity}</p>
                                <p>{translatedUnit(composition.unit)}</p>
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
                                            onCompositionUpdated={handleUpdateComposition}
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

export default MealDetailPage;