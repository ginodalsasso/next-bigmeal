'use client';

import React, { useEffect, useState } from "react";
import { CategoryIngredientType } from "@/lib/types/schemas_interfaces";
import CategoryForm from "./_components/CategoryForm";

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
            <h1>Liste des Catégories d&apos;Ingrédients</h1>

            {/* Composant de création */}
            <CategoryForm onAddCategory={addCategoryIngredient} />

            {/* Afficher les catégories existantes */}
            <div className="mt-6">
                {categoryIngredient.map((category) => (
                    <div key={category.id} className="border-b p-2">
                        <h2>{category.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryIngredientPage;
