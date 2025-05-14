'use client';

// Composants des listes
import CategoryHouseholdProductList from "./CategoryHouseholdProductList";
import CategoryIngredientList from "./CategoryIngredientList";
import CategoryMealList from "./CategoryMealList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Types et énumérations
import { CategoryHouseholdProductType, CategoryIngredientType, CategoryMealType } from "@/lib/types/schemas_interfaces";

// Props côté client
export default function CategoriesPageClient({
    categoryIngredient,
    categoryHouseholdProduct,
    categoryMeal
}: {
    categoryIngredient: CategoryIngredientType[],
    categoryHouseholdProduct: CategoryHouseholdProductType[],
    categoryMeal: CategoryMealType[]
}) {

    return (
        <Tabs defaultValue="ingredients">
            <TabsList className="mb-4 w-full">
                <TabsTrigger value="ingredients">Ingrédients</TabsTrigger>
                <TabsTrigger value="household">Produits ménagers</TabsTrigger>
                <TabsTrigger value="meals">Repas</TabsTrigger>
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
