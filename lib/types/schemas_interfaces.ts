import { IngredientUnit, Season, UserStatus } from './enums.ts';


// TYPES SCHEMA
export interface CategoryIngredientType {
    id: string;
    name: string;

    // Relation One-to-Many 
    ingredients: IngredientType[];
}


export interface CategoryMealType {
    id: string;
    name: string; 

    // Relation One-to-Many
    meals: MealType[];
}

export interface CategoryHouseholdProductType {
    id: string;
    name: string;

    householdProducts: HouseholdProductType[];
}


export interface CategoryType {
    id: string;
    name: string;
}


export interface HouseholdProductType {
    id: string; 
    name: string; 
    description?: string; 

    // Clé étrangère : Lie le produit à sa catégorie
    categoryHouseholdProductId: string;
    categoryHouseholdProduct: CategoryHouseholdProductType;

    // Relation One-to-Many
    shoppingListItems: ShoppingListType[];
}


export interface IngredientType {
    id: string; 
    name: string; 
    season?: Season; 

    // Clé étrangère : Lie l'ingrédient à sa catégorie
    categoryIngredientId: string;
    categoryIngredient: CategoryIngredientType;

    // Relation One-to-Many
    compositions: CompositionType[];

    // Relation One-to-Many
    shoppingListItems: ShoppingListType[];
}


export interface MealType {
    id: string; 
    name: string; 
    description?: string; 

    // Clé étrangère : Lie le repas à sa catégorie
    categoryMealId: string;
    categoryMeal: CategoryMealType;

    preparation?: PreparationType; 

    // Relation One-to-Many 
    compositions: CompositionType[];

    // Relation One-to-Many
    shoppingListItems: ShoppingListType[];
    mealLikes: MealLikeType[];
}

export interface MealLikeType {
    id: string; 
    mealId: string; // Clé étrangère
    userId: string; // Clé étrangère

    meal: MealType;
    user: UserType;

    createdAt: Date;
}

export interface CompositionType {
    id: string;
    ingredientId: string; // Clé étrangère
    mealId: string; // Clé étrangère

    unit: IngredientUnit; 
    quantity: number;

    // Relations
    ingredient: IngredientType; // Référence à l'ingrédient associé
    meal: MealType; // Référence au repas associé
}

export interface PreparationType {
    id: string;
    mealId: string; // Clé étrangère
    // Relation Many-to-One
    meal: MealType;

    prepTime: number;
    cookTime?: number;

    steps: StepType[];

}

export interface StepType {
    id: string;
    preparationId: string; // Clé étrangère
    preparation: PreparationType;

    stepNumber: number;
    description: string;
    imageUrl?: string;
}


export interface ShoppingListType {
    id: string; 
    userId: string; // Clé étrangère
    comment?: string;
    
    isExpired: boolean;
    createdAt: Date;

    // Relation Many-to-One
    user: UserType;
    items : ShoppingListItemType[];
}

export interface ShoppingListItemType {
    id: string;
    shoppingListId: string; // Clé étrangère
    ingredientId: string; // Clé étrangère
    mealId: string; // Clé étrangère   
    productId: string; // Clé étrangère

    quantity: number;
    unit: IngredientUnit;
    comment?: string;
    isChecked?: boolean;

    // Relation Many-to-One
    shoppingList: ShoppingListType;
    ingredient: IngredientType;
    meal: MealType;
    product: HouseholdProductType;
}


export interface UserType {
    meals: boolean;
    id: string; 
    email: string; 
    password: string;
    createdAt: Date;
    role: string;
    status: UserStatus;
    emailVerified: Date;

    // Relation One-to-Many 
    shoppingList: ShoppingListType[];
    mealLikes: MealLikeType[];
}


export interface UserContextType {
    id: string;
    username: string;
    role: string;
    shoppingList: ShoppingListType[];
}
