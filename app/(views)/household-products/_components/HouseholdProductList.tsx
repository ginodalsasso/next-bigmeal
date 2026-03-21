'use client';

import React, { useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { CategoryHouseholdProductType, HouseholdProductType } from "@/lib/types/schemas_interfaces";
import { ucFirst } from "@/lib/utils";

import CreateHouseholdProduct from "./CreateHouseholdProduct";
import UpdateHouseholdProduct from "./UpdateHouseholdProduct";
import AddToShoppingListForm from "@/components/forms/AddToShoppingListForm";
import IsUser from "@/components/isUser";
import FilterItems from "@/components/layout/FilterItems";
import PopoverActions from "@/components/layout/PopoverActions";

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

    const filterOptions = fetchedCategories.map((cat) => cat.name);

    const handleFilterChange = (selectedFilters: string[]) => {
        const params = new URLSearchParams();
        selectedFilters
            .filter((f) => fetchedCategories.map((c) => c.name).includes(f))
            .forEach((cat) => params.append("categories", cat));
        router.push(`/household-products?${params.toString()}`);
    };

    if (!householdProducts) return notFound();

    return (
        <>
            <h1 className="h1-title">Liste des produits ménagers</h1>

            <IsUser>
                <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                    <DrawerTrigger asChild>
                        <Button variant="success" className="w-full" onClick={() => setIsDrawerOpen(true)}>
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

            <FilterItems options={filterOptions} onFilterChange={handleFilterChange} />

            {householdProducts.length === 0 ? (
                <p className="py-12 text-center text-sm text-zinc-500">Aucun produit trouvé.</p>
            ) : (
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4" role="list">
                    {householdProducts.map((product) => (
                        <li key={product.id}>
                            <article className="relative flex h-full flex-col rounded-lg border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md">

                                {/* Menu actions en haut à droite */}
                                <div className="absolute right-1 top-1 z-10">
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
                                </div>

                                {/* Contenu principal */}
                                <div className="flex flex-1 flex-col gap-1.5 p-3 pr-8">
                                    <p className="line-clamp-2 text-sm font-semibold leading-snug text-zinc-900">
                                        {ucFirst(product.name)}
                                    </p>
                                    {product.categoryHouseholdProduct?.name && (
                                        <span className="w-fit rounded-full bg-orange-50 px-2 py-0.5 text-xs font-medium text-orange-700">
                                            {product.categoryHouseholdProduct.name}
                                        </span>
                                    )}
                                </div>

                                {/* Footer — ajouter à la liste de courses */}
                                <div className="border-t border-zinc-100 px-3 py-2">
                                    <AddToShoppingListForm type="product" id={product.id} />
                                </div>
                            </article>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}