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
                const data: CategoryIngredientType[] = await response.json(); // Récupérer les données en json
                setCategoryIngredient(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des catégories d\'ingredient:', error);
                setError('Erreur lors de la récupération des catégories d\'ingredient');
            } finally {
                setLoading(false);
            }
        };
        fetchCategoryIngredient();
    }, []); 

    // Fonction pour ajouter une catégorie
    const addCategoryIngredient = async (name: string) => {
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

        // Mettre à jour la liste des catégories localement
        setCategoryIngredient((prev) => [...prev, newCategory]);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!categoryIngredient) return <div>Catégories d&apos;ingrédient introuvables.</div>;
    
    return (
        <div>
            {/* Composant de création */}
            <CategoryForm onAddCategory={addCategoryIngredient} />

            <h1>Liste des catégories d&apos;ingrédients</h1>
            {/* Afficher les catégories existantes */}
            <div className="mt-6">
                {categoryIngredient.map((category) => (
                    <CategoryCard<CategoryIngredientType> key={category.id} category={category} />
                ))}
            </div>
        </div>
    );
};

export default CategoryIngredientPage;
