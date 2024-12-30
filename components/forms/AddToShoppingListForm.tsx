'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { ShoppingListConstraints } from '@/lib/constraints/forms_constraints';
import {
    AddIngredientToShoppingListFormErrorType,
    AddIngredientToShoppingListFormType,
} from '@/lib/types/forms_interfaces';

interface AddToShoppingListFormProps {
    type: 'meal' | 'ingredient'; // Détermine le type d'ajout
    id: string; // ID du repas ou de l'ingrédient
}

const AddToShoppingListForm: React.FC<AddToShoppingListFormProps> = ({ type, id }) => {
    const [quantity, setQuantity] = useState<AddIngredientToShoppingListFormType>({ quantity: 1 });
    
    const [error, setError] = useState<AddIngredientToShoppingListFormErrorType>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleAddToShoppingList = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError({});

        // Validation pour les quantités (uniquement pour les ingrédients individuels)
        if (type === 'ingredient') {
            const validationResult = ShoppingListConstraints.safeParse({ quantity: quantity.quantity });
            if (!validationResult.success) {
                const formattedErrors = validationResult.error.flatten();
                setError({ quantity: formattedErrors.fieldErrors.quantity?.[0] });
                setIsLoading(false);
                return;
            }
        }

        try {
            if (type === 'meal') {
                // Récupérer les ingrédients d'un repas
                const response = await fetch(`/api/meals/${id}`);
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des ingrédients du repas');
                }

                const meal = await response.json();

                // Ajouter chaque ingrédient du repas à la liste de courses
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

                toast('Les ingrédients du repas ont été ajoutés à la liste de courses');
            } else if (type === 'ingredient') {
                // Ajouter un ingrédient individuel
                const response = await fetch('/api/shopping-list', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ingredientId: id,
                        quantity: quantity.quantity,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Erreur lors de l\'ajout de l\'ingrédient à la liste de courses');
                }

                toast('Ingrédient ajouté à la liste de courses avec succès');
            }
        } catch (error) {
            console.error('Erreur:', error);
            toast.error('Impossible d\'ajouter à la liste de courses.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleAddToShoppingList}
            className="flex items-center gap-2"
        >
            {/* Si type = 'ingredient', on affiche le champ de quantité */}
            {type === 'ingredient' && (
                <input
                    type="number"
                    className="text-black w-16 p-1 rounded"
                    value={quantity.quantity}
                    min={1}
                    onChange={(e) => setQuantity({ quantity: parseInt(e.target.value) })}
                />
            )}
            {error.quantity && (
                <p className="text-red-500 text-sm mb-4 mx-auto">
                    {error.quantity}
                </p>
            )}
            <button
                type="submit"
                className={`btn btn-primary ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isLoading}
            >
                {isLoading ? 'Ajout...' : type === 'meal' ? 'Ajouter le repas' : 'Ajouter l\'ingrédient'}
            </button>
        </form>
    );
};

export default AddToShoppingListForm;
