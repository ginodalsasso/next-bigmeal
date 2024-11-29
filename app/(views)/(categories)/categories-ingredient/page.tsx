'use client';

import React, { useEffect, useState } from "react";
import { CategoryIngredientType } from "@/lib/types/schemas_interfaces";
import CategoryForm from "../_components/CategoryForm";
import CategoryCard from "../_components/CategoryCard";

const CategoryIngredientPage = () => {
    const [categoryIngredient, setCategoryIngredient] = useState<CategoryIngredientType[]>([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Récupérer les catégories d'ingrédients 
    useEffect(() => {
        const fetchCategoryIngredient = async () => {
            try {
                const response = await fetch('/api/categories-ingredient');
                if (!response.ok) {
                    throw new Error('Failed to fetch categories-ingredient');
                }
                const data: CategoryIngredientType[] = await response.json();
                setCategoryIngredient(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des catégories:', error);
                setError('Erreur lors de la récupération des catégories.');
            } finally {
                setLoading(false);
            }
        };
        fetchCategoryIngredient();
    }, []); 

    // Ajouter une catégorie
    const createCategoryIngredient = async (name: string) => {
        const response = await fetch('/api/categories-ingredient/crud', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        });

        if (!response.ok) {
            throw new Error('Failed to add category');
        }

        const newCategory: CategoryIngredientType = await response.json();
        setCategoryIngredient((prev) => [...prev, newCategory]);
    };

    // Appel API pour mettre à jour une catégorie
    const updateCategoryIngredient = async (id: string, newName: string) => {
        try {
            const response = await fetch('/api/categories-ingredient/crud', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, name: newName }),
            });

            if (!response.ok) {
                throw new Error('Failed to update category');
            }
            // Mettre à jour la catégorie dans le state
            const updatedCategory: CategoryIngredientType = await response.json();
            setCategoryIngredient((prev) => // Remplacer l'ancienne catégorie par la nouvelle
                prev.map((category) =>
                    category.id === id ? updatedCategory : category // Si l'id correspond, on remplace
                )
            );
        } catch (error) {
            console.error('Erreur lors de la modification:', error);
            setError('Erreur lors de la modification.');
        }
    };

    // Appel API pour supprimer une catégorie
    const deleteCategoryIngredient = async (id: string) => {
        try {
            const response = await fetch('/api/categories-ingredient/crud', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete category');
            }
            // Supprimer la catégorie du state 
            setCategoryIngredient((prev) => prev.filter((category) => category.id !== id));
        } catch (error) {
            console.error('Erreur lors de la suppression:', error);
            setError('Erreur lors de la suppression.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <CategoryForm onAddCategory={createCategoryIngredient} />
            <h1>Liste des catégories d&apos;ingrédients</h1>
            <div className="mt-6">
                {categoryIngredient.map((category) => (
                    <CategoryCard<CategoryIngredientType> 
                        key={category.id} 
                        category={category} 
                        onUpdateCategory={updateCategoryIngredient}
                        onDeleteCategory={deleteCategoryIngredient}
                    />
                ))}
            </div>
        </div>
    );
};

export default CategoryIngredientPage;
