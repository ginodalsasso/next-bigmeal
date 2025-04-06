import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="flex h-screen flex-col items-center justify-center">
            <div className="mb-4 size-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"></div>
            <p className="text-lg">Chargement...</p>
        </div>
    );
};

export default LoadingSpinner;