'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';

interface AddToShoppingListFormProps {
    ingredientId: string;
}

const AddToShoppingListForm: React.FC<AddToShoppingListFormProps> = ({ ingredientId }) => {
    const [quantity, setQuantity] = useState<number>(0);
    
    const [loading, setLoading] = useState(false);

    const addToShoppingList = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/shopping-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    ingredientId,
                    quantity,
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
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                addToShoppingList();
            }}
            className="flex items-center gap-2"
        >
            <input
                type="number"
                className="text-black w-16 p-1 rounded"
                value={quantity}
                min={1}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10))} 
            />
            <button 
                type="submit" 
                className={`btn btn-primary ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
            >
                {loading ? 'Ajout...' : 'Ajouter à la liste de courses'}
            </button>
        </form>
    );
};

export default AddToShoppingListForm;
