'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';

interface AddMealToShoppingListFormProps {
    mealId: string;
}

const AddMealToShoppingListForm: React.FC<AddMealToShoppingListFormProps> = ({ mealId }) => {
    const [isLoading, setIsLoading] = useState(false);

    const addMealToShoppingList = async () => {
        setIsLoading(true);

        try {
            // // Récupérer les ingrédients du plat
            const response = await fetch(`/api/meals/${(mealId)}`);
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des ingrédients du plat');
            }

            const meal = await response.json();

            // Pour chaque ingrédient du plat, ajouter à la liste de courses
            for (const ingredient of meal.compositions) {
                await fetch('/api/shopping-list', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ingredientId: ingredient.id,
                        quantity: ingredient.quantity,
                    }),
                });
            }

            toast('Les ingrédients du plat ont été ajoutés à la liste de courses');
        } catch (error) {
            console.error('Erreur:', error);
            toast.error('Impossible d\'ajouter les ingrédients du plat à la liste de courses.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={addMealToShoppingList}
            className={`btn btn-primary ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
        >
            {isLoading ? 'Ajout...' : 'Ajouter le plat à la liste'}
        </button>
    );
};

export default AddMealToShoppingListForm;
