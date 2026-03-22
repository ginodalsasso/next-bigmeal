'use client';

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Heart, Leaf, Package, Search, Utensils } from "lucide-react";
import { toast } from "sonner";
import { getCsrfToken } from "next-auth/react";

import AddToShoppingListForm from "@/components/forms/AddToShoppingListForm";
import LoadingSpinner from "@/components/layout/LoadingSpinner";
import PopoverActions from "@/components/layout/PopoverActions";
import IsAdmin from "@/components/isAdmin";
import IsUser from "@/components/isUser";

import UpdateMeal from "@/app/(views)/meals/_components/UpdateMeal";
import UpdateIngredient from "@/app/(views)/ingredients/_components/UpdateIngredient";
import UpdateHouseholdProduct from "@/app/(views)/household-products/_components/UpdateHouseholdProduct";

import { MealType, IngredientType, HouseholdProductType } from "@/lib/types/schemas_interfaces";
import { likedMealAPI } from "@/lib/services/meal_service";
import { ucFirst } from "@/lib/utils";


// _________________________ COMPONENT _________________________
const SearchResultsPage: React.FC = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get('query');

    const [mealResults, setMealResults] = useState<MealType[]>([]);
    const [ingredientResults, setIngredientResults] = useState<IngredientType[]>([]);
    const [productResults, setProductResults] = useState<HouseholdProductType[]>([]);
    const [likedMeals, setLikedMeals] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!query) return;

        const fetchResults = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/search?query=${query}`);
                if (!response.ok) throw new Error("Erreur lors de la recherche");
                const data = await response.json();
                setMealResults(data.meals ?? []);
                setIngredientResults(data.ingredients ?? []);
                setProductResults(data.householdProducts ?? []);
            } catch (error) {
                console.error("Error fetching search results", error);
            }
            setLoading(false);
        };

        fetchResults();
    }, [query]);

    // _________________________ CRUD REPAS _________________________
    const updateMeal = async (updatedMeal: MealType) => {
        setMealResults((prev) => prev.map((m) => m.id === updatedMeal.id ? { ...m, ...updatedMeal } : m));
    };

    const handleMealDeleted = (id: string) => {
        setMealResults((prev) => prev.filter((m) => m.id !== id));
    };

    const toggleLikeMeal = async (mealName: string) => {
        try {
            const csrfToken = await getCsrfToken();
            if (!csrfToken) return;
            likedMealAPI(mealName, csrfToken);
            setLikedMeals((prev) => {
                const next = new Set(prev);
                if (next.has(mealName)) {
                    next.delete(mealName);
                } else {
                    next.add(mealName);
                }
                return next;
            });
        } catch {
            toast.error("Impossible de modifier le statut du like");
        }
    };

    // _________________________ CRUD INGRÉDIENTS _________________________
    const updateIngredient = async (updatedIngredient: IngredientType) => {
        setIngredientResults((prev) => prev.map((i) => i.id === updatedIngredient.id ? { ...i, ...updatedIngredient } : i));
    };

    const handleIngredientDeleted = (id: string) => {
        setIngredientResults((prev) => prev.filter((i) => i.id !== id));
    };

    // _________________________ CRUD PRODUITS MÉNAGERS _________________________
    const updateProduct = async (updatedProduct: HouseholdProductType) => {
        setProductResults((prev) => prev.map((p) => p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p));
    };

    const handleProductDeleted = (id: string) => {
        setProductResults((prev) => prev.filter((p) => p.id !== id));
    };

    // _________________________ RENDU _________________________
    if (loading) return <LoadingSpinner />;

    const totalResults = mealResults.length + ingredientResults.length + productResults.length;

    return (
        <>
            <h1 className="h1-title">Résultats pour &laquo;&nbsp;{query}&nbsp;&raquo;</h1>

            {totalResults === 0 ? (
                <div className="mt-8 rounded-lg border border-zinc-200 bg-zinc-50 p-8 text-center">
                    <Search className="mx-auto mb-3 size-12 text-zinc-300" />
                    <p className="text-sm text-zinc-500">Aucun résultat pour cette recherche.</p>
                </div>
            ) : (
                <>
                    {/* Repas */}
                    {mealResults.length > 0 && (
                        <div className="card">
                            <h2 className="h2-title">
                                <Utensils className="h2-icons" />
                                Repas ({mealResults.length})
                            </h2>
                            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4" role="list">
                                {mealResults.map((meal) => (
                                    <li key={meal.id}>
                                        <article className="relative flex h-full flex-col rounded-lg border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md">

                                            <IsAdmin>
                                                <div className="absolute right-1 top-1 z-10">
                                                    <PopoverActions
                                                        id={meal.id}
                                                        apiUrl="/api/meals"
                                                        onDelete={() => handleMealDeleted(meal.id)}
                                                        renderEditForm={(onClose) => (
                                                            <UpdateMeal
                                                                meal={meal}
                                                                onSubmit={updateMeal}
                                                                onClose={onClose}
                                                            />
                                                        )}
                                                    />
                                                </div>
                                            </IsAdmin>

                                            <Link
                                                href={`/meals/${meal.name}`}
                                                className="flex flex-1 flex-col gap-1.5 p-3 pr-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-1"
                                                aria-label={`Voir la recette ${ucFirst(meal.name)}`}
                                            >
                                                <p className="line-clamp-2 text-sm font-semibold leading-snug text-zinc-900">
                                                    {ucFirst(meal.name)}
                                                </p>
                                                {meal.categoryMeal?.name && (
                                                    <span className="w-fit rounded-full bg-orange-50 px-2 py-0.5 text-xs font-medium text-orange-700">
                                                        {meal.categoryMeal.name}
                                                    </span>
                                                )}
                                            </Link>

                                            <div className="flex items-center justify-between border-t border-zinc-100 px-3 py-2">
                                                <AddToShoppingListForm type="meal" id={meal.id} />
                                                <IsUser>
                                                    <button
                                                        type="button"
                                                        aria-label={likedMeals.has(meal.name) ? "Retirer des favoris" : "Ajouter aux favoris"}
                                                        aria-pressed={likedMeals.has(meal.name)}
                                                        onClick={() => toggleLikeMeal(meal.name)}
                                                        className="flex size-8 items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                                                    >
                                                        <Heart
                                                            size={18}
                                                            aria-hidden="true"
                                                            className={`transition-colors ${likedMeals.has(meal.name) ? "fill-warm-danger text-warm-danger" : "text-warm-disabled hover:text-warm-danger"}`}
                                                        />
                                                    </button>
                                                </IsUser>
                                            </div>
                                        </article>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Ingrédients */}
                    {ingredientResults.length > 0 && (
                        <div className="card">
                            <h2 className="h2-title">
                                <Leaf className="h2-icons" />
                                Ingrédients ({ingredientResults.length})
                            </h2>
                            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4" role="list">
                                {ingredientResults.map((ingredient) => (
                                    <li key={ingredient.id}>
                                        <article className="relative flex h-full flex-col rounded-lg border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md">

                                            <IsAdmin>
                                                <div className="absolute right-1 top-1 z-10">
                                                    <PopoverActions
                                                        id={ingredient.id}
                                                        apiUrl="/api/ingredients"
                                                        onDelete={() => handleIngredientDeleted(ingredient.id)}
                                                        renderEditForm={(onClose) => (
                                                            <UpdateIngredient
                                                                ingredient={ingredient}
                                                                onSubmit={updateIngredient}
                                                                onCancel={onClose}
                                                            />
                                                        )}
                                                    />
                                                </div>
                                            </IsAdmin>

                                            <Link
                                                href={`/ingredients/${ingredient.name}`}
                                                className="flex flex-1 flex-col gap-1.5 p-3 pr-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-1"
                                                aria-label={`Voir l'ingrédient ${ucFirst(ingredient.name)}`}
                                            >
                                                <p className="line-clamp-2 text-sm font-semibold leading-snug text-zinc-900">
                                                    {ucFirst(ingredient.name)}
                                                </p>
                                                {ingredient.categoryIngredient?.name && (
                                                    <span className="w-fit rounded-full bg-orange-50 px-2 py-0.5 text-xs font-medium text-orange-700">
                                                        {ingredient.categoryIngredient.name}
                                                    </span>
                                                )}
                                            </Link>

                                            <div className="border-t border-zinc-100 px-3 py-2">
                                                <AddToShoppingListForm type="ingredient" id={ingredient.id} />
                                            </div>
                                        </article>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {/* Produits ménagers */}
                    {productResults.length > 0 && (
                        <div className="card">
                            <h2 className="h2-title">
                                <Package className="h2-icons" />
                                Produits ménagers ({productResults.length})
                            </h2>
                            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4" role="list">
                                {productResults.map((product) => (
                                    <li key={product.id}>
                                        <article className="relative flex h-full flex-col rounded-lg border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md">

                                            <IsAdmin>
                                                <div className="absolute right-1 top-1 z-10">
                                                    <PopoverActions
                                                        id={product.id}
                                                        apiUrl="/api/household-products"
                                                        onDelete={() => handleProductDeleted(product.id)}
                                                        renderEditForm={(onClose) => (
                                                            <UpdateHouseholdProduct
                                                                householdProduct={product}
                                                                onSubmit={updateProduct}
                                                                onCancel={onClose}
                                                            />
                                                        )}
                                                    />
                                                </div>
                                            </IsAdmin>

                                            <div className="flex flex-1 flex-col gap-1.5 p-3 pr-8">
                                                <p className="line-clamp-2 text-sm font-semibold leading-snug text-zinc-900">
                                                    {ucFirst(product.name)}
                                                </p>
                                                {product.categoryHouseholdProduct?.name && (
                                                    <span className="w-fit rounded-full bg-orange-50 px-2 py-0.5 text-xs font-medium text-orange-700">
                                                        {product.categoryHouseholdProduct.name}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="border-t border-zinc-100 px-3 py-2">
                                                <AddToShoppingListForm type="product" id={product.id} />
                                            </div>
                                        </article>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

const SearchResultsPageWrapper: React.FC = () => {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <SearchResultsPage />
        </Suspense>
    );
};

export default SearchResultsPageWrapper;
