'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import add from "@/public/img/add.svg";
import { MealType } from "@/lib/types/schemas_interfaces";

import ItemView from "@/components/layout/ItemView";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import CreateMeal from "./_components/CreateMeal";
import UpdateMeal from "./_components/UpdateMeal";
import CreateComposition from "./_components/CreateComposition";
import AddToShoppingListForm from "@/components/forms/AddToShoppingListForm";


// _________________________ COMPOSANT _________________________
const MealsPage = () => {

    // _________________________ ETATS _________________________
    const [meals, setMeals] = useState<MealType[]>([]);
    const [currentStep, setCurrentStep] = useState<"createMeal" | "createComposition" | "chooseStep">("createMeal"); // étape pour la création de repas ou de composition
    const [createdMealId, setCreatedMealId] = useState<string | null>(null);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    // _________________________ LOGIQUE _________________________
    // Récupérer les repas
    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const response = await fetch("/api/meals");
                if (!response.ok) {
                    throw new Error("Failed to fetch meals");
                }
                const data: MealType[] = await response.json();
                setMeals(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des repas:", error);
                setError("Erreur lors de la récupération des repas");
            } finally {
                setLoading(false);
            }
        };
        fetchMeals();
    }, []);

    // Réinitialiser l'étape à createMeal lorsque le dialogue est fermé
    useEffect(() => {
        if (!isDialogOpen) {
            setCurrentStep("createMeal");
            setCreatedMealId(null);
        }
    }, [isDialogOpen]);

    // Ajouter un repas
    const addMeal = (meal: MealType) => {
        setMeals((prevMeals) => [...prevMeals, meal]);
        setCreatedMealId(meal.id); // Enregistrer l'ID du repas créé
        setCurrentStep("chooseStep"); // Passer à l'étape de choix
    };

    // Ajouter une composition
    const addComposition = () => {
        toast("Composition ajoutée avec succès");
        setIsDialogOpen(false);
        setCurrentStep("createMeal"); // Revenir à l'étape de création de repas
        setCreatedMealId(null); // Réinitialiser l'ID du repas créé
    };

    // Appel API pour modifier un repas
    const updateMeal = async (id:string, newName: string, newCategoryId: string, newDescription: string|null) => {
        try {
            const response = await fetch("/api/meals", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    id, 
                    name: newName, 
                    categoryMealId: newCategoryId, 
                    description: newDescription 
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to update meal");
            }
            // Mettre à jour le repas dans le state
            const updatedMeal: MealType = await response.json();
            setMeals((prev) => // Remplacer l'ancien repas par le nouveau
                prev.map((meal) =>
                    // si l'ID du repas correspond à l'ID du repas modifié, on le remplace
                    meal.id === updatedMeal.id ? updatedMeal : meal
                )
            );
            toast("Repas modifié avec succès");
        } catch (error) {
            console.error("Erreur lors de la modification:", error);
            setError("Erreur lors de la modification.");
        }
    };

    // Appel API pour supprimer un repas
    const deleteMeal = async (id: string) => {
        try {
            const response = await fetch("/api/meals", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                throw new Error("Failed to delete meal");
            }
            // Si l'ID du repas correspond à l'ID du repas supprimé, on le filtre pour le retirer
            setMeals((prev) => prev.filter((meal) => meal.id !== id));
            toast("Repas supprimé avec succès");
        } catch (error) {
            console.error("Erreur lors de la suppression:", error);
            setError("Erreur lors de la suppression.");
        }
    };
    

    // _________________________ RENDU _________________________
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!meals) return <div>Repas introuvables.</div>;

    return (
        <>
            {/* Dialogue pour ajouter un repas ou une composition*/}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="success" onClick={() => setIsDialogOpen(true)}>
                        <Image
                            src={add}
                            alt="Ajouter un repas"
                            className="w-4"
                        />
                        Ajouter un repas 
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {/* Formulaire de création de repas ou de composition */}
                            {currentStep === "createMeal" ? "Ajouter un repas" : currentStep === "createComposition" ? "Ajouter une composition" : "Choisir une étape"}
                        </DialogTitle>
                        {currentStep === "createMeal" && (
                            <CreateMeal
                                onMealCreated={addMeal} // Appelé lors de la création d'un repas
                                onClose={() => setIsDialogOpen(false)} // Appelé lors de la fermeture du dialogue
                            />
                        )}
                        {currentStep === "createComposition" && createdMealId && (
                            <CreateComposition
                                mealId={createdMealId} // ID du repas pour lequel on ajoute une composition
                                onCompositionCreated={addComposition} // Appelé lors de la création d'une composition
                                onClose={() => { // Appelé lors de la fermeture du dialogue
                                    setIsDialogOpen(false); // Fermer le dialogue
                                    setCurrentStep("createMeal"); // Revenir à l'étape initiale
                                }}
                            />
                        )}
                        {/* Choisir entre ajouter une composition ou un repas */}
                        {currentStep === "chooseStep" && (
                            <div>
                                <Button onClick={() => setCurrentStep("createComposition")}>Ajouter une composition</Button>
                                <Button onClick={() => setCurrentStep("createMeal")}>Ajouter un autre repas</Button>
                            </div>
                        )}
                    </DialogHeader>
                </DialogContent>
            </Dialog> 
                
            {/* Liste des repas */}
            <div className="cards-wrapper">
                <div className="cards-list">
                    {meals.map((meal) => (
                        <div key={meal.id}>
                            <AddToShoppingListForm type={'meal'} id={meal.name} />
                            <ItemView
                                key={meal.id}
                                title={meal.name}
                                details={{
                                    category: meal.categoryMeal?.name || "Non spécifié",
                                    description: meal.description,
                                }}
                                // Formulaire de mise à jour
                                renderEditForm={(onClose) => ( // 
                                    <UpdateMeal
                                        initialName={meal.name}
                                        initialCategory={meal.categoryMeal?.id || ""}
                                        initialDescription={meal.description || ""}
                                        onSubmit={async (newName, newCategory, newDescription) => {
                                            await updateMeal( 
                                                meal.id, 
                                                newName, 
                                                newCategory, 
                                                newDescription || null
                                            );
                                            onClose();
                                        }}
                                        onCancel={onClose}
                                        isLoading={false}
                                        error={null}
                                    />
                                )}
                                onDelete={() => deleteMeal(meal.id)}
                                isDeleting={false}
                                linkToDetails={`/meals/${meal.name}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default MealsPage;
