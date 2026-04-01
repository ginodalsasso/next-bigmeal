import { MEALS_PER_PAGE } from "@/lib/constants/ui_constants";
import MealsList from "./_components/MealsList";
import Pagination from "@/components/ui/Pagination";
import { ensureArray } from "@/lib/utils";
import { db } from "@/lib/db";
import { getUserSession } from "@/lib/security/getSession";

export const dynamic = "force-dynamic";

interface searchParamsProps {
    searchParams: Promise<{
        page?: string;
        categories?: string[];
        liked?: string;
    }> | undefined
}

export default async function MealPage({ searchParams }: searchParamsProps) {
    try {
        const { session } = await getUserSession();
        const userId = session?.user?.id;

        if (!userId) {
            return <p className="text-center text-zinc-500">Veuillez vous connecter pour voir vos favoris.</p>;
        }

        const params      = await searchParams;
        const page        = parseInt(params?.page || '1', 10);
        const itemsPerPage = parseInt(MEALS_PER_PAGE, 10);
        const categories  = ensureArray(params?.categories);
        const likedFilter = params?.liked === "true";

        const categoryFilter = categories.length > 0 ? { name: { in: categories } } : undefined;

        const [meals, categoryNames, likedMeals] = await Promise.all([
            db.meal.findMany({
                where: {
                    ...(likedFilter && { mealLikes: { some: { userId } } }),
                    categoryMeal: categoryFilter,
                },
                skip: (page - 1) * itemsPerPage,
                take: itemsPerPage,
                orderBy: { name: 'desc' },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    categoryMealId: true,
                    categoryMeal: { select: { id: true, name: true } },
                },
            }),
            db.categoryMeal.findMany({
                orderBy: { name: 'asc' },
                select: { id: true, name: true },
            }),
            db.mealLike.findMany({
                where: { userId },
                select: { meal: { select: { name: true } } },
            }),
        ]);

        const likedMealNames = likedMeals.map((like) => like.meal.name);

        return (
            <div>
                <MealsList
                    fetchedMeals={meals}
                    fetchedCategories={categoryNames}
                    fetchedlikedMeals={likedMealNames}
                />
                <Pagination
                    currentPage={page}
                    hasNextPage={meals.length === itemsPerPage}
                />
            </div>
        );
    } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des repas :", error);
        return (
            <div className="flex min-h-screen items-center justify-center text-center">
                <p className="text-warm-danger">Erreur lors de la récupération des repas.</p>
            </div>
        );
    }
}
