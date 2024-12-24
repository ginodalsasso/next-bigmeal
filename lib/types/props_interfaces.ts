import { CompositionType, IngredientType, MealType } from "./schemas_interfaces";


export interface CreateIngredientProps { 
    onIngredientCreated: (ingredient: IngredientType) => void, 
    onClose: () => void 
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


export interface CreateMealProps {
    onMealCreated: (meal: MealType) => void, // Fonction pour ajouter le repas à la liste parent
    onClose: () => void // Fonction pour fermer le dialogue
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


export interface CreateCategoryProps { 
    onAddCategory: (name: string) => Promise<void>; 
}

// FORMULAIRE DE MISE A JOUR DE CATEGORIES
export interface UpdateCategoryProps {
    initialName: string;
    onSubmit: (newName: string) => Promise<void>;
    onCancel: () => void;
    isLoading: boolean;
    error: string | null;
}


export interface CreateCompositionProps {
    mealId: string; // ID du repas parent de la composition
    onCompositionCreated: (compositions: CompositionType[]) => void; // Callback pour ajouter les compositions
    onClose: () => void; // Callback pour fermer le dialogue
}

export interface UpdateCompositionProps {
    initialComposition: CompositionType;
    onCompositionUpdated: (updatedComposition: CompositionType) => void; // Fonction pour mettre à jour la composition dans l'état parent
    onClose: () => void; // Fonction pour fermer le Popover
}
