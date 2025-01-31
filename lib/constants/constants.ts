// Liens de navigation
export const links = [
    { title: "ingrédients", url: "/ingredients" },
    { title: "repas", url: "/meals" },
    { title: "catégorie ingrédient", url: "/categories-ingredient" },
    { title: "catégorie repas", url: "/categories-meal" },
    { title: "liste de courses", url: "/shopping-list" },
];

// Saisons et catégories
export const SEASONS = ["Printemps", "Été", "Automne", "Hiver"];
export const CATEGORIES_INGREDIENTS = ["Légumes", "Viandes", "Poissons", "Charcuterie", "Épices", "Fromage", "Divers", "Céréales"];
export const CATEGORIES_MEALS = ["Entrée", "Plat", "Dessert", "Apéro"];

// Liste combinée pour les cas où on veut toutes les options
export const ALL_FILTER_OPTIONS = [...SEASONS, ...CATEGORIES_INGREDIENTS, ...CATEGORIES_MEALS];