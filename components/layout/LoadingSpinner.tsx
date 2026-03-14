import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/70 backdrop-blur-sm">
            <div role="status" aria-label="Chargement en cours" className="flex flex-col items-center gap-3">
                <div className="size-10 animate-spin rounded-full border-4 border-neutral-700 border-t-orange-400" aria-hidden="true"></div>
                <p className="text-sm text-neutral-400">Chargement...</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;