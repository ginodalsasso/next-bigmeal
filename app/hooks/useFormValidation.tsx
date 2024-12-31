import { useState } from "react";
import { ZodSchema } from "zod"; 

// Définir un type générique pour les erreurs de validation
// `Partial<Record<keyof T, string>>` signifie :
// - Un objet où les clés sont les propriétés de `T` (grâce à `keyof T`)
// - Les valeurs sont des chaînes (messages d'erreur), ou peuvent être absentes (grâce à `Partial`)
type ValidationErrors<T> = Partial<Record<keyof T, string>>;

// Déclaration d'un hook personnalisé générique
// - `<T extends object>` : Le hook accepte un type `T` qui doit être un objet.
// - `constraints` : Une instance de `ZodSchema` qui valide des objets de type `T`.
export const useFormValidation = <T extends object>(
    constraints: ZodSchema<T>, // `constraints` : Une instance de `ZodSchema` qui valide des objets de type `T`.
    fields: (keyof T)[] // `fields` : Un tableau des propriétés de `T` (`keyof T` garantit que ce sont des clés valides de `T`).
) => {

    const [error, setError] = useState<ValidationErrors<T> | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Fonction pour valider un objet de type `T` (le formulaire à valider)
    const validate = (form: T): boolean => {

        const validationResult = constraints.safeParse(form);

        if (!validationResult.success) {
            const formattedErrors = validationResult.error.flatten();

            const fieldErrors = formattedErrors.fieldErrors as Partial<Record<keyof T, string[]>>;

            // Initialisation de l'objet `errors` pour stocker le premier message d'erreur de chaque champ
            const errors: ValidationErrors<T> = {};

            // Pour chaque champ à valider, extraire le premier message d'erreur (s'il existe)
            fields.forEach((field) => {
                errors[field] = fieldErrors[field]?.[0];
            });

            setError(errors);
            setIsLoading(false);

            return false;
        }
        setError(null);

        return true;
    };

    // Retourner les états et la fonction de validation pour utilisation dans les composants
    return { error, isLoading, setIsLoading, validate };
};
