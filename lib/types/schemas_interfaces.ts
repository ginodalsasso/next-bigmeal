import { UserStatus } from './enums';
import { Season, Unit } from "@prisma/client";


// TYPES SCHEMA
export interface CategoryIngredientType {
    id: string;
    name: string;

    // Relation One-to-Many
    ingredients?: IngredientType[];
}


export interface CategoryMealType {
    id: string;
    name: string;

    // Relation One-to-Many
    meals?: MealType[];
}

export interface CategoryHouseholdProductType {
    id: string;
    name: string;

    householdProducts?: HouseholdProductType[];
}


export interface CategoryType {
    id: string;
    name: string;
}


export interface HouseholdProductType {
    id: string;
    name: string;

    // Clé étrangère : Lie le produit à sa catégorie
    categoryHouseholdProductId?: string;
    categoryHouseholdProduct: CategoryHouseholdProductType;

    // Relation One-to-Many
    shoppingListItems?: ShoppingListItemType[];
}


export interface IngredientType {
    id: string;
    name: string;
    season: Season | null;

    // Clé étrangère : Lie l'ingrédient à sa catégorie
    categoryIngredientId?: string;
    categoryIngredient: CategoryIngredientType;

    // Relation One-to-Many
    compositions?: CompositionType[];

    // Relation One-to-Many
    shoppingListItems?: ShoppingListItemType[];
}


export interface MealType {
    id: string;
    name: string;
    description?: string | null;

    // Clé étrangère : Lie le repas à sa catégorie
    categoryMealId?: string;
    categoryMeal?: CategoryMealType;

    preparation?: PreparationType;

    // Relation One-to-Many
    compositions?: CompositionType[];

    // Relation One-to-Many
    shoppingListItems?: ShoppingListItemType[];
    mealLikes?: MealLikeType[];
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

    unit: Unit; 
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
    comment: string | null;
    
    isExpired: boolean;
    createdAt: Date;

    // Relation Many-to-One
    user?: UserType;
    items: ShoppingListItemType[];
}

export interface ShoppingListItemType {
    id: string;
    shoppingListId: string;

    ingredientId: string | null;
    mealId: string | null;
    productId: string | null;

    quantity: number;
    unit: Unit | null;
    comment: string | null;
    isChecked: boolean | null;

    shoppingList?: ShoppingListType;
    ingredient: IngredientType | null;
    meal: MealType | null;
    product: HouseholdProductType | null;
}


export interface UserType {
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
