import { CompositionType, IngredientType, MealType, PreparationType, StepType } from "./schemas_interfaces";


// PROPS DES FORMULAIRES


// ____________ CATEGORIES
export interface CreateCategoryProps<T> { 
    apiUrl: string; // URL API dynamique
    onSubmit: (newCategory: T) => void;
}

// FORMULAIRE DE MISE A JOUR DE CATEGORIES
export interface UpdateCategoryProps<T> {
    apiUrl: string; // URL de l'API (ex: "/api/categories-meal" ou "/api/categories-ingredient")
    category: T; // La catégorie à mettre à jour
    onSubmit: (updatedCategory: T) => void; // Callback après mise à jour
    onCancel: () => void;
}


// ____________ INGREDIENTS
export interface CreateIngredientProps { 
    onSubmit: (ingredient: IngredientType) => void;
    onClose: () => void;
}

// FORMULAIRE DE MISE A JOUR D'INGREDIENT
export interface UpdateIngredientProps {
    ingredient: IngredientType; // Ingrédient à mettre à jour
    onSubmit: (updatedIngredient: IngredientType) => Promise<void>;
    onCancel: () => void;
}


// ____________ MEALS
export interface CreateMealProps {
    onSubmit: (meal: MealType) => void; // Fonction pour ajouter le repas à la liste parent
}

// FORMULAIRE DE MISE A JOUR DE MEAL
export interface UpdateMealProps {
    meal: MealType; // Repas à mettre à jour
    onSubmit: (meal: MealType) => Promise<void>; // Fonction pour mettre à jour le repas
    onClose: () => void; // Fonction pour fermer le dialogue
}


// ____________ PREPARATIONS
export interface PreparationItemProps {
    fetchedPreparation: PreparationType 
    onUpdate: (updatedPreparation: PreparationType) => Promise<void>; 
    onDelete: (id: string) => void; 
}

export interface CreatePreparationProps {
    mealId: string; // ID du repas parent de la préparation
    onSubmit: (preparation: PreparationType) => void;
}

export interface UpdatePreparationProps {
    initialPreparation: PreparationType; // Préparation à mettre à jour
    onSubmit: (updatedPreparation: PreparationType) => Promise<void>; // Fonction pour mettre à jour la préparation
    onClose: () => void; // Fonction pour fermer le Popover
}


// ____________ STEPS
export interface StepItemProps {
    step: StepType; 
    onUpdate: (updatedStep: StepType) => void; 
    onDelete: (id: string) => void; 
}

export interface CreateStepProps {
    preparationId: string; // ID de la préparation parent de l'étape
    onSubmit: (step: StepType) => void;
}

export interface UpdateStepProps {
    initialStep: StepType;
    onSubmit: (updatedStep: StepType) => void; // Fonction pour mettre à jour l'étape
    onClose: () => void; // Fonction pour fermer le Popover
}


// ____________ COMPOSITIONS
export interface CompositionItemProps {
    composition: CompositionType; 
    onUpdate: (updatedComposition: CompositionType) => void; 
    onDelete: (id: string) => void; 
}


export interface CreateCompositionProps {
    mealId: string; // ID du repas parent de la composition
    onSubmit: (composition: CompositionType[]) => void; // Callback pour ajouter la composition
}

export interface UpdateCompositionProps {
    initialComposition: CompositionType;
    onSubmit: (updatedComposition: CompositionType) => void; // Fonction pour mettre à jour la composition dans l'état parent
    onClose: () => void; // Fonction pour fermer le Popover
}