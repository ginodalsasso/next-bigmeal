import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


// Fonction de concaténation de classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// Majuscule à la première lettre
export function ucFirst(string: string): string {
  if (typeof string !== 'string' || string.length === 0) {
      return string; // Retourne la chaîne telle quelle si elle est vide ou non valide
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}


// Traduction des saisons
export const translatedSeason = (season: string | undefined): string | void => {
  switch (season) {
      case "SPRING":
          return "Printemps";
      case "SUMMER":
          return "Été";
      case "AUTUMN":
          return "Automne";
      case "WINTER":
          return "Hiver";
  }
};