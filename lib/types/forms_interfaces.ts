import { IngredientUnit, Season } from './enums';


// TYPES FORMULAIRES

// ____________ INGREDIENTS
export interface IngredientFormType {
    id: string;
    name: string;
    season: Season | null | undefined;
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
    general?: string;
    ingredientId?: string;
    quantity?: string;
    unit?: string;
}


export interface PreparationFormType {
    mealId: string;
    prepTime?: number;
    cookTime?: number;
}

export interface StepFormType {
    preparationId: string;
    stepNumber: number;
    description: string;
    imageUrl?: string;
}


export interface UpdateCompositionFormType {
    id: string;
    quantity: number
    unit?: IngredientUnit;
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
export interface AddIngredientToShoppingListFormType {
    quantity: number;
}

export interface AddIngredientToShoppingListFormErrorType {
    quantity?: string;
}
