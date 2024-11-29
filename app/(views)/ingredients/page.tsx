'use client' 

import React, { useEffect, useState } from "react";

import IngredientCard from "./_components/IngredientCard";
import { IngredientType } from "@/lib/types/schemas_interfaces";

const IngredientPage = () => {
    const [ingredients, setIngredients] = useState<IngredientType[]>([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Récupérer les ingrédients 
    useEffect(() => {
        const fetchIngredients = async () => {
            try{
                const response = await fetch('/api/ingredients');
                if (!response.ok) {
                    throw new Error('Failed to fetch ingredients');
                }
                const data: IngredientType[] = await response.json(); // Récupérer les données en json
                setIngredients(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des ingrédients:', error);
                setError('Erreur lors de la récupération des ingrédients');
            } finally {
                setLoading(false);
            }
        };
        fetchIngredients();
    }, []); 

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!ingredients) return <div>Ingredients introuvables.</div>;
    
    return <>
        {ingredients.map(ingredient => (
            <div key={ingredient.id}>
                <IngredientCard ingredient = {ingredient} />
            </div>
        ))}
    </>;
};

export default IngredientPage;