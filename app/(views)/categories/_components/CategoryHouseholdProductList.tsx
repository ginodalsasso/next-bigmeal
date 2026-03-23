"use client";

import React, { useState } from "react";
import { CategoryHouseholdProductType } from "@/lib/types/schemas_interfaces";
import { ucFirst } from "@/lib/utils";

import EditItemDrawer from "@/components/catalog/EditItemDrawer";
import DeleteItem from "@/components/catalog/DeleteItemDialog";
import UpdateCategory from "./UpdateCategory";
import CreateCategory from "./CreateCategory";
import IsAdmin from "@/components/auth/isAdmin";

export default function CategoryHouseholdProductList({ fetchedCategories }: { fetchedCategories: CategoryHouseholdProductType[] }) {
    const [categories, setCategories] = useState<CategoryHouseholdProductType[]>(fetchedCategories);

    const handleCategoryCreated = (newCategory: CategoryHouseholdProductType) => {
        setCategories((prev) => [...prev, newCategory]);
    };

    const handleCategoryUpdated = (updatedCategory: CategoryHouseholdProductType) => {
        setCategories((prev) => prev.map((c) => (c.id === updatedCategory.id ? updatedCategory : c)));
    };

    const handleCategoryDeleted = (id: string) => {
        setCategories((prev) => prev.filter((c) => c.id !== id));
    };

    return (
        <div className="space-y-4">
            <IsAdmin>
                <div className="card md:w-fit">
                    <CreateCategory<CategoryHouseholdProductType>
                        apiUrl="/api/categories-household-product"
                        onSubmit={handleCategoryCreated}
                    />
                </div>
            </IsAdmin>

            <div className="overflow-hidden rounded-xl border border-warm-border bg-warm-subtle">
                <div className="border-b border-warm-border px-4 py-2.5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-warm-secondary">
                        {categories.length} catégorie{categories.length > 1 ? "s" : ""}
                    </p>
                </div>
                {categories.length === 0 ? (
                    <p className="px-4 py-6 text-center text-sm text-warm-secondary">Aucune catégorie.</p>
                ) : (
                    <ul className="divide-y divide-warm-border">
                        {categories.map((category) => (
                            <li key={category.id} className="flex items-center justify-between px-4 py-2.5 hover:bg-warm-muted">
                                <span className="text-sm font-medium text-warm-primary">{ucFirst(category.name)}</span>
                                <IsAdmin>
                                    <div className="flex gap-2">
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
                                </IsAdmin>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
