import { z } from "zod";

// CONTRAINTES DE VALIDATION
export const categoriesConstraints = z.object({
    name: 
        z.string().
        min(3, "Le nom doit comporter au moins 3 caractères").
        max(100, "Le nom doit comporter au maximum 100 caractères").
        toLowerCase(),
});

export const idConstraints = z.object({
    id: z.string(),
});