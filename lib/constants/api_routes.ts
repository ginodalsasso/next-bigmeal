// Si l'API_URL est défini on utilise la valeur, sinon on utilise la valeur par défaut
const apiBaseUrl = process.env.API_URL ?? "";

const BASE_URL = `${apiBaseUrl}/api`;

const authRoutes = {
    register: `${BASE_URL}/auth/register`,
};

const userRoutes = {
    profile: `${BASE_URL}/profile`,
};

const resetPasswordRoutes = {
    sendEmail: `${BASE_URL}/reset-password`,
    verifyToken: `${BASE_URL}/verify-token`,
    resetPassword: `${BASE_URL}/reset-password`,
};

const categoriesRoutes = {
    ingredient: `${BASE_URL}/categories-ingredient`,
    meal: `${BASE_URL}/categories-meal`,
};

const compositionsRoute = `${BASE_URL}/compositions`;
const ingredientsRoute = `${BASE_URL}/ingredients`;
const mealsRoute = `${BASE_URL}/meals`;
const shoppingListRoute = `${BASE_URL}/shopping-list`;

// Export des routes
const API_ROUTES = {
    auth: authRoutes,
    user: userRoutes,
    resetPassword: resetPasswordRoutes,
    categories: categoriesRoutes,
    compositions: compositionsRoute,
    ingredients: ingredientsRoute,
    meals: mealsRoute,
    shoppingList: shoppingListRoute,
};

export default API_ROUTES;