import { Season } from './enums';


// TYPES FORMULAIRES

// INGREDIENTS
export interface IngredientFormType {
    name: string;
    season: Season | null;
    categoryIngredientId: string;
}
export interface IngredientFormErrorType {
    id?: string;
    name?: string;
    season?: string | null;
    categoryIngredientId?: string;
}
export interface UpdateIngredientProps {
    initialName: string;
    initialCategory: string;
    initialSeason: string;
    onSubmit: (newName: string, newCategory: string, newSeason: string) => Promise<void>;
    onCancel: () => void;
    isLoading: boolean;
    error: string | null;
}


// MEALS
export interface MealFormType {
    name: string;
    description?: string | null;
    categoryMealId: string;
}
export interface MealFormErrorType {
    id?: string;
    name?: string;
    description?: string | null;
    categoryMealId?: string;
}
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


// CATEGORIES
export interface CategoryFormErrorType {
    name?: string;
}
export interface UpdateCategoryProps {
    initialName: string;
    onSubmit: (newName: string) => Promise<void>;
    onCancel: () => void;
    isLoading: boolean;
    error: string | null;
}



