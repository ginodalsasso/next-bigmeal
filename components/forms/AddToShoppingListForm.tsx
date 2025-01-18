'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { ShoppingListConstraints } from '@/lib/constraints/forms_constraints';
import Image from "next/image";
import add from "@/public/img/add.svg";
import {
    AddIngredientToShoppingListFormErrorType,
    AddIngredientToShoppingListFormType,
} from '@/lib/types/forms_interfaces';
import { Button } from '../ui/button';
import { useCsrfToken } from '@/app/context/CsrfContext';

interface AddToShoppingListFormProps {
    type: 'meal' | 'ingredient'; // Détermine le type d'ajout
    id: string; // ID du repas ou de l'ingrédient
}

const AddToShoppingListForm: React.FC<AddToShoppingListFormProps> = ({ type, id }) => {
    const csrfToken = useCsrfToken();
    const [quantity, setQuantity] = useState<AddIngredientToShoppingListFormType>({ quantity: 1 });
    const [error, setError] = useState<AddIngredientToShoppingListFormErrorType>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleAddToShoppingList = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError({});

        try {
            switch (type) {
                case 'meal': {
                    // Récupérer les ingrédients du repas
                    const response = await fetch(`/api/meals/${id}`);
                    if (!response.ok) {
                        throw new Error('Erreur lors de la récupération des ingrédients du repas');
                    }

                    const meal = await response.json();

                    // Ajouter chaque ingrédient du repas à la liste de courses
                    for (const composition of meal.compositions) {
                        if (!composition.ingredient?.id) {
                            console.error("Invalid ingredient in composition:", composition);
                            continue;
                        }
                
                        await fetch('/api/shopping-list', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                "X-CSRF-Token": csrfToken,
                            },
                            body: JSON.stringify({
                                ingredientId: composition.ingredient.id,
                                quantity: composition.quantity,
                            }),
                        });
                    }

                    toast('Les ingrédients du repas ont été ajoutés à la liste de courses');
                    break;
                }

                case 'ingredient': {
                    // Validation des quantités
                    const validationResult = ShoppingListConstraints.safeParse({ quantity: quantity.quantity });
                    if (!validationResult.success) {
                        const formattedErrors = validationResult.error.flatten();
                        setError({ quantity: formattedErrors.fieldErrors.quantity?.[0] });
                        setIsLoading(false);
                        return;
                    }

                    // Ajouter un ingrédient individuel
                    const response = await fetch('/api/shopping-list', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            "X-CSRF-Token": csrfToken,
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
                    break;
                }

                default:
                    throw new Error('Type d\'ajout non supporté');
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
                <p className="error-form">
                    {error.quantity}
                </p>
            )}
            <Button variant="ghost" className={isLoading ? 'opacity-50 cursor-not-allowed' : ''} disabled={isLoading}>
                <Image
                    src={add}
                    alt="Ajouter un ingrédient"
                    className="w-4"
                />
                {isLoading ? 'Ajout...' : type === 'meal' ? 'Ajouter le repas' : 'Ajouter l\'ingrédient'}
            </Button>
            {/* <button
                type="submit"
                className={`btn btn-primary ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isLoading}
            >
                {isLoading ? 'Ajout...' : type === 'meal' ? 'Ajouter le repas' : 'Ajouter l\'ingrédient'}
            </button> */}
        </form>
    );
};

export default AddToShoppingListForm;
