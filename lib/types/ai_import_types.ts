import { z } from "zod";

export const VALID_UNITS = [
    "GRAM", "KILOGRAM", "LITER", "CENTILITER", "MILLILITER",
    "PIECE", "TEASPOON", "TABLESPOON", "PINCH", "CUP", "SLICE", "HANDFUL", "BUNCH"
] as const;

const AIIngredientSchema = z.object({
    name: z.string().min(1).max(200),
    quantity: z.number().positive().max(99999),
    unit: z.enum(VALID_UNITS),
    categoryIngredient: z.string().max(200).optional(),
});

const AIStepSchema = z.object({
    stepNumber: z.number().int().positive().max(999),
    description: z.string().min(1).max(2000),
});

export const AIRecipeResultSchema = z.object({
    name: z.string().min(1).max(300),
    description: z.string().max(1000).optional(),
    categoryMeal: z.string().min(1).max(200),
    prepTime: z.number().int().nonnegative().max(1440).nullable().optional(),
    cookTime: z.number().int().nonnegative().max(1440).nullable().optional(),
    ingredients: z.array(AIIngredientSchema).min(1).max(100),
    steps: z.array(AIStepSchema).min(1).max(50),
});

export type AIIngredient = z.infer<typeof AIIngredientSchema>;
export type AIStep = z.infer<typeof AIStepSchema>;
export type AIRecipeResult = z.infer<typeof AIRecipeResultSchema>;
