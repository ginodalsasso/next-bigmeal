// Saisons — fixes par nature
export const SEASONS = ["Printemps", "Été", "Automne", "Hiver"];

// Catégories ingrédients — doit correspondre exactement au seed (prisma/seed.ts)
export const CATEGORIES_INGREDIENTS = [
    "Légumes",
    "Fruits",
    "Viandes & Poissons",
    "Produits laitiers & Œufs",
    "Féculents & Céréales",
    "Épices & Condiments",
    "Herbes aromatiques",
    "Huiles & Graisses",
    "Légumineuses",
];

// Catégories repas — doit correspondre exactement au seed (prisma/seed.ts)
export const CATEGORIES_MEALS = [
    "Plat principal",
    "Entrée",
    "Dessert",
    "Petit-déjeuner",
    "Snack & Apéro",
    "Soupe & Velouté",
];

// Catégories produits ménagers — doit correspondre exactement au seed (prisma/seed.ts)
export const CATEGORIES_HOUSEHOLD_PRODUCTS = [
    "Entretien & Nettoyage",
    "Lessive & Textile",
    "Hygiène & Beauté",
    "Cuisine & Conservation",
    "Papeterie & Divers",
    "Pharmacie & Premiers secours",
];

// Utilisé dans search-results pour distinguer un repas d'un ingrédient
export const CATEGORIES_MEALS_TOLOWER = CATEGORIES_MEALS.map(category => category.toLowerCase());

// Liste combinée pour les cas où on veut toutes les options
export const ALL_FILTER_OPTIONS = [...SEASONS, ...CATEGORIES_INGREDIENTS, ...CATEGORIES_MEALS, ...CATEGORIES_HOUSEHOLD_PRODUCTS];

// Nombre d'items par page pour la pagination
export const ITEMS_PER_PAGE = "10";

// Nombre d'items par page pour les grilles mosaïques
export const MEALS_PER_PAGE = "24";
export const INGREDIENTS_PER_PAGE = "24";
export const HOUSEHOLD_PER_PAGE = "24";