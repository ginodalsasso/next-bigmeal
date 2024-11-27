import Link from "next/link";
import React from "react";
// import { formatDate } from "@/lib/utils"
// import Button from "./Button";
// import DeleteArticle from "@/app/article/[articleId]/delete/page";

interface IngredientCardProps {
    ingredient: IngredientType; 
}

const IngredientCard:React.FC<IngredientCardProps> = ({ ingredient }) => {

    return (
        <Link 
            href={`/ingredient/${ingredient.id}`} 
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
