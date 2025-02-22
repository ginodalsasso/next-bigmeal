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
        <div className="flex flex-wrap pb-2">
            {options.map((option, index) => (
                <label
                    key={index}
                    className={`cursor-pointer hover:bg-white hover:text-black border px-4 py-2 ${selectedFilters.includes(option) ? 'bg-white text-black' : ''}`}
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


    );
};

export default FilterCheckboxes;
