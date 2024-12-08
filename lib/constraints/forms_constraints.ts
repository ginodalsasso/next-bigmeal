import { z } from "zod";
import { Season } from "../types/enums";

// _________________________ CONTRAINTES DE VALIDATION _________________________

export const idConstraints = z.object({
    id: z.string(),
});


export const categoriesConstraints = z.object({
    name: 
        z.string().
        min(3, "Le nom doit comporter au moins 3 caractères").
        max(100, "Le nom doit comporter au maximum 100 caractères").
        toLowerCase(),
});


export const ingredientConstraints = z.object({
    name: 
        z.string().
        min(3, "Le nom doit comporter au moins 3 caractères").
        max(100, "Le nom doit comporter au maximum 100 caractères").
        toLowerCase().
        trim(),
    season: 
        z.nativeEnum(Season).
        nullable(). 
        optional(). 
        default(null),
    categoryIngredientId: 
        z.string().
        min(1, "Une catégorie est obligatoire"),
});


export const mealConstraints = z.object({
    name: 
        z.string().
        min(3, "Le nom doit comporter au moins 3 caractères").
        max(100, "Le nom doit comporter au maximum 100 caractères").
        toLowerCase().
        trim(),
    description: 
        z.string().
        min(3, "La description doit comporter au moins 10 caractères").
        max(1000, "La description doit comporter au maximum 1000 caractères").
        nullable(). 
        optional(). 
        default(null),
    categoryMealId: 
        z.string().
        min(1, "Une catégorie est obligatoire"),
});