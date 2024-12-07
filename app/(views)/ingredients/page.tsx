'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import add from "@/public/img/add.svg";
import { IngredientType } from "@/lib/types/schemas_interfaces";

import ItemView from "@/app/(views)/_components/ItemView";
import CreateIngredient from "../_components/(formsComponents)/CreateIngredient";
import UpdateIngredient from "../_components/(formsComponents)/UpdateIngredient";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { translatedSeason } from "@/lib/utils";


// _________________________ COMPOSANT _________________________
const IngredientPage = () => {

    // _________________________ ETATS _________________________
    const [ingredients, setIngredients] = useState<IngredientType[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    // _________________________ LOGIQUE _________________________
    // Récupérer les ingrédients
    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await fetch("/api/ingredients");
                if (!response.ok) {
                    throw new Error("Failed to fetch ingredients");
                }
                const data: IngredientType[] = await response.json();
                setIngredients(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des ingrédients:", error);
                setError("Erreur lors de la récupération des ingrédients");
            } finally {
                setLoading(false);
            }
        };
        fetchIngredients();
    }, []);


    // Fonction pour ajouter un ingrédient à la liste
    const addIngredient = (ingredient: IngredientType) => {
        setIngredients((prevIngredients) => [...prevIngredients, ingredient]);
    };

    // Appel API pour mettre à jour un ingrédient
    const updateIngredient = async (id: string, newName: string, newCategory: string, newSeason: string) => {
        try {
            const response = await fetch("/api/ingredients", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, name: newName, categoryIngredientId: newCategory, season: newSeason }),
            });

            if (!response.ok) {
                throw new Error("Failed to update ingredient");
            }
            // Mettre à jour l'ingrédient dans le state
            const updatedIngredient: IngredientType = await response.json();
            setIngredients((prev) => // Remplacer l'ancien ingrédient par le nouveau
                prev.map((ingredient) =>
                    ingredient.id === id ? updatedIngredient : ingredient
                )
            );
            toast("Ingrédient modifié avec succès");
        } catch (error) {
            console.error("Erreur lors de la modification:", error);
            setError("Erreur lors de la modification.");
        }
    };

    // Appel API pour supprimer un ingrédient
    const deleteIngredient = async (id: string) => {
        try {
            const response = await fetch("/api/ingredients", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                throw new Error("Failed to delete ingredient");
            }

            setIngredients((prev) => prev.filter((ingredient) => ingredient.id !== id));
            toast("Ingrédient supprimé avec succès");
        } catch (error) {
            console.error("Erreur lors de la suppression:", error);
            setError("Erreur lors de la suppression.");
        }
    };
    

    // _________________________ RENDU _________________________
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!ingredients) return <div>Ingrédients introuvables.</div>;

    return (
        <>
            {/* Dialogue pour ajouter un ingrédient */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="success" onClick={() => setIsDialogOpen(true)}>
                        <Image
                            src={add}
                            alt="Ajouter un ingrédient"
                            className="w-4"
                        />
                        Ajouter un ingrédient 
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="mb-5 text-center">Ajouter un ingrédient</DialogTitle>
                        {/* Formulaire de création d'ingrédient */}
                        <CreateIngredient
                            onIngredientCreated={addIngredient}
                            onClose={() => setIsDialogOpen(false)}
                        />
                    </DialogHeader>
                </DialogContent>
            </Dialog>
                
            {/* Liste des ingrédients */}
            <div className="cards-wrapper">
                <div className="cards-list">
                    {ingredients.map((ingredient) => (
                        <ItemView
                            key={ingredient.id}
                            title={ingredient.name}
                            details={{
                                category: ingredient.categoryIngredient?.name || "Non spécifié",
                                season: translatedSeason(ingredient.season),
                            }}
                            // Formulaire de mise à jour
                            renderEditForm={(onClose) => ( // 
                                <UpdateIngredient
                                    initialName={ingredient.name}
                                    initialCategory={ingredient.categoryIngredient?.id || ""}
                                    initialSeason={ingredient.season || ""}
                                    onSubmit={async (newName, newCategory, newSeason) => {
                                        await updateIngredient(ingredient.id, newName, newCategory, newSeason);
                                        onClose();
                                    }}
                                    onCancel={onClose}
                                    isLoading={false}
                                    error={null}
                                />
                            )}
                            onDelete={() => deleteIngredient(ingredient.id)}
                            isDeleting={false}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default IngredientPage;
