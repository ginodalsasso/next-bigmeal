"use client";

import { useState } from "react";
import { getCsrfToken } from "next-auth/react";
import { toast } from "sonner";
import { ZodSchema } from "zod";
import { useFormValidation, ValidationErrors } from "./useFormValidation";

/**
 * Version sans validation pour les formulaires à état custom (tableaux dynamiques, etc.).
 * Gère uniquement CSRF → appel API → toast → onClose/onError.
 */
export const submitWithCsrf = async <R,>(options: {
    apiCall: (csrf: string) => Promise<R>;
    onSuccess: (result: R) => void;
    onError: (message: string) => void;
    successMessage: string;
    errorMessage: string;
    onClose?: () => void;
}): Promise<void> => {
    const { apiCall, onSuccess, onError, successMessage, errorMessage, onClose } = options;

    const csrfToken = await getCsrfToken();
    if (!csrfToken) {
        onError("Problème de sécurité, veuillez réessayer.");
        return;
    }

    try {
        const result = await apiCall(csrfToken);
        onSuccess(result);
        toast.success(successMessage);
        onClose?.();
    } catch (err) {
        console.error("[CRUD_ERROR]", err);
        onError(errorMessage);
    }
};

type SubmitOptions<T, R> = {
    // T = type du formulaire, R = type de la réponse de l'API
    form: T;
    apiCall: (form: T, csrf: string) => Promise<R>;
    onSuccess: (result: R) => void;
    successMessage: string;
    errorMessage: string;
    onClose?: () => void; // appelé après un submit réussi (ex: fermer le drawer)
};

/**
 * CRUD unifié : validation Zod → CSRF → appel API → toast → onClose.
 *
 * @param constraints - Schéma Zod du formulaire
 * @param fields - Champs à valider (pour affichage des erreurs par champ)
 * @returns `error` pour l'affichage, `setError` pour les erreurs custom, `submit` pour soumettre
 */
export const useCrudForm = <T extends object>(
    constraints: ZodSchema<T>,
    fields: (keyof T)[]
) => {
    const { error, setError, validate } = useFormValidation<T>(constraints, fields);
    const [isLoading, setIsLoading] = useState(false);

    const submit = async <R,>({
        form,
        apiCall,
        onSuccess,
        successMessage,
        errorMessage,
        onClose,
    }: SubmitOptions<T, R>): Promise<void> => {
        if (!validate(form)) return;

        setIsLoading(true);
        const csrfToken = await getCsrfToken();
        if (!csrfToken) {
            setError({ general: "Problème de sécurité, veuillez réessayer." } as ValidationErrors<T>);
            setIsLoading(false);
            return;
        }

        try {
            const result = await apiCall(form, csrfToken);
            onSuccess(result);
            toast.success(successMessage);
            onClose?.();
        } catch (err) {
            console.error("[CRUD_ERROR]", err);
            setError({ general: errorMessage } as ValidationErrors<T>);
        } finally {
            setIsLoading(false);
        }
    };

    return { error, setError, submit, isLoading };
};