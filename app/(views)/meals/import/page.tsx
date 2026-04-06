"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCsrfToken } from "next-auth/react";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import {
    importRecipeFromImageAPI,
    importRecipeFromUrlAPI,
    importRecipeFromTextAPI,
} from "@/lib/services/meal_import_service";

type Mode = "image" | "url" | "text";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const TABS: { id: Mode; label: string }[] = [
    { id: "image", label: "Image" },
    { id: "url", label: "URL" },
    { id: "text", label: "Texte" },
];

const ImportRecipePage = () => {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [mode, setMode] = useState<Mode>("image");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [urlInput, setUrlInput] = useState("");
    const [textInput, setTextInput] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setError(null);

        if (!file) {
            setSelectedFile(null);
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            setError("L'image ne doit pas dépasser 5MB");
            setSelectedFile(null);
            return;
        }

        setSelectedFile(file);
    };

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        const csrfToken = await getCsrfToken();
        if (!csrfToken) {
            setError("Session invalide, veuillez recharger la page");
            return;
        }

        try {
            setLoading(true);
            switch (mode) {
                case "image":
                    if (!selectedFile) {
                        setError("Veuillez sélectionner une image");
                        return;
                    }
                    await importRecipeFromImageAPI(selectedFile, csrfToken);
                    break;
                case "url":
                    if (!urlInput.trim()) {
                        setError("Veuillez entrer une URL");
                        return;
                    }
                    try {
                        new URL(urlInput.trim());
                    } catch {
                        setError("URL invalide");
                        return;
                    }
                    await importRecipeFromUrlAPI(urlInput.trim(), csrfToken);
                    break;
                case "text":
                    if (textInput.trim().length < 100) {
                        setError("Le texte est trop court, collez le contenu complet de la page");
                        return;
                    }
                    await importRecipeFromTextAPI(textInput.trim(), csrfToken);
                    break;
                default:
                    setError("Mode d'importation inconnu");
                    return;
            }

            router.push("/meals");
        } catch (err) {
            const message = err instanceof Error ? err.message : "Erreur lors de l'import";
            setError(message);
            // Si le site bloque l'accès automatique, suggérer le mode texte
            if (message.includes("403") || message.includes("bloque")) {
                setMode("text");
            }
        } finally {
            setLoading(false);
        }
    };

    // State pour suivre l'étape actuelle du processus de création
    const switchMode = (newMode: Mode) => {
        setMode(newMode);
        setError(null);
        setSelectedFile(null);
        setUrlInput("");
        setTextInput("");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className="mx-auto max-w-2xl">
            {loading && <LoadingSpinner />}

            <h1 className="text-center text-2xl font-bold">Importer une recette</h1>
            <p className="mt-2 text-center text-sm text-neutral-500">
                L&apos;IA analyse le contenu et crée la recette automatiquement.
            </p>

            {/* Mode tabs */}
            <div className="mt-6 flex rounded-lg border border-neutral-200 bg-neutral-50 p-1">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => switchMode(tab.id)}
                        className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
                            mode === tab.id
                                ? "bg-white text-neutral-900 shadow"
                                : "text-neutral-500 hover:text-neutral-700"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {mode === "image" && (
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-neutral-700">
                            Photo ou screenshot de la recette
                        </label>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/gif,image/webp"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-neutral-500 file:mr-4 file:rounded-md file:border-0 file:bg-neutral-100 file:px-4 file:py-2 file:text-sm file:font-medium file:text-neutral-700 hover:file:bg-neutral-200"
                        />
                    </div>
                )}

                {mode === "url" && (
                    <div className="space-y-2">
                        <label htmlFor="recipe-url" className="block text-sm font-medium text-neutral-700">
                            URL de la page recette
                        </label>
                        <input
                            id="recipe-url"
                            type="url"
                            value={urlInput}
                            onChange={(e) => {
                                setUrlInput(e.target.value);
                                setError(null);
                            }}
                            placeholder="https://www.exemple.com/recette-poulet-roti"
                            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm placeholder:text-neutral-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <p className="text-xs text-neutral-400">
                            Certains sites bloquent l&apos;accès automatique. Si ça échoue, utilisez l&apos;onglet <strong>Texte</strong>.
                        </p>
                    </div>
                )}

                {mode === "text" && (
                    <div className="space-y-3">
                        {/* Mobile instructions */}
                        <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 md:hidden">
                            <p className="font-medium">Sur mobile, privilégiez l&apos;onglet Image</p>
                            <p className="mt-1 text-amber-700">
                                Faites un screenshot de la recette depuis votre navigateur, puis importez-le via l&apos;onglet <strong>Image</strong> — c&apos;est la méthode la plus simple.
                            </p>
                            <p className="mt-2 font-medium">Ou copiez le texte manuellement :</p>
                            <ol className="mt-1 list-inside list-decimal space-y-1 text-amber-700">
                                <li>Ouvrez la recette dans votre navigateur</li>
                                <li>Appuyez longuement sur le texte → <strong>Tout sélectionner</strong></li>
                                <li>Copiez, revenez ici et collez</li>
                            </ol>
                        </div>

                        {/* Desktop instructions */}
                        <div className="hidden rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 md:block">
                            <p className="font-medium">Comment copier le contenu d&apos;une page :</p>
                            <ol className="mt-1 list-inside list-decimal space-y-1 text-amber-700">
                                <li>Ouvrez la recette dans votre navigateur</li>
                                <li>
                                    Faites <kbd className="rounded bg-amber-100 px-1 font-mono text-xs">Ctrl+A</kbd> puis{" "}
                                    <kbd className="rounded bg-amber-100 px-1 font-mono text-xs">Ctrl+C</kbd>
                                </li>
                                <li>Collez ici avec <kbd className="rounded bg-amber-100 px-1 font-mono text-xs">Ctrl+V</kbd></li>
                            </ol>
                            <p className="mt-2 text-amber-600">
                                Ou via la console (F12) :{" "}
                                <code className="rounded bg-amber-100 px-1 font-mono text-xs">
                                    copy(document.body.innerText)
                                </code>{" "}
                                puis collez ici.
                            </p>
                        </div>
                        <label htmlFor="recipe-text" className="block text-sm font-medium text-neutral-700">
                            Contenu de la recette
                        </label>
                        <textarea
                            id="recipe-text"
                            value={textInput}
                            onChange={(e) => {
                                setTextInput(e.target.value);
                                setError(null);
                            }}
                            placeholder="Collez ici le texte de la page contenant la recette..."
                            rows={12}
                            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm placeholder:text-neutral-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <p className="text-right text-xs text-neutral-400">
                            {textInput.length} caractères
                        </p>
                    </div>
                )}

                {error && (
                    <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                        {error}
                    </p>
                )}

                <div className="flex gap-3 pt-2">
                    <Button type="submit" disabled={loading} className="flex-1">
                        {loading ? "Analyse en cours..." : "Importer la recette"}
                    </Button>
                    <Button type="button" variant="cancel" asChild>
                        <Link href="/meals/create">Annuler</Link>
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ImportRecipePage;
