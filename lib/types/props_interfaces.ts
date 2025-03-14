import { CompositionType, IngredientType, MealType, PreparationType } from "./schemas_interfaces";


export interface CreateIngredientProps { 
    onSubmit: (ingredient: IngredientType) => void, 
    onClose: () => void 
}

// FORMULAIRE DE MISE A JOUR D'INGREDIENT
export interface UpdateIngredientProps {
    ingredient: IngredientType; // Ingrédient à mettre à jour
    onSubmit: (updatedIngredient: IngredientType) => Promise<void>;
    onCancel: () => void;
}


export interface CreateMealProps {
    onMealCreated: (meal: MealType) => void, // Fonction pour ajouter le repas à la liste parent
}

// FORMULAIRE DE MISE A JOUR DE MEAL
export interface UpdateMealProps {
    meal : MealType, // Repas à mettre à jour
    onSubmit: (meal: MealType) => Promise<void>, // Fonction pour mettre à jour le repas
    onClose: () => void // Fonction pour fermer le dialogue
}

export interface CreatePreparationProps {
    mealId: string; // ID du repas parent de la préparation
    onSubmit: (preparation: PreparationType) => void, 
}

export interface CreateCategoryProps<T> { 
    apiUrl: string; // URL API dynamique
    onSubmit: (newCategory: T) => void; 
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
    onSubmit: (composition: CompositionType[]) => void; // Callback pour ajouter la composition
}

export interface UpdateCompositionProps {
    initialComposition: CompositionType;
    onCompositionUpdated: (updatedComposition: CompositionType) => void; // Fonction pour mettre à jour la composition dans l'état parent
    onClose: () => void; // Fonction pour fermer le Popover
}
