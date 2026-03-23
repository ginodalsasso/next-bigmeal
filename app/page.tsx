"use client";

import InstallPrompt from "@/components/pwa/InstallPrompt";
import IsNotAuthenticated from "@/components/auth/isNotAuthenticated";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, UtensilsCrossed, Leaf, ListChecks, ChevronRight } from "lucide-react";

const features = [
    {
        icon: UtensilsCrossed,
        title: "Recettes organisées",
        description: "Créez et consultez vos recettes avec compositions, étapes de préparation et temps de cuisson.",
    },
    {
        icon: ShoppingCart,
        title: "Liste de courses",
        description: "Générez automatiquement votre liste de courses à partir de vos repas planifiés.",
    },
    {
        icon: Leaf,
        title: "Ingrédients de saison",
        description: "Filtrez les ingrédients par saison pour cuisiner frais et local toute l'année.",
    },
    {
        icon: ListChecks,
        title: "Tout au même endroit",
        description: "Repas, ingrédients, produits ménagers — une seule app pour gérer votre quotidien.",
    },
];

const steps = [
    {
        number: "01",
        title: "Créez votre compte",
        description: "Inscrivez-vous en quelques secondes et accédez à toutes les fonctionnalités.",
    },
    {
        number: "02",
        title: "Ajoutez vos recettes",
        description: "Renseignez vos repas favoris avec leurs ingrédients et instructions.",
    },
    {
        number: "03",
        title: "Faites vos courses",
        description: "Cochez les articles au fur et à mesure — Big-Meal suit votre progression.",
    },
];

export default function HomePage() {
    return (
        <div className="min-h-dvh bg-warm-base">

            {/* ── Hero ──────────────────────────────────────────── */}
            <section className="flex min-h-dvh flex-col items-center justify-center px-4 py-20 text-center">
                <div className="mx-auto max-w-2xl space-y-8">

                    {/* Titre */}
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold tracking-tight text-warm-primary sm:text-5xl lg:text-6xl">
                            Planifiez vos repas,{" "}
                            <span className="text-warm-accent">simplifiez</span>{" "}
                            vos courses
                        </h1>
                        <p className="mx-auto max-w-lg text-base text-warm-secondary sm:text-lg">
                            Big-Meal centralise vos recettes, génère vos listes de courses et vous aide à cuisiner mieux au quotidien.
                        </p>
                    </div>

                    {/* CTA */}
                    <IsNotAuthenticated>
                        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                            <Button asChild size="lg" className="w-full sm:w-auto">
                                <Link href="/register">
                                    Commencer gratuitement
                                    <ChevronRight size={16} aria-hidden="true" />
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                                <Link href="/login">Se connecter</Link>
                            </Button>
                        </div>
                    </IsNotAuthenticated>

                    {/* Stats */}
                    <div className="flex flex-wrap justify-center gap-8 pt-4">
                        {[
                            { value: "80+", label: "Ingrédients" },
                            { value: "13", label: "Recettes incluses" },
                            { value: "100%", label: "Gratuit" },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <p className="text-2xl font-bold text-warm-accent">{stat.value}</p>
                                <p className="text-xs text-warm-secondary">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Features ──────────────────────────────────────── */}
            <section className="rounded-3xl bg-warm-subtle px-4 py-16">
                <div className="mx-auto max-w-4xl space-y-10">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-warm-primary sm:text-3xl">
                            Tout ce dont vous avez besoin
                        </h2>
                        <p className="mt-2 text-sm text-warm-secondary">
                            Conçu pour rendre la cuisine et les courses plus simples.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {features.map(({ icon: Icon, title, description }) => (
                            <div
                                key={title}
                                className="flex gap-4 rounded-xl border border-warm-border bg-warm-base p-5"
                            >
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-warm-accent/15">
                                    <Icon size={18} className="text-warm-accent" aria-hidden="true" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-sm font-semibold text-warm-primary">{title}</h3>
                                    <p className="text-sm text-warm-secondary">{description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── How it works ──────────────────────────────────── */}
            <section className="px-4 py-16">
                <div className="mx-auto max-w-3xl space-y-10">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-warm-primary sm:text-3xl">
                            En trois étapes
                        </h2>
                        <p className="mt-2 text-sm text-warm-secondary">
                            Démarrez en quelques minutes.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {steps.map((step, i) => (
                            <div
                                key={step.number}
                                className="flex gap-5 rounded-xl border border-warm-border bg-warm-subtle p-5"
                            >
                                <span className="mt-0.5 text-3xl font-black tabular-nums leading-none text-warm-accent/30">
                                    {step.number}
                                </span>
                                <div className="space-y-1">
                                    <h3 className="text-sm font-semibold text-warm-primary">{step.title}</h3>
                                    <p className="text-sm text-warm-secondary">{step.description}</p>
                                </div>
                                {i < steps.length - 1 && (
                                    <div className="ml-auto self-center text-warm-border">
                                        <ChevronRight size={16} aria-hidden="true" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Bottom CTA ────────────────────────────────────── */}
            <IsNotAuthenticated>
                <section className="px-4 pb-24 pt-4">
                    <div className="mx-auto max-w-md">
                        <div className="space-y-4 rounded-xl border border-warm-border bg-warm-subtle p-8 text-center">
                            <h2 className="text-xl font-bold text-warm-primary">
                                Prêt à mieux cuisiner ?
                            </h2>
                            <p className="text-sm text-warm-secondary">
                                Rejoignez Big-Meal et commencez à planifier dès aujourd&apos;hui.
                            </p>
                            <Button asChild className="w-full" size="lg">
                                <Link href="/register">Créer un compte</Link>
                            </Button>
                            <p className="text-xs text-warm-secondary">
                                Déjà membre ?{" "}
                                <Link href="/login" className="font-medium text-warm-accent hover:underline">
                                    Se connecter
                                </Link>
                            </p>
                        </div>
                    </div>
                </section>
            </IsNotAuthenticated>

            <InstallPrompt />
        </div>
    );
}
