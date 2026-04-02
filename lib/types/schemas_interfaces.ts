import { Season, Unit, Status } from "@prisma/client";

export type Role = "USER" | "ADMIN";


// TYPES SCHEMA
export interface CategoryIngredientType {
    id: string;
    name: string;

    ingredients?: IngredientType[];
}


export interface CategoryMealType {
    id: string;
    name: string;

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

    categoryHouseholdProductId?: string;
    categoryHouseholdProduct?: CategoryHouseholdProductType;

    shoppingListItems?: ShoppingListItemType[];
}


export interface IngredientType {
    id: string;
    name: string;
    season: Season | null;

    categoryIngredientId?: string;
    categoryIngredient?: CategoryIngredientType;

    compositions?: CompositionType[];
    shoppingListItems?: ShoppingListItemType[];
}


export interface MealType {
    id: string;
    name: string;
    description?: string | null;

    categoryMealId?: string;
    categoryMeal?: CategoryMealType;

    preparation?: PreparationType;

    compositions?: CompositionType[];
    shoppingListItems?: ShoppingListItemType[];
    mealLikes?: MealLikeType[];
}

export interface MealLikeType {
    id: string;
    mealId: string;
    userId: string;

    meal: MealType;
    user: UserType;

    createdAt: Date;
}

export interface CompositionType {
    id: string;
    ingredientId: string;
    mealId: string;

    unit: Unit;
    quantity: number;

    ingredient: IngredientType;
    meal: MealType;
}

export interface PreparationType {
    id: string;
    mealId: string;
    meal: MealType;

    prepTime: number;
    cookTime: number | null;

    steps: StepType[];
}

export interface StepType {
    id: string;
    preparationId: string;
    preparation: PreparationType;

    stepNumber: number;
    description: string;
    imageUrl: string | null;
}


export interface ShoppingListType {
    id: string;
    userId: string;
    comment: string | null;

    isExpired: boolean;
    createdAt: Date;

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
    isChecked: boolean;

    shoppingList?: ShoppingListType;
    ingredient: IngredientType | null;
    meal: MealType | null;
    product: HouseholdProductType | null;
}


export interface UserType {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    password: string | null;
    image: string | null;
    role: Role | null;
    status: Status;
    createdAt: Date;
    updatedAt: Date;

    shoppingList: ShoppingListType[];
    mealLikes: MealLikeType[];
}


export interface UserContextType {
    id: string;
    username: string;
    role: Role | null;
    shoppingList: ShoppingListType[];
}
