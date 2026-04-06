import { db } from "@/lib/db";
import { AIRecipeResult } from "@/lib/types/ai_import_types";
import { Unit } from "@prisma/client";

export async function importRecipeToDB(recipe: AIRecipeResult) {
    const categoryMeal = await db.categoryMeal.findFirstOrThrow({
        where: { name: { equals: recipe.categoryMeal, mode: "insensitive" } },
    });

    const meal = await db.meal.create({
        data: {
            name: recipe.name,
            description: recipe.description ?? null,
            categoryMealId: categoryMeal.id,
        },
    });

    await Promise.allSettled(
        recipe.ingredients.map((ing) =>
            createCompositionForIngredient(meal.id, ing),
        ),
    );

    const preparation = await db.preparation.create({
        data: {
            mealId: meal.id,
            prepTime: recipe.prepTime ?? 0,
            cookTime: recipe.cookTime ?? 0,
        },
    });

    await Promise.allSettled(
        recipe.steps.map((step) =>
            db.step
                .create({
                    data: {
                        preparationId: preparation.id,
                        stepNumber: step.stepNumber,
                        description: step.description,
                    },
                })
                .catch((err) => {
                    console.error(
                        `[IMPORT] Étape ${step.stepNumber} ignorée :`,
                        err,
                    );
                }),
        ),
    );

    return db.meal.findUniqueOrThrow({
        where: { id: meal.id },
        include: {
            categoryMeal: true,
            preparation: { include: { steps: true } },
            compositions: {
                include: {
                    ingredient: { include: { categoryIngredient: true } },
                },
            },
        },
    });
}

async function createCompositionForIngredient(
    mealId: string,
    ing: AIRecipeResult["ingredients"][number],
) {
    try {
        const existing = await db.ingredient.findFirst({
            where: { name: { equals: ing.name, mode: "insensitive" } },
        });

        // Si l'ingrédient existe déjà, on l'utilise tel quel (même catégorie), sinon on crée un nouvel ingrédient avec la catégorie correspondante. Cela évite les doublons d'ingrédients et de catégories.
        const category = existing
            ? null
            : await db.categoryIngredient.findFirstOrThrow({
                where: {
                    name: {
                        equals: ing.categoryIngredient,
                        mode: "insensitive",
                    },
                },
            });   

        const ingredient =
            existing ??
            (await db.ingredient.create({
                data: {
                    name: ing.name,
                    categoryIngredientId: category!.id,
                },
            }));

        await db.composition.create({
            data: {
                mealId,
                ingredientId: ingredient.id,
                quantity: ing.quantity,
                unit: ing.unit as Unit,
            },
        });
    } catch (err) {
        console.error(`[IMPORT] Ingrédient "${ing.name}" ignoré :`, err);
    }
}
