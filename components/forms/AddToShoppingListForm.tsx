'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { ShoppingListConstraints } from '@/lib/constraints/forms_constraints';
import { AddProductToShoppingListFormType } from '@/lib/types/forms_interfaces';
import { useFormValidation } from '@/app/hooks/useFormValidation';
import { createShoppingListIngredientAPI, createShoppingListMealAPI, createShoppingListProductAPI } from '@/lib/services/shopping_list_service';
import { getCsrfToken } from 'next-auth/react';
import { Minus, Plus, ShoppingCart } from 'lucide-react';

interface AddToShoppingListFormProps {
    type: 'meal' | 'ingredient' | 'product';
    id: string;
}

const AddToShoppingListForm: React.FC<AddToShoppingListFormProps> = ({ type, id }) => {
    const [quantity, setQuantity] = useState<AddProductToShoppingListFormType>({ quantity: 1 });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { error, setError, validate } = useFormValidation<AddProductToShoppingListFormType>(
        ShoppingListConstraints,
        ["quantity"]
    );

    const increment = () => setQuantity((prev) => ({ quantity: prev.quantity + 1 }));
    const decrement = () => setQuantity((prev) => ({ quantity: Math.max(1, prev.quantity - 1) }));

    const handleAddToShoppingList = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError({});
        const csrfToken = await getCsrfToken();
        try {
            if (!csrfToken) {
                setError({ general: "Problème de sécurité, veuillez réessayer." });
                setIsLoading(false);
                return;
            }
            switch (type) {
                case 'meal': {
                    await createShoppingListMealAPI(id, csrfToken);
                    toast('Les ingrédients du repas ont été ajoutés à la liste de courses');
                    break;
                }
                case 'ingredient': {
                    if (!validate(quantity)) { setIsLoading(false); return; }
                    await createShoppingListIngredientAPI(id, quantity.quantity, csrfToken);
                    toast('Ingrédient ajouté à la liste de courses avec succès');
                    setQuantity({ quantity: 1 });
                    break;
                }
                case 'product': {
                    if (!validate(quantity)) { setIsLoading(false); return; }
                    await createShoppingListProductAPI(id, quantity.quantity, csrfToken);
                    toast('Produit ajouté à la liste de courses avec succès');
                    setQuantity({ quantity: 1 });
                    break;
                }
                default:
                    throw new Error("Type d'ajout non supporté");
            }
        } catch {
            setError({ general: "Erreur lors de l'ajout à la liste de courses" });
        } finally {
            setIsLoading(false);
        }
    };

    if (type === 'meal') {
        return (
            <form onSubmit={handleAddToShoppingList}>
                <button
                    type="submit"
                    disabled={isLoading}
                    aria-label="Ajouter le repas à la liste de courses"
                    className="flex size-8 items-center justify-center rounded-md bg-warm-accent text-white transition-colors hover:bg-warm-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-accent focus-visible:ring-offset-1 active:bg-warm-accent-hover disabled:opacity-50"
                >
                    <ShoppingCart size={16} aria-hidden="true" />
                </button>
            </form>
        );
    }

    return (
        <form onSubmit={handleAddToShoppingList} className="flex w-full items-center justify-between gap-1">
            {/* Stepper */}
            <div className="flex items-center rounded-md border border-warm-border" role="group" aria-label="Quantité">
                <button
                    type="button"
                    onClick={decrement}
                    disabled={quantity.quantity <= 1 || isLoading}
                    aria-label="Diminuer la quantité"
                    className="flex size-8 items-center justify-center rounded-l-md text-warm-secondary transition-colors hover:bg-warm-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warm-accent disabled:opacity-30"
                >
                    <Minus size={12} aria-hidden="true" />
                </button>

                <span
                    className="min-w-7 select-none text-center text-sm font-semibold tabular-nums text-warm-primary"
                    aria-live="polite"
                    aria-atomic="true"
                    aria-label={`Quantité : ${quantity.quantity}`}
                >
                    {quantity.quantity}
                </span>

                <button
                    type="button"
                    onClick={increment}
                    disabled={isLoading}
                    aria-label="Augmenter la quantité"
                    className="flex size-8 items-center justify-center rounded-r-md text-warm-secondary transition-colors hover:bg-warm-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warm-accent"
                >
                    <Plus size={12} aria-hidden="true" />
                </button>
            </div>

            {/* Bouton ajouter */}
            <button
                type="submit"
                disabled={isLoading}
                aria-label="Ajouter à la liste de courses"
                className="flex size-8 items-center justify-center rounded-md bg-warm-accent text-white transition-colors hover:bg-warm-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-accent focus-visible:ring-offset-1 active:bg-warm-accent-hover disabled:opacity-50"
            >
                <ShoppingCart size={15} aria-hidden="true" />
            </button>

            {error?.general && (
                <p role="alert" className="sr-only">{error.general}</p>
            )}
        </form>
    );
};

export default AddToShoppingListForm;
