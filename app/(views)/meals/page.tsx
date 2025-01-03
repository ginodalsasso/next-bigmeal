'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import add from "@/public/img/add.svg";
import { MealType } from "@/lib/types/schemas_interfaces";

import ItemView from "@/components/layout/ItemView";
import EditItem from "@/components/layout/EditItem";
import DeleteItem from "@/components/layout/DeleteItem";

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
    const updateMeal = async (id: string, newName: string, newCategoryId: string, newDescription: string | null) => {
        try {
            const response = await fetch("/api/meals", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, name: newName, categoryMealId: newCategoryId, description: newDescription }),
            });

            if (!response.ok) {
                throw new Error("Failed to update meal");
            }
            // Mettre à jour le repas dans le state
            const updatedMeal: MealType = await response.json();
            setMeals((prev) =>
                prev.map((meal) =>
                    meal.id === updatedMeal.id ? updatedMeal : meal // Si l'ID correspond, remplacer par le nouveau
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
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                throw new Error("Failed to delete meal");
            }
            // Supprimer le repas du state
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
            {/* Dialogue pour ajouter un repas ou une composition */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="success" onClick={() => setIsDialogOpen(true)}>
                        <Image src={add} alt="Ajouter un repas" className="w-4" />
                        Ajouter un repas
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {currentStep === "createMeal"
                                ? "Ajouter un repas"
                                : currentStep === "createComposition"
                                ? "Ajouter une composition"
                                : "Choisir une étape"}
                        </DialogTitle>
                        {currentStep === "createMeal" && (
                            <CreateMeal
                                onMealCreated={addMeal}
                                onClose={() => setIsDialogOpen(false)}
                            />
                        )}
                        {currentStep === "createComposition" && createdMealId && (
                            <CreateComposition
                                mealId={createdMealId}
                                onCompositionCreated={addComposition}
                                onClose={() => {
                                    setIsDialogOpen(false);
                                    setCurrentStep("createMeal");
                                }}
                            />
                        )}
                        {currentStep === "chooseStep" && (
                            <div>
                                <Button onClick={() => setCurrentStep("createComposition")}>
                                    Ajouter une composition
                                </Button>
                                <Button onClick={() => setCurrentStep("createMeal")}>
                                    Ajouter un autre repas
                                </Button>
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
                            <AddToShoppingListForm type="meal" id={meal.name} />
                            <ItemView
                                title={meal.name}
                                details={{
                                    category: meal.categoryMeal?.name || "Non spécifié",
                                    description: meal.description,
                                }}
                                linkToDetails={`/meals/${meal.name}`}
                            />
                            <div className="flex gap-2 mt-2">
                                {/* Édition du repas */}
                                <EditItem
                                    renderEditForm={(onClose) => (
                                        <UpdateMeal
                                            initialName={meal.name}
                                            initialCategory={meal.categoryMeal?.id || ""}
                                            initialDescription={meal.description || ""}
                                            onSubmit={async (newName, newCategory, newDescription) => {
                                                await updateMeal(meal.id, newName, newCategory, newDescription || null);
                                                onClose();
                                            }}
                                            onCancel={onClose}
                                            isLoading={false}
                                            error={null}
                                        />
                                    )}
                                />
                                {/* Suppression du repas */}
                                <DeleteItem
                                    onDelete={() => deleteMeal(meal.id)}
                                    isDeleting={false}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default MealsPage;
