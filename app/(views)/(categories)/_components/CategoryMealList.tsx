'use client';

import React, { useState } from "react";
import { CategoryMealType } from "@/lib/types/schemas_interfaces";
import CategoryForm from "./CreateCategory";
import UpdateCategory from "./UpdateCategory";
import ItemView from "@/components/layout/ItemView";
import EditItem from "@/components/layout/EditItemDrawer";
import DeleteItem from "@/components/layout/DeleteItemDialog";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import IsAdmin from "@/components/isAdmin";
import { useCsrfToken } from "@/app/hooks/useCsrfToken";


// _________________________ COMPOSANT _________________________
export default function CategoryMealList({ fetchedCategories }: { fetchedCategories: CategoryMealType[] }) {

    // _________________________ ETATS _________________________
    const csrfToken = useCsrfToken();
    const [categoryMeal, setCategoryMeal] = useState<CategoryMealType[]>(fetchedCategories);
    const [error, setError] = useState<string | null>(null);

    // _________________________ CRUD _________________________
    // Appel API pour ajouter une catégorie
    const createCategoryMeal = async (name: string) => {
        if (!csrfToken) {
            console.error("CSRF token invalide");
            return;
        }

        try {
            const response = await fetch("/api/categories-meal", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "X-CSRF-Token": csrfToken,
                },
                body: JSON.stringify({ name }),
            });
            if (!response.ok) throw new Error("Failed to add category");

            const newCategory: CategoryMealType = await response.json();
            setCategoryMeal((prev) => 
                [...prev, newCategory]
            );

            toast("Catégorie créée avec succès");
        } catch (error) {
            console.error("Erreur lors de la création:", error);
            setError("Erreur lors de la création.");
        }
    };

    // Appel API pour mettre à jour une catégorie
    const updateCategoryMeal = async (id: string, newName: string) => {
        if (!csrfToken) {
            console.error("CSRF token invalide");
            return;
        }
        try {
            const response = await fetch("/api/categories-meal", {
                method: "PUT",
                headers: { 
                    "Content-Type": "application/json",
                    "X-CSRF-Token": csrfToken,
                },
                body: JSON.stringify({ id, name: newName }),
            });
            if (!response.ok) throw new Error("Failed to update category");

            const updatedCategory: CategoryMealType = await response.json();
            setCategoryMeal((prev) =>
                prev.map((category) => (category.id === id ? updatedCategory : category))
            );

            toast("Catégorie modifiée avec succès");
        } catch (error) {
            console.error("Erreur lors de la modification:", error);
            setError("Erreur lors de la modification.");
        }
    };

    // Appel API pour supprimer une catégorie
    const deleteCategoryMeal = async (id: string) => {
        if (!csrfToken) {
            console.error("CSRF token invalide");
            return;
        }
        try {
            const response = await fetch("/api/categories-meal", {
                method: "DELETE",
                headers: { 
                    "Content-Type": "application/json",
                    "X-CSRF-Token": csrfToken, 
                },
                body: JSON.stringify({ id }),
            });
            if (!response.ok) throw new Error("Failed to delete category");

            setCategoryMeal((prev) => prev.filter((category) => category.id !== id));
            
            toast("Catégorie supprimée avec succès");
        } catch (error) {
            console.error("Erreur lors de la suppression:", error);
            setError("Erreur lors de la suppression.");
        }
    };

    // _________________________ RENDU _________________________
    return (
        <div>
            {error && <div className="text-red-500">{error}</div>}

            {/* Formulaire de création */}
            <IsAdmin>
                <div className="card mb-6 md:w-fit">
                    <CategoryForm onSubmit={createCategoryMeal} />
                </div>
            </IsAdmin>


            {/* Liste des catégories */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead><span className="text-lg font-bold">Noms</span></TableHead>
                        <IsAdmin>
                            <TableHead><span className="text-lg font-bold">Actions</span></TableHead>
                        </IsAdmin>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {categoryMeal.map((category) => (
                    <TableRow key={category.id}>
                        <TableCell>
                            <ItemView title={category.name} details={{}} />
                        </TableCell>
                        <IsAdmin>
                            <TableCell>
                                <div className="flex gap-2">
                                    <EditItem
                                        renderEditForm={(onClose) => (
                                            <UpdateCategory
                                                initialName={category.name}
                                                onSubmit={async (newName) => {
                                                    await updateCategoryMeal(category.id, newName);
                                                    onClose();
                                                }}
                                                onCancel={onClose}
                                                isLoading={false}
                                                error={null}
                                            /> 
                                        )}
                                    />
                                    <DeleteItem
                                        onDelete={() => deleteCategoryMeal(category.id)}
                                        isDeleting={false}
                                    />
                                </div>
                            </TableCell>
                        </IsAdmin>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </div>
    );
};
