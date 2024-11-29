import Link from "next/link";
import React from "react";
import { IngredientType } from "@/lib/types/schemas_interfaces";

interface IngredientCardProps {
    ingredient: IngredientType; 
}

const IngredientCard:React.FC<IngredientCardProps> = ({ ingredient }) => {

    return (
        <Link 
            href={`/ingredients/${ingredient.id}`} 
            >
            <div
                key={ingredient.id}
                className="border border-gray-500 p-6 rounded-xl"
            >
                <h2 className="text-xl font-bold">{ingredient.name}</h2>
                <p>Catégorie: {ingredient.categoryIngredient.name}</p>
                {ingredient.season && (
                    <p>Saison: {ingredient.season}</p>
                )}

            </div>
        </Link>
    );
};

export default IngredientCard;
