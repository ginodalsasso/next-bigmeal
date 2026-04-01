import { HOUSEHOLD_PER_PAGE } from "@/lib/constants/ui_constants";
import HouseholdProductList from "./_components/HouseholdProductList";
import Pagination from "@/components/ui/Pagination";
import { ensureArray } from "@/lib/utils";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

interface searchParamsProps {
    searchParams: Promise<{
        page?: string;
        categories?: string[];
    }> | undefined
}

export default async function HouseholdProductPage({ searchParams }: searchParamsProps) {
    try {
        const params      = await searchParams;
        const page        = parseInt(params?.page || "1", 10);
        const itemsPerPage = parseInt(HOUSEHOLD_PER_PAGE, 10);
        const categories  = ensureArray(params?.categories);

        const [householdProducts, categoryNames] = await Promise.all([
            db.product.findMany({
                where: {
                    categoryHouseholdProduct: categories.length > 0 ? { name: { in: categories } } : undefined,
                },
                skip: (page - 1) * itemsPerPage,
                take: itemsPerPage,
                orderBy: { name: 'desc' },
                select: {
                    id: true,
                    name: true,
                    categoryHouseholdProductId: true,
                    categoryHouseholdProduct: { select: { id: true, name: true } },
                },
            }),
            db.categoryHousehold.findMany({
                orderBy: { name: 'asc' },
                select: { id: true, name: true },
            }),
        ]);

        return (
            <div>
                <HouseholdProductList
                    fetchedHouseholdProducts={householdProducts}
                    fetchedCategories={categoryNames}
                />
                <Pagination
                    currentPage={page}
                    hasNextPage={householdProducts.length === itemsPerPage}
                />
            </div>
        );
    } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des produits ménagers :", error);
        return (
            <div className="flex min-h-screen items-center justify-center text-center">
                <p className="text-warm-danger">Erreur lors de la récupération des produits ménagers.</p>
            </div>
        );
    }
}
