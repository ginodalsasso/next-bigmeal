import { INGREDIENTS_PER_PAGE } from "@/lib/constants/ui_constants";
import IngredientsList from "./_components/IngredientsList";
import Pagination from "@/components/ui/Pagination";
import { ensureArray } from "@/lib/utils";
import { db } from "@/lib/db";
import { Season } from "@prisma/client";

export const dynamic = "force-dynamic";

interface searchParamsProps {
    searchParams: Promise<{
        page?: string;
        categories?: string[];
        season?: string[]
    }> | undefined
}

export default async function IngredientPage({ searchParams }: searchParamsProps) {
    try {
        const params      = await searchParams;
        const page        = parseInt(params?.page || "1", 10);
        const itemsPerPage = parseInt(INGREDIENTS_PER_PAGE, 10);
        const categories  = ensureArray(params?.categories);
        const seasons     = ensureArray(params?.season);

        const [ingredients, categoryNames] = await Promise.all([
            db.ingredient.findMany({
                where: {
                    categoryIngredient: categories.length > 0 ? { name: { in: categories } } : undefined,
                    season: seasons.length > 0 ? { in: seasons as Season[] } : undefined,
                },
                skip: (page - 1) * itemsPerPage,
                take: itemsPerPage,
                orderBy: { name: 'desc' },
                select: {
                    id: true,
                    name: true,
                    season: true,
                    categoryIngredientId: true,
                    categoryIngredient: { select: { id: true, name: true } },
                },
            }),
            db.categoryIngredient.findMany({
                orderBy: { name: 'asc' },
                select: { id: true, name: true },
            }),
        ]);

        return (
            <div>
                <IngredientsList
                    fetchedIngredients={ingredients}
                    fetchedCategories={categoryNames}
                />
                <Pagination
                    currentPage={page}
                    hasNextPage={ingredients.length === itemsPerPage}
                />
            </div>
        );
    } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des ingrédients :", error);
        return (
            <div className="flex min-h-screen items-center justify-center text-center">
                <p className="text-warm-danger">Erreur lors de la récupération des ingrédients.</p>
            </div>
        );
    }
}
