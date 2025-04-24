import { IngredientUnit, Season } from './enums';


// TYPES FORMULAIRES

// ____________ INGREDIENTS
export interface IngredientFormType {
    id?: string;
    name: string;
    season?: Season | null;
    categoryIngredientId: string;
}

// FORMULAIRE D'ERREUR INGREDIENT
export interface IngredientFormErrorType {
    id?: string;
    name?: string;
    season?: string | null;
    categoryIngredientId?: string;
}

// ____________ HOUSEHOLD PRODUCTS
export interface HouseholdProductFormType {
    id?: string;
    name: string;
    categoryHouseholdProductId: string;
}

// FORMULAIRE D'ERREUR INGREDIENT
export interface HouseholdProductFormErrorType {
    id?: string;
    name?: string;
    categoryHouseholdProductId?: string;
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


// ____________ COMPOSITION
export interface CompositionFormType {
    ingredientId: string;
    mealId: string;
    quantity: number;
    unit: IngredientUnit;
}

export interface UpdateCompositionFormType {
    id: string;
    quantity: number;
    unit?: IngredientUnit;
}

// FORMULAIRE D'ERREUR COMPOSITION
export interface CompositionFormErrorType {
    general?: string;
    ingredientId?: string;
    quantity?: string;
    unit?: string;
}


// ____________ PREPARATION & ÉTAPES
export interface PreparationFormType {
    mealId: string;
    id?: string;
    prepTime?: number;
    cookTime?: number;
}

export interface StepFormType {
    preparationId: string;
    stepNumber: number;
    description: string;
    imageUrl?: string | null;
}

// FORMULAIRE D'ERREUR STEP
export interface StepFormErrorType {
    general?: string;
    stepNumber?: string;
    description?: string;
    imageUrl?: string | null;
}


// ____________ CATEGORIES
// FORMULAIRE D'ERREUR CATEGORY
export interface CategoryFormErrorType {
    name?: string;
}


// ____________ USER    
export interface UserFormErrorType {
    general?: string;
    email?: string;
    password?: string;
}

export interface ForgotUserPasswordFormType {
    general?: string;
    password?: string;
    confirmPassword?: string;
}


// ____________ SHOPPING LIST
export interface AddProductToShoppingListFormType {
    quantity: number;
    unit?: IngredientUnit;
}

export interface AddProductToShoppingListFormErrorType {
    quantity?: string;
    unit?: string;
}
