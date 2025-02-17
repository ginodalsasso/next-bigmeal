'use client';

import React, { useEffect, useState } from "react";
import { CategoryIngredientType } from "@/lib/types/schemas_interfaces";
import CategoryForm from "../_components/CreateCategory";
import UpdateCategory from "../_components/UpdateCategory";
import ItemView from "@/components/layout/ItemView";
import EditItem from "@/components/layout/EditItemPopover";
import DeleteItem from "@/components/layout/DeleteItemDialog";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import IsAdmin from "@/components/isAdmin";
import { useCsrfToken } from "@/app/hooks/useCsrfToken";

    // _________________________ COMPOSANT _________________________
    const CategoryIngredientPage = () => {
    // _________________________ ETATS _________________________
    const csrfToken = useCsrfToken();
    const [categoryIngredient, setCategoryIngredient] = useState<CategoryIngredientType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // _________________________ LOGIQUE _________________________
    // Récupérer les catégories d'ingrédients
    useEffect(() => {
        const fetchCategoryIngredient = async () => {
            try {
                const response = await fetch("/api/categories-ingredient");
                if (!response.ok) throw new Error("Failed to fetch categories-ingredient");
                
                const data: CategoryIngredientType[] = await response.json();
                setCategoryIngredient(data);
            } catch (error) {
                console.error("[FETCH_CATEGORY_ERROR]", error);
                setError("Erreur lors de la récupération des catégories.");
            } finally {
                setLoading(false);
            }
        };
        fetchCategoryIngredient();
    }, []);

    // Appel API pour ajouter une catégorie
    const createCategoryIngredient = async (name: string) => {
        if (!csrfToken) {
            console.error("CSRF token invalide");
            return;
        }
        
        try {
            const response = await fetch("/api/categories-ingredient", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "X-CSRF-Token": csrfToken,
                },
                body: JSON.stringify({ name }),
            });
            if (!response.ok) throw new Error("Failed to add category");

            const newCategory: CategoryIngredientType = await response.json();
            setCategoryIngredient((prev) => 
                [...prev, newCategory]
            );

            toast("Catégorie créée avec succès");
        } catch (error) {
            console.error("[CREATE_CATEGORY]", error);
            setError("Erreur lors de la création.");
        }
    };

    // Appel API pour mettre à jour une catégorie
    const updateCategoryIngredient = async (id: string, newName: string) => {
        if (!csrfToken) {
            console.error("CSRF token invalide");
            return;
        }
        
        try {
            const response = await fetch("/api/categories-ingredient", {
                method: "PUT",
                headers: { 
                    "Content-Type": "application/json",
                    "X-CSRF-Token": csrfToken,
                },
                body: JSON.stringify({ id, name: newName }),
            });
            if (!response.ok) throw new Error("Failed to update category");

            const updatedCategory: CategoryIngredientType = await response.json();
            setCategoryIngredient((prev) =>
                prev.map((category) => (category.id === id ? updatedCategory : category))
            );

            toast("Catégorie modifiée avec succès");
        } catch (error) {
            console.error("[UPDATE_CATEGORY_ERROR]", error);
            setError("Erreur lors de la modification.");
        }
    };

    // Appel API pour supprimer une catégorie
    const deleteCategoryIngredient = async (id: string) => {
        if (!csrfToken) {
            console.error("CSRF token invalide");
            return;
        }

        try {
            const response = await fetch("/api/categories-ingredient", {
                method: "DELETE",
                headers: { 
                    "Content-Type": "application/json",
                    "X-CSRF-Token": csrfToken, 
                },
                body: JSON.stringify({ id }),
            });
            if (!response.ok) throw new Error("Failed to delete category");
            
            setCategoryIngredient((prev) => prev.filter((category) => category.id !== id));

            toast("Catégorie supprimée avec succès");
        } catch (error) {
            console.error("[DELETE_CATEGORY_ERROR]", error);
            setError("Erreur lors de la suppression.");
        }
    };

    //  _________________________ RENDU _________________________
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            {/* Formulaire de création */}
            <IsAdmin>
                <div className="card mb-6 md:w-fit">
                    <CategoryForm onSubmit={createCategoryIngredient} />
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
                    {categoryIngredient.map((category) => (
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
                                                        await updateCategoryIngredient(category.id, newName);
                                                        onClose();
                                                    }}
                                                    onCancel={onClose}
                                                    isLoading={false}
                                                    error={null}
                                                    />
                                            )}
                                        />  
                                        <DeleteItem
                                            onDelete={() => deleteCategoryIngredient(category.id)}
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

export default CategoryIngredientPage;
