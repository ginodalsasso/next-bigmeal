import { z } from "zod";
import { Season, IngredientUnit } from "../types/enums";

// _________________________ CONTRAINTES DE VALIDATION _________________________

export const idConstraints = z.object({
    id: z.string(),
});

export const categoriesConstraints = z.object({
    name: z
        .string()
        .min(3, "Le nom doit comporter au moins 3 caractères")
        .max(100, "Le nom doit comporter au maximum 100 caractères")
        .toLowerCase(),
});

export const ingredientConstraints = z.object({
    name: z
        .string()
        .min(3, "Le nom doit comporter au moins 3 caractères")
        .max(100, "Le nom doit comporter au maximum 100 caractères")
        .toLowerCase()
        .trim(),
    season: z.nativeEnum(Season).nullable().optional().default(null),
    categoryIngredientId: z.string().min(1, "Une catégorie est obligatoire"),
});

export const mealConstraints = z.object({
    name: z
        .string()
        .min(3, "Le nom doit comporter au moins 3 caractères")
        .max(100, "Le nom doit comporter au maximum 100 caractères")
        .toLowerCase()
        .trim(),
    description: z
        .string()
        .min(10, "La description doit comporter au moins 10 caractères")
        .max(2000, "La description doit comporter au maximum 2000 caractères")
        .nullable()
        .optional()
        .default(null),
    categoryMealId: z.string().min(1, "Une catégorie est obligatoire"),
});

export const updateCompositionConstraints = z.object({
    id: z.string(),
    quantity: z
        .number({ message: "La quantité doit être un nombre" })
        .min(0.1, "La quantité doit être supérieure à 0")
        .max(1000, "La quantité doit être inférieure à 1000")
        .positive("La quantité doit être un nombre positif."),
    unit: z.nativeEnum(IngredientUnit, {
        message: "Veuillez sélectionner une unité",
    }),
});

export const newCompositionConstraints = z.array(
    z.object({
        ingredientId: z.string(),
        mealId: z.string(),
        quantity: z
            .number({ message: "La quantité doit être un nombre" })
            .min(0.1, "La quantité doit être supérieure à 0")
            .max(1000, "La quantité doit être inférieure à 1000")
            .positive("La quantité doit être un nombre positif."),
        unit: z.nativeEnum(IngredientUnit, {
            message: "Veuillez sélectionner une unité",
        }),
    })
);

export const RegisterConstraints = z.object({
    username: z
        .string()
        .min(3, "Le nom d'utilisateur doit comporter au moins 3 caractères")
        .max(100, "Le nom d'utilisateur doit comporter au maximum 100 caractères")
        // .regex(/^[a-zA-Z0-9_-]+$/, "Le nom d'utilisateur ne doit contenir que des lettres, des chiffres, des tirets et des underscores")
        .trim(),
    password: z
        .string()
        // .min(8, "Le mot de passe doit comporter au moins 8 caractères")
        .max(100, "Le mot de passe doit comporter au maximum 100 caractères")
        // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>~`'[\]\\/_+\-=])[A-Za-z\d!@#$%^&*(),.?":{}|<>~`'[\]\\/_+\-=]{12,}$/, "Le mot de passe doit comporter au moins 12 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial"),
        .trim(),
});


export const ShoppingListConstraints = z.object({
    quantity: z
        .number({ message: "La quantité doit être un nombre" })
        .min(0.1, "La quantité doit être supérieure à 0")
        .max(10000, "La quantité doit être inférieure à 10000")
        .positive("La quantité doit être un nombre positif."),
});