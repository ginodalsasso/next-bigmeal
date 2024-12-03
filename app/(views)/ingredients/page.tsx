'use client' 

import React, { useEffect, useState } from "react";

import IngredientCard from "./_components/IngredientCard";
import { IngredientType } from "@/lib/types/schemas_interfaces";

// _________________________ COMPOSANT _________________________
const IngredientPage = () => {

    // _________________________ ETATS _________________________
    const [ingredients, setIngredients] = useState<IngredientType[]>([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    // _________________________ LOGIQUE _________________________
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


    // Appel API pour mettre à jour un ingrédient
    const updateIngredient = async (id: string, newName: string, newCategory: string, newSeason: string) => {
        try {
            const response = await fetch('/api/ingredients/crud', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, name: newName, categoryIngredientId: newCategory, newSeason }),
            });

            if (!response.ok) {
                throw new Error('Failed to update ingredient');
            }
            // Mettre à jour l'ingredient dans le state
            const updatedIngredient: IngredientType = await response.json();
            setIngredients((prev) => // Remplacer l'ancienne ingredient par la nouvelle
                prev.map((ingredient) =>
                    ingredient.id === id ? updatedIngredient : ingredient // Si l'id correspond, on remplace
                )
            );
        } catch (error) {
            console.error('Erreur lors de la modification:', error);
            setError('Erreur lors de la modification.');
        }
    };


    // Appel API pour supprimer un ingrédient
    const deleteIngredient = async (id: string) => {
        try {
            const response = await fetch('/api/ingredients/crud', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete ingredient');
            }
            // Supprimer l'ingrédient du state 
            setIngredients((prev) => prev.filter((ingredient) => ingredient.id !== id));
        } catch (error) {
            console.error('Erreur lors de la suppression:', error);
            setError('Erreur lors de la suppression.');
        }
    };


    // _________________________ RENDU _________________________
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!ingredients) return <div>Ingredients introuvables.</div>;
    
    return <>
        {ingredients.map(ingredient => (
            <div key={ingredient.id}>
                <IngredientCard 
                    ingredient = {ingredient} 
                    onUpdateIngredient= {updateIngredient}
                    onDeleteIngredient = {deleteIngredient}
                />
            </div>
        ))}
    </>;
};

export default IngredientPage;