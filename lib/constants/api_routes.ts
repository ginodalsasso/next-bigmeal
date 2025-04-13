
// Si l'API_URL est défini on utilise la valeur, sinon on utilise la valeur par défaut
const apiBaseUrl = process.env.API_URL ?? "";

const BASE_URL = `${apiBaseUrl}/api`;

const authRoutes = {
    register: `${BASE_URL}/auth/register`,
    verifyPassword: `${BASE_URL}/auth/verify-password`,
};

const userRoutes = {
    profile: `${BASE_URL}/profile`,
    user: `${BASE_URL}/user`,
};

const resetPasswordRoutes = {
    sendEmail: `${BASE_URL}/reset-password`,
    verifyToken: `${BASE_URL}/verify-token`,
    resetPassword: `${BASE_URL}/reset-password`,
};

const confirmEmailRoutes = {
    confirmEmail: `${BASE_URL}/auth/register/confirm-email`,
};

const categoriesRoutes = {
    ingredient: `${BASE_URL}/categories-ingredient`,
    meal: `${BASE_URL}/categories-meal`,
};

const compositionsRoute = `${BASE_URL}/compositions`;
const preparationRoute = `${BASE_URL}/preparation`;
const stepRoute = `${BASE_URL}/step`;
const ingredientsRoute = `${BASE_URL}/ingredients`;
const mealsRoute = `${BASE_URL}/meals`;
const shoppingListRoute = {
    list: `${BASE_URL}/shopping-list`,
    item: `${BASE_URL}/shopping-list/item`,
}

// Export des routes
const API_ROUTES = {
    auth: authRoutes,
    user: userRoutes,
    resetPassword: resetPasswordRoutes,
    confirmEmail: confirmEmailRoutes,
    categories: categoriesRoutes,
    compositions: compositionsRoute,
    preparation: preparationRoute,
    step: stepRoute,
    ingredients: ingredientsRoute,
    meals: mealsRoute,
    shoppingList: shoppingListRoute,
};

export default API_ROUTES;