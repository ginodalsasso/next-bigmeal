import { useEffect, useRef, useState } from "react";
import Fuse from "fuse.js";

interface SearchSuggestion {
    id: string;
    name: string;
}

interface FuseSearchItem extends SearchSuggestion {
    type: "meal" | "ingredient" | "product";
}

export function useFuseSearch() {
    const fuseRef = useRef<Fuse<FuseSearchItem> | null>(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        fetch("/api/search")
            .then((r) => r.json())
            .then((data) => {
                const items: FuseSearchItem[] = [
                    ...(data.meals ?? []).map((m: SearchSuggestion) => ({ ...m, type: "meal" as const })),
                    ...(data.ingredients ?? []).map((i: SearchSuggestion) => ({ ...i, type: "ingredient" as const })),
                    ...(data.householdProducts ?? []).map((p: SearchSuggestion) => ({ ...p, type: "product" as const })),
                ];

                fuseRef.current = new Fuse(items, {
                    keys: ["name"],
                    threshold: 0.35,
                    includeScore: true,
                    minMatchCharLength: 2,
                });

                setReady(true);
            })
            .catch((err) => console.error("[FUSE_SEARCH] Erreur de chargement de l'index", err));
    }, []);

    const search = (query: string): FuseSearchItem[] => {
        if (!fuseRef.current || !query || query.length < 2) return [];
        return fuseRef.current.search(query, { limit: 10 }).map((r) => r.item);
    };

    return { search, ready };
}
