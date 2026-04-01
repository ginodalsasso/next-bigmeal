import CategoriesPageClient from "./_components/CategoriesPageClient ";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { unauthorized } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
    const session = await auth();
    if (session?.user.role !== "ADMIN") unauthorized();

    const [categoryHouseholdProduct, categoryIngredient, categoryMeal] = await Promise.all([
        db.categoryHousehold.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
        db.categoryIngredient.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
        db.categoryMeal.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
    ]);

    return (
        <CategoriesPageClient
            categoryIngredient={categoryIngredient}
            categoryHouseholdProduct={categoryHouseholdProduct}
            categoryMeal={categoryMeal}
        />
    );
}
