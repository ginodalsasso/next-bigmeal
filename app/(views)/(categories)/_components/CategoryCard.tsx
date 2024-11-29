import React from "react";

interface CategoryType {
    id: string;
    name: string;
}

// T represente le type de la catégorie
interface CategoryCardProps<T extends CategoryType> {
    category: T;
}

const CategoryCard = <T extends CategoryType>({ category }: CategoryCardProps<T>) => {
    return (
        <div
            key={category.id}
            className="border border-gray-500 p-6 rounded-xl"
        >
            <h2 className="text-xl font-bold">{category.name}</h2>
        </div>
    );
};

export default CategoryCard;
