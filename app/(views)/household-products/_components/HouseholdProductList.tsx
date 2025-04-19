'use client';

// Bibliothèques tierces
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";


// Images
import add from "@/public/img/add.svg";

// Types
import { HouseholdProductType } from "@/lib/types/schemas_interfaces";

// Composants
import ItemView from "@/components/layout/ItemView";
import CreateHouseholdProduct from "./CreateHouseholdProduct";
import UpdateHouseholdProduct from "./UpdateHouseholdProduct";
import AddToShoppingListForm from "@/components/forms/AddToShoppingListForm";
import EditItem from "@/components/layout/EditItemDrawer";
import DeleteItem from "@/components/layout/DeleteItemDialog";
import IsAdmin from "@/components/isAdmin";
import IsUser from "@/components/isUser";
import FilterItems from "@/components/layout/FilterItems";

// Composants UI
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";import { Button } from "@/components/ui/button";

// Constantes
import { CATEGORIES_HOUSEHOLD_PRODUCTS } from "@/lib/constants/ui_constants";



// _________________________ COMPOSANT _________________________
export default function HouseholdProductList({ fetchedHouseholdProducts }: { fetchedHouseholdProducts: HouseholdProductType[] }) {
    
    // _________________________ ETATS _________________________
    const router = useRouter();
    const [householdProducts, setHouseholdProducts] = useState<HouseholdProductType[]>(fetchedHouseholdProducts);
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

    useEffect(( ) => {
        setHouseholdProducts(fetchedHouseholdProducts); // Pour les mises à jour de la liste de produits coté client
    }, [fetchedHouseholdProducts]);


    // _________________________ CRUD _________________________
    // Fonction pour ajouter un produit ménager à la liste
    const addHouseholdProduct = (householdProduct: HouseholdProductType) => {
        // Ajouter le produit ménager à la liste en conservant les anciens produits
        setHouseholdProducts((prevHouseholdProducts) =>
            [...prevHouseholdProducts, householdProduct]
        );
    };

    // Appel API pour mettre à jour un produit ménager
    const updateHouseholdProduct = async (updatedHouseholdProduct: HouseholdProductType) => {
        setHouseholdProducts((prev) => // Remplacer l'ancien produit ménager par le nouveau
            prev.map((householdProduct) =>
                householdProduct.id === updatedHouseholdProduct.id ? updatedHouseholdProduct : householdProduct
            )
        );
    };

    // Suppression d'une catégorie dans le state après suppression API
    const handleHouseholdProductDeleted = (id: string) => {
        setHouseholdProducts((prev) => 
            prev.filter((householdProduct) => householdProduct.id !== id)
        );
    };

    // _________________________ FILTRAGE _________________________
    const filterOptions = CATEGORIES_HOUSEHOLD_PRODUCTS; // Options de filtres

    // Fonction pour gérer le changement de filtre
    const handleFilterChange = (selectedFilters: string[]) => {
        const queryParams = new URLSearchParams();
    
        // Filtrer les catégories et les saisons pour preparer les paramètres de requête
        const categories = selectedFilters.filter(filter => CATEGORIES_HOUSEHOLD_PRODUCTS.includes(filter));

        // Ajouter les filtres aux paramètres de requête
        categories.forEach(categorie => queryParams.append("categories", categorie.toLowerCase()));
    
        router.push(`/household-products?${queryParams.toString()}`);
    };

    // _________________________ RENDU _________________________
    if (!householdProducts) return <div>Ingrédients introuvables.</div>;

    return (
        <>
            {/* Dialogue pour ajouter un ingrédient */}
            <div className="flex flex-col justify-between gap-2 pb-2 md:flex-row-reverse md:items-center">
                <IsUser>
                    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                        <DrawerTrigger asChild>
                            <Button variant="success" onClick={() => setIsDrawerOpen(true)}>
                                <Image
                                    src={add}
                                    alt="Ajouter un produit"
                                    width={18}
                                    height={18}
                                />
                                    Ajouter un produit
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle className="text-center">Ajouter un produit</DrawerTitle>
                                {/* Formulaire de création d'ingrédient */}
                                <CreateHouseholdProduct
                                    onSubmit={addHouseholdProduct}
                                    onClose={() => setIsDrawerOpen(false)}
                                />
                            </DrawerHeader>
                        </DrawerContent>
                    </Drawer>
                </IsUser>
            </div>
            
            {/* Filtres */}
            <FilterItems 
                options={filterOptions} 
                onFilterChange={handleFilterChange} 
            />

            {/* Liste des ingrédients */}
            <div className="cards-wrapper">
                <div className="cards-list">
                    {householdProducts.map((householdProduct) => (
                        <div key={householdProduct.id} className="card">
                            <ItemView
                                title={householdProduct.name}
                                details={{
                                    // Afficher la catégorie et la saison si elles existent
                                    ...(householdProduct.categoryHouseholdProduct?.name && { category: householdProduct.categoryHouseholdProduct.name }),
                                }}
                            />
                            <IsAdmin>
                                <div className="flex w-full gap-2">
                                    <EditItem
                                        renderEditForm={(onClose) => (
                                            <UpdateHouseholdProduct
                                                householdProduct={householdProduct}
                                                onSubmit={async (updatedHouseholdProduct: HouseholdProductType) => {
                                                    await updateHouseholdProduct(updatedHouseholdProduct);
                                                    onClose();
                                                }}
                                                onCancel={onClose}
                                            />
                                        )}
                                    />
                                    <DeleteItem
                                        apiUrl="/api/household-products"
                                        id={householdProduct.id}
                                        onSubmit={handleHouseholdProductDeleted}
                                    />
                                </div>
                            </IsAdmin>
                            {/* Ajouter l'ingrédient à la liste de courses */}
                            <AddToShoppingListForm type="product" id={householdProduct.id} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};