import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ShoppingListType } from "./types/schemas_interfaces";

// Fonction de concaténation de classes
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Majuscule à la première lettre
export function ucFirst(string: string): string {
    if (typeof string !== "string" || string.length === 0) {
        return string; // Retourne la chaîne telle quelle si elle est vide ou non valide
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Conversion de la date en chaine de caractères
export function dateToString(date: Date): string {
    date = new Date(date);
    return date.toLocaleDateString("fr-CA", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

// Traduction des saisons
export const translatedSeason = (season: string | undefined): string => {
    switch (season) {
        case "SPRING":
            return "Printemps";
        case "SUMMER":
            return "Été";
        case "FALL":
            return "Automne";
        case "WINTER":
            return "Hiver";
        default:
            return "Non spécifié";
    }
};

export const reversedTranslatedSeason = (season: string): string => {
    switch (season) {
        case "Printemps":
            return "SPRING";
        case "Été":
            return "SUMMER";
        case "Automne":
            return "FALL";
        case "Hiver":
            return "WINTER";
        default:
            return "Non spécifié";
    }
}

// Traduction des unités de mesures
export const translatedUnit = (unit: string | undefined): string => {
    switch (unit) {
        case "GRAM":
            return "g";
        case "KILOGRAM":
            return "kg";
        case "LITER":
            return "L";
        case "MILLILITER":
            return "mL";
        case "CENTILITER":
            return "cL";
        case "PIECE":
            return "pce";
        default:
            return "Non spécifié";
    }
};

// Compter le nombre d'ingrédients dans une liste de courses
export const countTotalQuantities = (shoppingList: ShoppingListType[]): number => {
    let total = 0;

    // Parcourir chaque liste de courses
    for (const list of shoppingList) {
        // Parcourir chaque ingrédients de la liste
        for (const item of list.items) {
            total += item.quantity;
        }
    }

    total = Math.round(total * 100) / 100;

    return total
    ;
};

// Fonction utilitaire pour s'assurer que la valeur est un tableau
// et pour gérer les valeurs nulles ou indéfinies
export function ensureArray<T>(value: T | T[] | null | undefined): T[] {
    if (Array.isArray(value)) {
        return value;
    }
    // Si la valeur est nulle ou indéfinie, on retourne un tableau vide
    return value ? [value] : [];
}


/**
    - Fonction de tri getValue = fonction qui retourne la valeur à trier
    - Utilisation de la fonction localeCompare pour trier les chaînes de caractères
    - Typage générique pour permettre le tri de n'importe quel type d'objet

    - ex d'utilisation: sort(sortBy(item => item.ingredient?.name || item.product?.name || ""))
    - getValue = (item: T) => item.ingredient?.name || item.product?.name || ""
 */
export function sortBy<T>(getValue: (item: T) => string) {
    return (a: T, b: T): number => {
        const valueA = getValue(a) ?? ""; 
        const valueB = getValue(b) ?? "";
        // localeCompare renvoie :
        //   - un nombre < 0 si textA doit être avant textB
        //   - 0 si les deux textes sont équivalents
        //   - un nombre > 0 si textA doit être après textB
        return valueA.localeCompare(valueB); 
    };
}