import { ucFirst } from "@/lib/utils";
import React, { useState } from "react";

interface FilterCheckboxesProps {
    options: string[]; // Liste dynamique de filtres
    onFilterChange: (filters: string[]) => void;
}

const FilterCheckboxes: React.FC<FilterCheckboxesProps> = ({ options, onFilterChange }) => {
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        const updatedFilters = checked
            // Ajouter le filtre à la liste
            ? [...selectedFilters, value]
            // Retirer le filtre de la liste
            : selectedFilters.filter((filter) => filter !== value);
        
        setSelectedFilters(updatedFilters); // Mettre à jour la liste des filtres sélectionnés
        onFilterChange(updatedFilters); // Appeler la fonction de callback avec les filtres sélectionnés
    };

    return (
        <div className="relative my-3 w-full" role="group" aria-label="Filtres">
            <div className="scrollbar-hide flex w-full flex-nowrap gap-2 overflow-x-auto pb-1 pr-8">
                {options.map((option, index) => (
                    <label
                        key={index}
                        className={`label-filter ${
                            selectedFilters.includes(option)
                                ? "sticker-bg-white"
                                : "sticker-bg-black"
                        }`}
                    >
                        <input
                            type="checkbox"
                            className="sr-only"
                            value={option}
                            checked={selectedFilters.includes(option)}
                            onChange={handleFilterChange}
                            aria-label={ucFirst(option)}
                        />
                        {ucFirst(option)}
                    </label>
                ))}
            </div>
            <div className="pointer-events-none absolute right-0 top-0 h-full w-8" />
        </div>
    );
};

export default FilterCheckboxes;
