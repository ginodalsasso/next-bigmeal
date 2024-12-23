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

// FORMULAIRE DE MISE A JOUR D'INGREDIENT
export interface UpdateIngredientProps {
    initialName: string;
    initialCategory: string;
    initialSeason: string;
    onSubmit: (newName: string, newCategory: string, newSeason: string) => Promise<void>;
    onCancel: () => void;
    isLoading: boolean;
    error: string | null;
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

// FORMULAIRE DE MISE A JOUR DE MEAL
export interface UpdateMealProps {
    initialName: string;
    initialCategory: string;
    initialDescription: string;
    onSubmit: (newName: string, newCategory: string, newDescription: string) => Promise<void>;
    onCancel: () => void;
    isLoading: boolean;
    error: string | null;
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

// FORMULAIRE DE MISE A JOUR DE CATEGORIES
export interface UpdateCategoryProps {
    initialName: string;
    onSubmit: (newName: string) => Promise<void>;
    onCancel: () => void;
    isLoading: boolean;
    error: string | null;
}



