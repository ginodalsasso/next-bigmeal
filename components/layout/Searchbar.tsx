import React, { useState } from "react";

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // set la requête de recherche
        setQuery(value);
        // Appel de la fonction de recherche
        onSearch(value); 
    };

    return (
        <>
            <input
                type="text"
                value={query}
                onChange={handleSearchChange}
                placeholder="Rechercher..."
                className="input-search"
            />
        </>
    );
};

export default SearchBar;
