'use client' 

import React, { useEffect, useState } from "react";

import { CategoryMealType } from "@/lib/types/schemas_interfaces";


const CategoryMealPage = () => {
    const [categoryMeal, setCategoryMeal] = useState<CategoryMealType[]>([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Récupérer les catégories d'ingrédients 
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!categoryMeal) return <div>Catégorie de repas introuvables.</div>;
    
    return <>
        {categoryMeal.map(category => (
            <div key={category.id}>
                <h2>{category.name}</h2>
            </div>
        ))}
    </>;
};

export default CategoryMealPage;