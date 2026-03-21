'use client';

import CategoryHouseholdProductList from "./CategoryHouseholdProductList";
import CategoryIngredientList from "./CategoryIngredientList";
import CategoryMealList from "./CategoryMealList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { CategoryHouseholdProductType, CategoryIngredientType, CategoryMealType } from "@/lib/types/schemas_interfaces";

export default function CategoriesPageClient({
    categoryIngredient,
    categoryHouseholdProduct,
    categoryMeal
}: {
    categoryIngredient: CategoryIngredientType[];
    categoryHouseholdProduct: CategoryHouseholdProductType[];
    categoryMeal: CategoryMealType[];
}) {
    return (
        <Tabs defaultValue="ingredients">
            <TabsList className="mb-4 w-full">
                <TabsTrigger value="ingredients" className="flex-1">Ingrédients</TabsTrigger>
                <TabsTrigger value="household" className="flex-1">Produits ménagers</TabsTrigger>
                <TabsTrigger value="meals" className="flex-1">Repas</TabsTrigger>
            </TabsList>

            <TabsContent value="ingredients">
                <CategoryIngredientList fetchedCategories={categoryIngredient} />
            </TabsContent>

            <TabsContent value="household">
                <CategoryHouseholdProductList fetchedCategories={categoryHouseholdProduct} />
            </TabsContent>

            <TabsContent value="meals">
                <CategoryMealList fetchedCategories={categoryMeal} />
            </TabsContent>
        </Tabs>
    );
}
