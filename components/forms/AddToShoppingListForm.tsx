'use client';

import { ShoppingListConstraints } from '@/lib/constraints/forms_constraints';
import { AddToShoppingListFormErrorType, AddToShoppingListFormType } from '@/lib/types/forms_interfaces';
import React, { useState } from 'react';
import { toast } from 'sonner';

interface AddToShoppingListFormProps {
    ingredientId: string;
}

const AddToShoppingListForm: React.FC<AddToShoppingListFormProps> = ({ ingredientId }) => {
    const [quantity, setQuantity] = useState<AddToShoppingListFormType>({ quantity: 1 });
    
    const [error, setError] = useState<AddToShoppingListFormErrorType>({});
    const [isLoading, setIsLoading] = useState(false);

    const addToShoppingList = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError({});

        // Valider les données du formulaire
        const validationResult = ShoppingListConstraints.safeParse({ quantity: quantity.quantity });
        if (!validationResult.success) {
            const formattedErrors = validationResult.error.flatten();
            setError({
                quantity: formattedErrors.fieldErrors.quantity?.[0],
            });
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/shopping-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    ingredientId,
                    quantity: quantity.quantity,
                }),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'ajout à la shopping-list');
            }

            toast('Ingrédient ajouté à la shopping-list avec succès');
        } catch (error) {
            console.error('Erreur:', error);
            toast.error('Impossible d\'ajouter l\'ingrédient à la shopping-list.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            onSubmit={addToShoppingList}
            className="flex items-center gap-2"
        >
            <input
                type="number"
                className="text-black w-16 p-1 rounded"
                value={quantity.quantity}
                min={1}
                onChange={(e) => setQuantity({ quantity: parseInt(e.target.value) })} 
            />
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
                {isLoading ? 'Ajout...' : 'Ajouter à la liste de courses'}
            </button>
        </form>
    );
};

export default AddToShoppingListForm;
