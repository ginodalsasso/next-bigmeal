import { IngredientUnit, Season } from './enums.ts';


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

export interface CategoryType {
    id: string;
    name: string;
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

    // Relation One-to-Many 
    compositions: CompositionType[];

    // Relation One-to-Many
    shoppingListItems: ShoppingListType[];
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

    quantity: number;
    comment?: string;
    isChecked?: boolean;

    // Relation Many-to-One
    shoppingList: ShoppingListType;
    ingredient: IngredientType;
    meal: MealType;
}


export interface UserType {
    id: string; 
    email: string; 
    password: string;
    createdAt: Date;
    role: string;

    // Relation One-to-Many 
    shoppingList: ShoppingListType[];
}


export interface UserContextType {
    id: string;
    username: string;
    role: string;
    shoppingList: ShoppingListType[];
}
