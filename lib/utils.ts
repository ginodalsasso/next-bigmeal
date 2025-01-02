import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
        case "AUTUMN":
            return "Automne";
        case "WINTER":
            return "Hiver";
        default:
            return "Non spécifié";
    }
};

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
