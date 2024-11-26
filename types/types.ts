// ENUMS
enum IngredientUnit {
    GRAM = "gramme",
    KILOGRAM = "kilogramme",
    LITER = "litre",
    CENTILITER = "centilitre",
    MILLILITER = "millilitre",
    PIECE = "pièce",
}

enum Season {
    SPRING = "printemps",
    SUMMER = "été",
    FALL = "automne",
    WINTER = "hiver",
}


// INTERFACES TYPES
interface CategoryIngredientType {
    id: string;
    name: string;

    // Relation One-to-Many 
    ingredients: IngredientType[];
}


interface CategoryMealType {
    id: string;
    name: string; 

    // Relation One-to-Many
    meals: MealType[];
}


interface IngredientType {
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


interface MealType {
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


interface CompositionType {
    id: string;
    ingredientId: string; // Clé étrangère
    mealId: string; // Clé étrangère

    unit: IngredientUnit; 
    quantity: number;

    // Relations
    ingredient: IngredientType; // Référence à l'ingrédient associé
    meal: MealType; // Référence au repas associé
}


interface ShoppingListType {
    id: string; 
    userId: string; // Clé étrangère
    ingredientId?: string; // Clé étrangère optionnelle
    mealId?: string; // Clé étrangère optionnelle

    quantity: number; 
    comment?: string; 
    isPurchased: boolean; 
    createdAt: Date;

    // Relations
    user: UserType; // Référence à l'utilisateur associé
    ingredient?: IngredientType; // Référence optionnelle à l'ingrédient associé
    meal?: MealType; // Référence optionnelle au repas associé
}


interface UserType {
    id: string; 
    username: string; 
    password: string;
    createdAt: Date;
    isAdmin: boolean;

    // Relation One-to-Many 
    shoppingListItems: ShoppingListType[];
}
