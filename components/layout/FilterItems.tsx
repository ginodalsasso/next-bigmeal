import { Filter } from "lucide-react";
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
        <>
            <div className="mb-2 mt-4 flex items-center gap-2">
                <Filter size={18} />
                <h2 className="text-lg font-semibold">Filtres</h2>
            </div>
            <div className="relative w-full">
                <div className="scrollbar-hide mb-4 flex w-full flex-nowrap space-x-2 overflow-x-auto">
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
                                className="hidden"
                                value={option}
                                checked={selectedFilters.includes(option)}
                                onChange={handleFilterChange}
                            />
                            {option}
                        </label>
                    ))}
                </div>
                <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-black to-transparent" />
            </div>
        </>


    );
};

export default FilterCheckboxes;
