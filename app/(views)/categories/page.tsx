import CategoriesPageClient  from "./_components/CategoriesPageClient ";
import {
    getCategoriesHouseholdProduct,
    getCategoriesIngredient,
    getCategoriesMeal
} from "@/lib/services/data_fetcher";
import { auth } from "@/lib/auth";
import { unauthorized } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
    const session = await auth();
    if (session?.user.role !== "ADMIN") unauthorized();
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
