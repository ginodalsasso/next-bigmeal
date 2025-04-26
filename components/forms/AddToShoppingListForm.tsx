'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { ShoppingListConstraints } from '@/lib/constraints/forms_constraints';
import { AddProductToShoppingListFormType } from '@/lib/types/forms_interfaces';
import { Button } from '../ui/button';
import FormErrorMessage from './FormErrorMessage';
import { useFormValidation } from '@/app/hooks/useFormValidation';
import { getMeal } from '@/lib/services/data_fetcher';
import { createShoppingListIngredientAPI, createShoppingListMealAPI, createShoppingListProductAPI } from '@/lib/services/shopping_list_service';
import { getCsrfToken } from 'next-auth/react';
import { Plus } from 'lucide-react';

interface AddToShoppingListFormProps {
    type: 'meal' | 'ingredient' | 'product'; // Détermine le type d'ajout
    id: string; // ID du repas ou de l'ingrédient
}

const AddToShoppingListForm: React.FC<AddToShoppingListFormProps> = ({ type, id }) => {

    const [quantity, setQuantity] = useState<AddProductToShoppingListFormType>({ quantity: 1 });
    const [isLoading, setIsLoading] = useState<boolean>(false);
        
    // Utilisation du hook de validation
    const { error, setError, validate } = useFormValidation<AddProductToShoppingListFormType>(
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
                    const meal =  await getMeal(id);

                    // Ajouter chaque ingrédient du repas à la liste de courses
                    for (const composition of meal.compositions) {

                        if (!csrfToken) {
                            console.error("CSRF token invalide");
                            setError({ general: "Problème de sécurité, veuillez réessayer." });
                            return;
                        }

                        if (!composition.ingredient?.id) {
                            console.error("Invalid ingredient in composition:", composition);
                            continue;
                        }
                        console.log("Ingrédients ajoutés à la liste de courses avec succès", composition.ingredient.id);
                
                        await createShoppingListMealAPI(
                            meal.id, 
                            composition.ingredient.id, 
                            composition.quantity, 
                            composition.unit, 
                            csrfToken
                        );
                    }
                    toast('Les ingrédients du repas ont été ajoutés à la liste de courses');
                    break;
                }

                case 'ingredient': {

                    if (!csrfToken) {
                        console.error("CSRF token invalide");
                        setError({ general: "Problème de sécurité, veuillez réessayer." });
                        return;
                    }
                    
                    // Valider la quantité
                    if(!validate(quantity)) {
                        setIsLoading(false);
                        return;
                    }

                    await createShoppingListIngredientAPI(id, quantity.quantity, csrfToken);
                    
                    toast('Ingrédient ajouté à la liste de courses avec succès');
                    break;
                }

                case 'product': {
                    if (!csrfToken) {
                        console.error("CSRF token invalide");
                        setError({ general: "Problème de sécurité, veuillez réessayer." });
                        return;
                    }

                    // Valider la quantité
                    if(!validate(quantity)) {
                        setIsLoading(false);
                        return;
                    }

                    await createShoppingListProductAPI(id, quantity.quantity, csrfToken);
                    
                    toast('Produit ajouté à la liste de courses avec succès');
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
            className="flex items-center gap-2"
        >
            <FormErrorMessage message={error?.general} />

            {/* Si type = 'ingredient', on affiche le champ de quantité */}
            {(type === 'ingredient' || type === 'product') && (
                <input
                    type="number"
                    className="input-text-select lg:max-w-20"
                    value={quantity.quantity || ''}
                    min={1}
                    onChange={(e) => setQuantity({ quantity: parseInt(e.target.value) })}
                />
            )}
            <FormErrorMessage message={error?.quantity} />
            <Button variant="default" title='Ajouter' className={isLoading ? 'cursor-not-allowed opacity-50' : ''} disabled={isLoading}>
                <Plus />
            </Button>
        </form>
    );
};

export default AddToShoppingListForm;
