import CategoriesPageClient  from "./_components/CategoriesPageClient ";
import {
    getCategoriesHouseholdProduct,
    getCategoriesIngredient,
    getCategoriesMeal
} from "@/lib/services/data_fetcher";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
    const [
        categoryHouseholdProduct,
        categoryIngredient,
        categoryMeal
    ] = await Promise.all([
        getCategoriesHouseholdProduct(),
        getCategoriesIngredient(),
        getCategoriesMeal()
    ]);

    return (
        <CategoriesPageClient
            categoryIngredient={categoryIngredient}
            categoryHouseholdProduct={categoryHouseholdProduct}
            categoryMeal={categoryMeal}
        />
    );
}
