'use client' 

import React, { useEffect, useState } from "react";

import { CategoryMealType } from "@/lib/types/schemas_interfaces";
import CategoryForm from "../_components/CategoryForm";


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
                const data: CategoryMealType[] = await response.json(); // Récupérer les données en json
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

    // Fonction pour ajouter une catégorie
    const addCategoryMeal = async (name: string) => {
        const response = await fetch('/api/categories-meal/crud', {
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!categoryMeal) return <div>Catégorie de repas introuvables.</div>;

    return (
        <div>
            {/* Composant de création */}
            <CategoryForm onAddCategory={addCategoryMeal} />

            <h1>Liste des catégories de repas</h1>
            {/* Afficher les catégories existantes */}
            <div className="mt-6">
                {categoryMeal.map((category) => (
                    <div key={category.id} className="border-b p-2">
                        <h2>{category.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryMealPage;