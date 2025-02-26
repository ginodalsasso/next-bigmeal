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
    id: z.string(),
    name: z
        .string()
        .min(3, "Le nom doit comporter au moins 3 caractères")
        .max(100, "Le nom doit comporter au maximum 100 caractères")
        .toLowerCase()
        .trim(),
    season: z.nativeEnum(Season).nullable(),
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
    email: z
        .string()
        .email()
        .min(3, "L'email doit comporter au moins 3 caractères")
        .max(100, "L'email doit comporter au maximum 100 caractères"),
    password: z
        .string()
        // .min(8, "Le mot de passe doit comporter au moins 8 caractères")
        .max(100, "Le mot de passe doit comporter au maximum 100 caractères")
        // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>~`'[\]\\/_+\-=])[A-Za-z\d!@#$%^&*(),.?":{}|<>~`'[\]\\/_+\-=]{12,}$/, "Le mot de passe doit comporter au moins 12 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial"),
        .trim(),
});

export const LoginConstraints = z.object({
    email: z
        .string()
        .email()
        // .nonempty("L'email ne peut pas être vide")
        .max(100, "L'email doit comporter au maximum 100 caractères"),
    password: z
        .string()
        // .nonempty("Le mot de passe ne peut pas être vide"),
});


export const ForgotPasswordConstraints = z.object({
    email: z
        .string()
        .email()
        .trim(),
});

export const NewPasswordConstraints = z.object({
    password: z
        .string()
        // .min(8, "Le mot de passe doit comporter au moins 8 caractères")
        .max(100, "Le mot de passe doit comporter au maximum 100 caractères")
        // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>~`'[\]\\/_+\-=])[A-Za-z\d!@#$%^&*(),.?":{}|<>~`'[\]\\/_+\-=]{12,}$/, "Le mot de passe doit comporter au moins 12 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial"),
        .trim(),
    confirmPassword: z
        .string()
        // .min(8, "Le mot de passe doit comporter au moins 8 caractères")
        .max(100, "Le mot de passe doit comporter au maximum 100 caractères")
        // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>~`'[\]\\/_+\-=])[A-Za-z\d!@#$%^&*(),.?":{}|<>~`'[\]\\/_+\-=]{12,}$/, "Le mot de passe doit comporter au moins 12 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial"),
        .trim(),
});

export const ResetPasswordConstraints = z.object({
    password: z
        .string()
        // .min(8, "Le mot de passe doit comporter au moins 8 caractères")
        .max(100, "Le mot de passe doit comporter au maximum 100 caractères")
        // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>~`'[\]\\/_+\-=])[A-Za-z\d!@#$%^&*(),.?":{}|<>~`'[\]\\/_+\-=]{12,}$/, "Le mot de passe doit comporter au moins 12 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial"),
        .trim(),
    newPassword: z
        .string()
        // .min(8, "Le mot de passe doit comporter au moins 8 caractères")
        .max(100, "Le mot de passe doit comporter au maximum 100 caractères")
        // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>~`'[\]\\/_+\-=])[A-Za-z\d!@#$%^&*(),.?":{}|<>~`'[\]\\/_+\-=]{12,}$/, "Le mot de passe doit comporter au moins 12 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial"),
        .trim(),
    confirmPassword: z
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

export const isCheckedShoppingListConstraints = z.object({
    id: z.string(),
    isChecked: z.boolean(),
});
