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

export interface UpdateCategoryProps {
    initialName: string;
    onSubmit: (newName: string) => Promise<void>;
    onCancel: () => void;
    isLoading: boolean;
    error: string | null;
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

