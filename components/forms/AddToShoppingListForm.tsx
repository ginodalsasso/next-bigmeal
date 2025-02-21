'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { ShoppingListConstraints } from '@/lib/constraints/forms_constraints';
import Image from "next/image";
import add from "@/public/img/add.svg";
import { AddIngredientToShoppingListFormType } from '@/lib/types/forms_interfaces';
import { Button } from '../ui/button';
import { getCsrfToken } from 'next-auth/react';
import FormErrorMessage from './FormErrorMessage';
import { useFormValidation } from '@/app/hooks/useFormValidation';

interface AddToShoppingListFormProps {
    type: 'meal' | 'ingredient'; // Détermine le type d'ajout
    id: string; // ID du repas ou de l'ingrédient
}

const AddToShoppingListForm: React.FC<AddToShoppingListFormProps> = ({ type, id }) => {

    const [quantity, setQuantity] = useState<AddIngredientToShoppingListFormType>({ quantity: 0 });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Utilisation du hook de validation
    const { error, setError, validate } = useFormValidation<AddIngredientToShoppingListFormType>(
        ShoppingListConstraints,
        ["quantity"] // Liste des champs à valider
    );

    const handleAddToShoppingList = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError({});
        const csrfToken = await getCsrfToken();
        try {
            switch (type) {
                case 'meal': {
                    // Récupérer les ingrédients du repas
                    const response = await fetch(`/api/meals/${id}`);
                    if (!response.ok) throw new Error('Erreur lors de la récupération des ingrédients du repas');

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
                                mealId: meal.id,
                            }),
                        });
                    }
                    toast('Les ingrédients du repas ont été ajoutés à la liste de courses');
                    break;
                }

                case 'ingredient': {
                    // Valider la quantité
                    if(!validate(quantity)) {
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
                    if (!response.ok)  throw new Error('Erreur lors de l\'ajout de l\'ingrédient à la liste de courses');

                    toast('Ingrédient ajouté à la liste de courses avec succès');
                    break;
                }
                default:
                    throw new Error('Type d\'ajout non supporté');
            }
        } catch (error) {
            console.error('Erreur:', error);
            setError({ general: 'Erreur lors de l\'ajout à la liste de courses' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleAddToShoppingList}
            className="flex items-center justify-end gap-2 "
        >
            <FormErrorMessage message={error?.general} />

            {/* Si type = 'ingredient', on affiche le champ de quantité */}
            {type === 'ingredient' && (
                <input
                    type="number"
                    className="input-text-select"
                    value={quantity.quantity || ''}
                    min={1}
                    onChange={(e) => setQuantity({ quantity: parseInt(e.target.value) })}
                />
            )}
            <FormErrorMessage message={error?.quantity} />

            <Button variant="default" className={isLoading ? 'opacity-50 cursor-not-allowed' : 'w-full'} disabled={isLoading}>
                <Image
                    src={add}
                    alt="Ajouter un ingrédient"
                    className="w-4"
                />
                <span className="hidden sm:block">
                    {isLoading ? 'Ajout...' : type === 'meal' ? 'Ajouter le repas' : 'Ajouter l\'ingrédient'}
                </span>
            </Button>
        </form>
    );
};

export default AddToShoppingListForm;
