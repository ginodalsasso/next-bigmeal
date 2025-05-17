import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
                <div className="mb-4 size-10 animate-spin rounded-full border-4 border-white border-t-blue-500"></div>
                <p className="text-lg">Chargement...</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;