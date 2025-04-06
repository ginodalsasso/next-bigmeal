// Liens de navigation
export const links = [
    { icon:"/img/cart.svg", title: "liste de courses", url: "/shopping-list" },
    { icon:"/img/ingredient.svg", title: "ingrédients", url: "/ingredients" },
    { icon:"/img/meal.svg", title: "repas", url: "/meals" },
    { icon:"/img/folder.svg", title: "catégorie ingrédient", url: "/categories-ingredient" },
    { icon:"/img/folder.svg", title: "catégorie repas", url: "/categories-meal" },
];

// Saisons et catégories
export const SEASONS = ["Printemps", "Été", "Automne", "Hiver"];
export const CATEGORIES_INGREDIENTS = ["Légumes", "Viandes", "Poissons", "Charcuterie", "Épices", "Fromage", "Divers", "Céréales"];
export const CATEGORIES_MEALS = ["Entrée", "Plat", "Dessert", "Apéro"];

export const CATEGORIES_MEALS_TOLOWER = CATEGORIES_MEALS.map(category => category.toLowerCase());

// Liste combinée pour les cas où on veut toutes les options
export const ALL_FILTER_OPTIONS = [...SEASONS, ...CATEGORIES_INGREDIENTS, ...CATEGORIES_MEALS];

// Nombre d'items par page pour la pagination
export const ITEMS_PER_PAGE = "3";