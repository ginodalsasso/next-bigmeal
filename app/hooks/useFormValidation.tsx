import { useState } from "react";
import { ZodSchema } from "zod";

// Erreurs par champ + clé "general" pour les erreurs non liées à un champ
export type ValidationErrors<T> = Partial<Record<keyof T | "general", string>>;

/**
 * Valide un formulaire via un schéma Zod et expose les erreurs par champ.
 * @param constraints - Schéma Zod du formulaire
 * @param fields - Champs à valider
 */
export const useFormValidation = <T extends object>(
    constraints: ZodSchema<T>,
    fields: (keyof T)[]
) => {
    const [error, setError] = useState<ValidationErrors<T> | null>(null);

    const validate = (form: T): boolean => {
        const validationResult = constraints.safeParse(form);

        if (!validationResult.success) {
            const fieldErrors = validationResult.error.flatten().fieldErrors as Partial<Record<keyof T, string[]>>;

            const errors: ValidationErrors<T> = {};
            fields.forEach((field) => {
                errors[field] = fieldErrors[field]?.[0];
            });

            setError(errors);
            return false;
        }

        setError(null);
        return true;
    };

    return { error, setError, validate };
};
