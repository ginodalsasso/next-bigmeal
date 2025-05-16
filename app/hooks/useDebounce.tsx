import { useEffect, useState } from "react";

/**
 * Hook personnalisé pour debouncer une valeur.
 * Le debouncing retarde la mise à jour de la valeur jusqu'à ce qu'un certain délai se soit écoulé sans modification.
 *
 * @template T - Le type de la valeur à debouncer.
 * @param {T} value - La valeur à debouncer.
 * @param {number} delay - Le délai en millisecondes avant la mise à jour de la valeur debounced.
 * @returns {T} - La valeur debounced.
 */
export function useDebounce<T>(value: T, delay: number): T {

    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // minuteur pour mettre à jour la valeur debounced après le délai spécifié
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay || 300); // Utilise un délai par défaut de 300 ms si aucun délai n'est spécifié

        // Nettoyage du minuteur pour éviter les mises à jour d'état inutiles
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]); // Re-exécute l'effet lorsque la valeur ou le délai change

    return debouncedValue;
}
