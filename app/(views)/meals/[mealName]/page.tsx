"use client";

import React, { useEffect, useState, use } from "react";
import { MealType } from "@/lib/types/schemas_interfaces";
import { translatedUnit } from "@/lib/utils";
import CreateComposition from "../_components/CreateComposition";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import add from "@/public/img/add.svg";

const MealDetailPage = 
    ({ 
        params 
    }: { 
        params: Promise<{ mealName: string }> 
    }) => {

    const { mealName } = use(params);

    // _________________________ ETATS _________________________
    const [meal, setMeal] = useState<MealType | null>(null); // Détails du repas
    const [loading, setLoading] = useState(true); // Indique si les données sont en cours de chargement
    const [error, setError] = useState<string | null>(null); // Erreur éventuelle
    const [isDialogOpen, setIsDialogOpen] = useState(false); // État pour le dialogue

    // _________________________ LOGIQUE _________________________
    useEffect(() => {
        const fetchMeal = async () => {
            try {
                const response = await fetch(`/api/meals/${mealName}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch meal");
                }
                const data: MealType = await response.json();
                setMeal({ ...data, compositions: data.compositions || [] }); // Initialiser compositions
            } catch (error) {
                console.error("Erreur lors de la récupération du repas :", error);
                setError("Erreur lors de la récupération du repas");
            } finally {
                setLoading(false);
            }
        };
        fetchMeal();
    }, [mealName]);

    // _________________________ RENDU _________________________
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!meal) return <div>Repas introuvable.</div>;

    return (
        <div className="border rounded-lg p-6 xl:w-[70%] mx-auto">
            {/* Titre du repas */}
            <h1 className="text-4xl font-semibold text-emerald-500 text-center mb-2">
                {meal.name}
            </h1>
            <p>{meal.description || "Aucune description disponible pour ce repas."}</p>

            {/* Dialogue pour ajouter une composition */}
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
                            onCompositionCreated={(compositions) => { // Ajouter les compositions au repas
                                setMeal((prev) => { 
                                    // Si aucune composition n'existe, retourner l'état précédent
                                    if (!prev) return prev;
                                    return {
                                        ...prev,
                                        // Ajouter les nouvelles compositions sans écraser les anciennes
                                        compositions: [...(prev.compositions || []), ...compositions],
                                    };
                                });
                                setIsDialogOpen(false); // Fermer le dialogue après ajout
                            }}
                            onClose={() => setIsDialogOpen(false)} // Fermer le dialogue
                        />
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            {/* Liste des compositions du repas */}
            <div className="mt-6">
                {/* tableau des compositions */}
                {Array.isArray(meal.compositions) && meal.compositions.length > 0 ? ( // Vérifier si des compositions sont disponibles
                    meal.compositions.map((composition, index) => (
                        // Afficher les détails de la composition avec l'index comme clé
                        <div key={`${composition.id}-${index}`} className="flex justify-between items-center border-b py-2">
                            <p className="font-medium">{composition.ingredient.name}</p>
                            <div className="flex items-center gap-1">
                                <p>{composition.quantity}</p>
                                <p>{translatedUnit(composition.unit)}</p>
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
