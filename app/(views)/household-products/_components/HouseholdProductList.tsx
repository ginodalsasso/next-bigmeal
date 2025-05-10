'use client';

// Bibliothèques tierces
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";

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
    if (!householdProducts) return <div>Produits introuvables.</div>;

    return (
        <>              
            <h1 className="h1-title">Liste des produits ménagers</h1>
            {/* Dialogue pour ajouter un ingrédient */}
            <IsUser>
                <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                    <DrawerTrigger asChild>
                        <Button 
                            variant="success" 
                            className="w-full"
                            onClick={() => setIsDrawerOpen(true)}
                        >
                                Ajouter un produit <Plus/>
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle className="my-4 text-center">Ajouter un produit</DrawerTitle>
                        </DrawerHeader>
                        {/* Formulaire de création d'ingrédient */}
                        <CreateHouseholdProduct
                            onSubmit={addHouseholdProduct}
                            onClose={() => setIsDrawerOpen(false)}
                        />
                    </DrawerContent>
                </Drawer>
            </IsUser>

            {/* Filtres */}
            <FilterItems 
                options={filterOptions} 
                onFilterChange={handleFilterChange} 
            />

            {/* Liste des ingrédients */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead><span className="table-head">Produits</span></TableHead>
                        <IsAdmin>
                            <TableHead><span className="table-head">Actions</span></TableHead>
                        </IsAdmin>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {householdProducts.map((householdProduct) => (
                        <TableRow key={householdProduct.id}>
                            <TableCell className="table-cell">
                                <div className="lg:relative">
                                    <ItemView
                                        title={householdProduct.name}
                                        details={{
                                            // Afficher la catégorie et la saison si elles existent
                                            ...(householdProduct.categoryHouseholdProduct?.name && { category: householdProduct.categoryHouseholdProduct.name }),
                                        }}
                                    />
                                    {/* Edition et suppression des produits */}
                                    {/* Si l'utilisateur est admin, afficher les boutons d'édition et de suppression */}
                                    <IsAdmin>
                                        <div className="lg:absolute right-0 top-0 flex gap-4 mt-2">
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
                                </div>
                            </TableCell>
                            <TableCell>
                                {/* Ajouter l'ingrédient à la liste de courses */}
                                <AddToShoppingListForm type="product" id={householdProduct.id} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>


        </>
    );
};