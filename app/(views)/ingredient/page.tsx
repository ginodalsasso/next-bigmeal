'use client' 

import React, { useEffect, useState } from "react";
import IngredientCard from "./_components/IngredientCard";

const IngredientPage = () => {
    const [ingredients, setIngredients] = useState<IngredientType[]>([]); // Initialiser la liste des ingrédients
    // fetchIngredients
    useEffect(() => {
        const fetchIngredients = async () => {
            const response = await fetch('/api/ingredient'); 
            const data: IngredientType[] = await response.json(); // Récupérer les données en json
            setIngredients(data);
        };

        fetchIngredients();
    }, []); // Appeler la fonction fetchIngredients au chargement de la page

    return <>
        {ingredients.map(ingredient => (
            <div key={ingredient.id}>
                <IngredientCard ingredient = {ingredient} />
            </div>
        ))}
    </>;
};

export default IngredientPage;