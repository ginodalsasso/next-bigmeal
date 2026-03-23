'use client';

import React, { useEffect, useState } from "react";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { Plus } from "lucide-react";

import { CategoryHouseholdProductType, HouseholdProductType } from "@/lib/types/schemas_interfaces";
import { ucFirst } from "@/lib/utils";

import CreateHouseholdProduct from "./CreateHouseholdProduct";
import UpdateHouseholdProduct from "./UpdateHouseholdProduct";
import AddToShoppingListForm from "@/components/forms/AddToShoppingListForm";
import IsUser from "@/components/auth/isUser";
import FilterItems from "@/components/search/FilterItems";
import PopoverActions from "@/components/catalog/PopoverActions";
import ItemCard from "@/components/catalog/ItemCard";
import ItemGrid from "@/components/catalog/ItemGrid";

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

export default function HouseholdProductList({
    fetchedHouseholdProducts,
    fetchedCategories,
}: {
    fetchedHouseholdProducts: HouseholdProductType[];
    fetchedCategories: CategoryHouseholdProductType[];
}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [householdProducts, setHouseholdProducts] = useState<HouseholdProductType[]>(fetchedHouseholdProducts);
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

    useEffect(() => {
        setHouseholdProducts(fetchedHouseholdProducts);
    }, [fetchedHouseholdProducts]);

    const addHouseholdProduct = (householdProduct: HouseholdProductType) => {
        setHouseholdProducts((prev) => [...prev, householdProduct]);
    };

    const updateHouseholdProduct = async (updatedHouseholdProduct: HouseholdProductType) => {
        setHouseholdProducts((prev) =>
            prev.map((p) => (p.id === updatedHouseholdProduct.id ? updatedHouseholdProduct : p))
        );
    };

    const handleHouseholdProductDeleted = (id: string) => {
        setHouseholdProducts((prev) => prev.filter((p) => p.id !== id));
    };

    const categoryOptions = fetchedCategories.map((cat) => cat.name);
    const filterGroups = [{ label: "Catégorie", options: categoryOptions }];
    const initialFilters = searchParams.getAll("categories").filter((f) => categoryOptions.includes(f));

    const handleFilterChange = (selectedFilters: string[]) => {
        const params = new URLSearchParams();
        selectedFilters
            .filter((f) => categoryOptions.includes(f))
            .forEach((cat) => params.append("categories", cat));
        router.replace(`/household-products?${params.toString()}`);
    };

    if (!householdProducts) return notFound();

    return (
        <>
            <h1 className="h1-title">Liste des produits ménagers</h1>

            <IsUser>
                <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                    <DrawerTrigger asChild>
                        <Button className="w-full" onClick={() => setIsDrawerOpen(true)}>
                            Ajouter un produit <Plus aria-hidden="true" />
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle className="my-4 text-center">Ajouter un produit</DrawerTitle>
                        </DrawerHeader>
                        <CreateHouseholdProduct onSubmit={addHouseholdProduct} onClose={() => setIsDrawerOpen(false)} />
                    </DrawerContent>
                </Drawer>
            </IsUser>

            <FilterItems groups={filterGroups} initialFilters={initialFilters} onFilterChange={handleFilterChange} />

            <ItemGrid
                items={householdProducts}
                emptyMessage="Aucun produit trouvé."
                renderItem={(product) => (
                    <ItemCard
                        adminActions={
                            <PopoverActions
                                id={product.id}
                                apiUrl="/api/household-products"
                                onDelete={() => handleHouseholdProductDeleted(product.id)}
                                renderEditForm={(onClose) => (
                                    <UpdateHouseholdProduct
                                        householdProduct={product}
                                        onSubmit={updateHouseholdProduct}
                                        onCancel={onClose}
                                    />
                                )}
                            />
                        }
                        footer={<AddToShoppingListForm type="product" id={product.id} />}
                    >
                        <div className="flex flex-1 flex-col gap-1.5 p-3 pr-8">
                            <p className="line-clamp-2 text-sm font-semibold leading-snug text-warm-primary">
                                {ucFirst(product.name)}
                            </p>
                            {product.categoryHouseholdProduct?.name && (
                                <span className="w-fit rounded-full bg-warm-accent/15 px-2 py-0.5 text-xs font-medium text-warm-primary">
                                    {product.categoryHouseholdProduct.name}
                                </span>
                            )}
                        </div>
                    </ItemCard>
                )}
            />
        </>
    );
}