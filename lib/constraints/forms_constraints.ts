import { z } from "zod";
import { Season, IngredientUnit, UserStatus } from "../types/enums";

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
    season: z
        .nativeEnum(Season)
        .optional(),
    categoryIngredientId: z
        .string()
        .min(1, "Une catégorie est obligatoire"),
});

export const householdProductConstraints = z.object({
    name: z
        .string()
        .min(3, "Le nom doit comporter au moins 3 caractères")
        .max(100, "Le nom doit comporter au maximum 100 caractères")
        .toLowerCase()
        .trim(),
        categoryHouseholdProductId: z
        .string()
        .min(1, "Une catégorie est obligatoire"),
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


export const newCompositionConstraints = z.array(
    z.object({
        mealId: z.string(),
        ingredientId: z.string(),
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



export const preparationConstraints = z.object({
    mealId: z.string(),
    prepTime: z
        .number()
        .max(1000, "Le temps de préparation doit être inférieur à 1000 minutes")
        .positive("La quantité doit être un nombre positif.")
        .optional(),
    cookTime: z
        .number()
        .max(1000, "Le temps de cuisson doit être inférieur à 1000 minutes")
        .positive("La quantité doit être un nombre positif.")
        .optional()
});

// Omission de mealId pour la mise à jour de la préparation, extend=ajout de id
export const updatePreparationConstraints = preparationConstraints.omit({ mealId: true }).extend({
    id: z.string(), 
});


export const newStepConstraints = z.array(
    z.object({
        preparationId: z.string(),
        stepNumber: z
            .number()
            .min(1, "Le numéro du pas doit être supérieur à 0")
            .max(100, "Le numéro du pas doit être inférieur à 100")
            .positive("Le numéro du pas doit être un nombre positif."),
        description: z
            .string()
            .min(3, "La description doit comporter au moins 3 caractères")
            .max(2000, "La description doit comporter au maximum 2000 caractères"),
        imageUrl: z
            .string()
            .max(256, "L'url de l'image doit comporter au maximum 256 caractères")
            .nullable(),
    })
);

export const updateStepConstraints = z.object({
    id: z.string(),
    preparationId: z.string(),
    stepNumber: z
        .number()
        .min(1, "Le numéro du pas doit être supérieur à 0")
        .max(100, "Le numéro du pas doit être inférieur à 100")
        .positive("Le numéro du pas doit être un nombre positif."),
    description: z
        .string()
        .min(3, "La description doit comporter au moins 3 caractères")
        .max(2000, "La description doit comporter au maximum 2000 caractères"),
    imageUrl: z
        .string()
        .max(256, "L'url de l'image doit comporter au maximum 256 caractères")
        .optional(),
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


export const searchConstraints = z.object({
    query: z
        .string()
        .min(3, "La recherche doit comporter au moins 3 caractères")
        .max(100, "La recherche doit comporter au maximum 100 caractères"),
});


// _________________________ CONTRAINTES UTILISATEUR _________________________
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
        .min(3, "L'email doit comporter au moins 3 caractères")
        .max(100, "L'email doit comporter au maximum 100 caractères")
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
    confirmNewPassword: z
        .string()
        // .min(8, "Le mot de passe doit comporter au moins 8 caractères")
        .max(100, "Le mot de passe doit comporter au maximum 100 caractères")
        // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>~`'[\]\\/_+\-=])[A-Za-z\d!@#$%^&*(),.?":{}|<>~`'[\]\\/_+\-=]{12,}$/, "Le mot de passe doit comporter au moins 12 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial"),
        .trim(),
    
});

export const UpdateUserStatusConstraints = z.object({
    userId: z.string(),
    status: z.nativeEnum(UserStatus),
});      

export const ChangeEmailConstraints = z.object({
    email: z
        .string()
        .email()
        .min(3, "L'email doit comporter au moins 3 caractères")
        .max(100, "L'email doit comporter au maximum 100 caractères")
        .trim(),
});