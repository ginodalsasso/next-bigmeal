"use client";

import { ucFirst } from "@/lib/utils";
import React, { useState, useTransition } from "react";
import { X } from "lucide-react";

export interface FilterGroup {
    label: string;
    options: string[];
}

interface FilterItemsProps {
    groups: FilterGroup[];
    initialFilters?: string[];
    onFilterChange: (filters: string[]) => void;
}

const FilterItems: React.FC<FilterItemsProps> = ({ groups, initialFilters = [], onFilterChange }) => {
    const [selectedFilters, setSelectedFilters] = useState<string[]>(initialFilters);
    const [isPending, startTransition] = useTransition(); // Permet de différer l'exécution de la fonction onFilterChange pour éviter les blocages d'interface lors de mises à jour lourdes

    const allOptions = groups.flatMap((g) => g.options); // Aplatit toutes les options pour vérifier si on a des filtres à afficher
    const showLabels = groups.length > 1;

    const toggleFilter = (value: string) => {
        const next = selectedFilters.includes(value)
            ? selectedFilters.filter((f) => f !== value)
            : [...selectedFilters, value];
        setSelectedFilters(next);
        startTransition(() => onFilterChange(next));
    };

    const resetFilters = () => {
        setSelectedFilters([]);
        startTransition(() => onFilterChange([]));
    };

    if (allOptions.length === 0) return null;

    return (
        <div
            role="group"
            aria-label="Filtres"
            aria-busy={isPending}
            className={`my-3 flex flex-col gap-2 transition-opacity duration-150 ${isPending ? "opacity-50" : "opacity-100"}`}
        >
            {groups.map((group) => (
                <div key={group.label} className="flex items-center gap-2">
                    {showLabels && (
                        <span className="w-16 shrink-0 text-xs font-medium text-warm-secondary">
                            {group.label}
                        </span>
                    )}
                    <div className="scrollbar-hide flex flex-nowrap gap-2 overflow-x-auto pb-1">
                        {group.options.map((option) => {
                            const isSelected = selectedFilters.includes(option);
                            return (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => toggleFilter(option)}
                                    aria-pressed={isSelected}
                                    disabled={isPending}
                                    className={`label-filter ${isSelected ? "sticker-bg-white" : "sticker-bg-black"}`}
                                >
                                    {ucFirst(option)}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}

            {selectedFilters.length > 0 && (
                <button
                    type="button"
                    onClick={resetFilters}
                    disabled={isPending}
                    className="flex w-fit items-center gap-1 rounded-full border border-warm-danger/30 bg-warm-danger/10 px-3 py-1 text-xs font-medium text-warm-danger transition-colors hover:bg-warm-danger/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-danger"
                    aria-label="Effacer tous les filtres"
                >
                    <X size={11} aria-hidden="true" />
                    Effacer les filtres
                </button>
            )}
        </div>
    );
};

export default FilterItems;
