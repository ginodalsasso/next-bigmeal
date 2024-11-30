'use client' 

import React, { useEffect, useState } from "react";
import { CategoryMealType } from "@/lib/types/schemas_interfaces";
import CategoryForm from "../_components/CategoryForm";
import CategoryCard from "../_components/CategoryCard";

const CategoryMealPage = () => {
    const [categoryMeal, setCategoryMeal] = useState<CategoryMealType[]>([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Récupérer les catégories de repas 
    useEffect(() => {
        const fetchCategoryMeal = async () => {
            try{
                const response = await fetch('/api/categories-meal');
                if (!response.ok) {
                    throw new Error('Failed to fetch categories-meal');
                }
                const data: CategoryMealType[] = await response.json(); 
                setCategoryMeal(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des catégories de repas:', error);
                setError('Erreur lors de la récupération des catégories de repas');
            } finally {
                setLoading(false);
            }
        };
        fetchCategoryMeal();
    }, []); 

    // Appel API pour ajouter une catégorie
    const createCategoryMeal = async (name: string) => {
        const response = await fetch('/api/categories-meal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        });

        if (!response.ok) {
            throw new Error('Failed to add category');
        }

        const newCategory: CategoryMealType = await response.json();

        // Mettre à jour la liste des catégories localement
        setCategoryMeal((prev) => [...prev, newCategory]);
    };

    // Appel API pour mettre à jour une catégorie
    const updateCategoryMeal = async (id: string, newName: string) => {
        try {
            const response = await fetch('/api/categories-meal', {
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
            const updatedCategory: CategoryMealType = await response.json();
            setCategoryMeal((prev) => // Remplacer l'ancienne catégorie par la nouvelle
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
    const deleteCategoryMeal = async (id: string) => {
        try {
            const response = await fetch('/api/categories-meal', {
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
            setCategoryMeal((prev) => prev.filter((category) => category.id !== id));
        } catch (error) {
            console.error('Erreur lors de la suppression:', error);
            setError('Erreur lors de la suppression.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!categoryMeal) return <div>Catégorie de repas introuvables.</div>;

    return (
        <div>
            {/* Composant de création */}
            <CategoryForm onAddCategory={createCategoryMeal} />
            <h1>Liste des catégories de repas</h1>
            {/* Afficher les catégories existantes */}
            <div className="mt-6">
                {categoryMeal.map((category) => (
                    <CategoryCard<CategoryMealType> 
                        key={category.id} 
                        category={category}
                        onUpdateCategory={updateCategoryMeal}
                        onDeleteCategory={deleteCategoryMeal}
                    />
                ))}
            </div>
        </div>
    );
};

export default CategoryMealPage;