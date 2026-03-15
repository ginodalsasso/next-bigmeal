'use client';

export default function OfflinePage() {
    return (
        <section className="flex min-h-dvh flex-col items-center justify-center bg-white px-4 py-12 antialiased dark:bg-zinc-950">
            <div className="w-full max-w-sm space-y-6 text-center">
                
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900">
                    <svg className="size-6 text-zinc-600 dark:text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
                    </svg>
                </div>
                
                <div className="space-y-2">
                    <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Connexion perdue
                    </h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Vérifiez votre connexion Internet pour continuer.
                    </p>
                </div>

                <button
                    onClick={() => window.location.reload()}
                    aria-label="Recharger la page"
                    className="mt-6 flex h-11 w-full items-center justify-center rounded-md bg-zinc-900 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                    Réessayer
                </button>
            </div>
        </section>
    );
}
