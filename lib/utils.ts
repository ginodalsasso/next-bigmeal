export function ucFirst(string: string): string {
    if (typeof string !== 'string' || string.length === 0) {
        return string; // Retourne la chaîne telle quelle si elle est vide ou non valide
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}