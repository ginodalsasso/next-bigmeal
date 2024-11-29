import { Season } from './enums';


// TYPES FORMULAIRES
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

export interface CategoryFormErrorType {
    name: string;
}