import { IngredientUnit, Season } from './enums';


// TYPES FORMULAIRES

// ____________ INGREDIENTS
export interface IngredientFormType {
    name: string;
    season: Season | null;
    categoryIngredientId: string;
}

// FORMULAIRE D'ERREUR INGREDIENT
export interface IngredientFormErrorType {
    id?: string;
    name?: string;
    season?: string | null;
    categoryIngredientId?: string;
}

// ____________ MEALS
export interface MealFormType {
    name: string;
    description?: string | null;
    categoryMealId: string;
}

// FORMULAIRE D'ERREUR MEAL
export interface MealFormErrorType {
    id?: string;
    name?: string;
    description?: string | null;
    categoryMealId?: string;
}

// export interface UpdateMealFormType {
//     id: string;
//     newName: string;
//     newDescription?: string | null;
//     newCategoryMealId: string;
// }

// ____________ COMPOSITION
export interface CompositionFormType {
    ingredientId: string;
    mealId: string;
    quantity: number;
    unit: IngredientUnit;
}

// FORMULAIRE D'ERREUR COMPOSITION
export interface CompositionFormErrorType {
    ingredientId?: string;
    quantity?: string;
    unit?: string;
}


// ____________ CATEGORIES
// FORMULAIRE D'ERREUR CATEGORY
export interface CategoryFormErrorType {
    name?: string;
}


// ____________ USER    
export interface UserFormErrorType {
    general?: string;
    username?: string;
    password?: string;
}

// FORMULAIRE DE CONNEXION
export interface AddIngredientToShoppingListFormType {
    quantity: number;
}

export interface AddIngredientToShoppingListFormErrorType {
    quantity?: string;
}
