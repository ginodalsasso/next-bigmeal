"use client";

// Bibliothèques tierces
import React, { useState } from "react";

// Types et interfaces
import { CategoryHouseholdProductType } from "@/lib/types/schemas_interfaces";

// Composants UI
import ItemView from "@/components/layout/ItemView";
import EditItemDrawer from "@/components/layout/EditItemDrawer";
import DeleteItem from "@/components/layout/DeleteItemDialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Composants spécifiques
import UpdateCategory from "../_components/UpdateCategory";
import CreateCategory from "../_components/CreateCategory";

// Composants d'autorisation
import IsAdmin from "@/components/isAdmin";


// _________________________ COMPOSANT _________________________
export default function CategoryHouseholdProductList({ fetchedCategories }: { fetchedCategories: CategoryHouseholdProductType[] }) {

    // _________________________ ETATS _________________________
    const [categoryHouseholdProduct, setCategoryHouseholdProduct] = useState<CategoryHouseholdProductType[]>(fetchedCategories);


    // _________________________ CRUD _________________________
    // Mise à jour de la liste après création
    const handleCategoryCreated = (newCategory: CategoryHouseholdProductType) => {
        setCategoryHouseholdProduct((prev) => [...prev, newCategory]);
    };

    // Mise à jour de la liste après modification
    const handleCategoryUpdated = (updatedCategory: CategoryHouseholdProductType) => {
        setCategoryHouseholdProduct((prev) => prev.map((category) => (category.id === updatedCategory.id ? updatedCategory : category)));
    };

    // Suppression d'une catégorie dans le state après suppression API
    const handleCategoryDeleted = (id: string) => {
        setCategoryHouseholdProduct((prev) => prev.filter((category) => category.id !== id));
    };

    
    //  _________________________ RENDU _________________________
    return (
        <div>
            <IsAdmin>
            <div className="card mb-6 md:w-fit">
                    <CreateCategory<CategoryHouseholdProductType> 
                        apiUrl="/api/categories-household-product" 
                        onSubmit={handleCategoryCreated} 
                    />
                </div>
            </IsAdmin>

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
                    {categoryHouseholdProduct.map((category) => (
                        <TableRow key={category.id}>
                            <TableCell>
                                <ItemView title={category.name} details={{}} />
                            </TableCell>
                            <IsAdmin>
                                <TableCell>
                                    <div className="flex gap-2">
                                        {/* CRUD */}
                                        <EditItemDrawer
                                            renderEditForm={(onClose) => (
                                                <UpdateCategory<CategoryHouseholdProductType>
                                                apiUrl="/api/categories-household-product" 
                                                category={category}
                                                    onSubmit={handleCategoryUpdated}
                                                    onCancel={onClose}
                                                />
                                            )}
                                        />  
                                        <DeleteItem
                                            apiUrl="/api/categories-household-product" 
                                            id={category.id}
                                            onSubmit={handleCategoryDeleted}
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
}
