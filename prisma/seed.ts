import { PrismaClient, Unit, Season } from "@prisma/client";

/**
 * Script de seed pour la base de données. Il insère des données initiales pour les catégories d'ingrédients, les ingrédients, les catégories de repas, les repas et les produits ménagers.
 * maj du seed: npx tsx prisma/seed.ts
 * note: ce script est idempotent grâce à l'utilisation de `upsert`, il peut être exécuté plusieurs fois sans créer de doublons.
 */

const db = new PrismaClient();

// ─── HELPERS ─────────────────────────────────────────────────────────────────

async function upsertCategoryIngredient(name: string) {
    return db.categoryIngredient.upsert({
        where: { name },
        update: {},
        create: { name },
    });
}

async function upsertCategoryMeal(name: string) {
    return db.categoryMeal.upsert({
        where: { name },
        update: {},
        create: { name },
    });
}

async function upsertCategoryHousehold(name: string) {
    return db.categoryHousehold.upsert({
        where: { name },
        update: {},
        create: { name },
    });
}

// ─── CATEGORIES INGRÉDIENTS ──────────────────────────────────────────────────

async function seedCategoriesIngredients() {
    console.log("Seeding catégories ingrédients…");

    const categories = [
        "Légumes",
        "Fruits",
        "Viandes & Poissons",
        "Produits laitiers & Œufs",
        "Féculents & Céréales",
        "Épices & Condiments",
        "Herbes aromatiques",
        "Huiles & Graisses",
        "Légumineuses",
    ];

    const result: Record<string, string> = {};
    for (const name of categories) {
        const cat = await upsertCategoryIngredient(name);
        result[name] = cat.id;
    }
    return result;
}

// ─── INGRÉDIENTS ─────────────────────────────────────────────────────────────

async function seedIngredients(catIds: Record<string, string>) {
    console.log("Seeding ingrédients…");

    const ingredients: Array<{ name: string; season?: Season; category: string }> = [
        // Légumes
        { name: "Tomate", season: Season.SUMMER, category: "Légumes" },
        { name: "Oignon", category: "Légumes" },
        { name: "Ail", category: "Légumes" },
        { name: "Courgette", season: Season.SUMMER, category: "Légumes" },
        { name: "Aubergine", season: Season.SUMMER, category: "Légumes" },
        { name: "Carotte", season: Season.FALL, category: "Légumes" },
        { name: "Poivron rouge", season: Season.SUMMER, category: "Légumes" },
        { name: "Poivron vert", season: Season.SUMMER, category: "Légumes" },
        { name: "Épinards", season: Season.SPRING, category: "Légumes" },
        { name: "Pomme de terre", season: Season.FALL, category: "Légumes" },
        { name: "Champignon de Paris", category: "Légumes" },
        { name: "Poireau", season: Season.WINTER, category: "Légumes" },
        { name: "Brocoli", season: Season.FALL, category: "Légumes" },
        { name: "Concombre", season: Season.SUMMER, category: "Légumes" },
        { name: "Céleri", season: Season.FALL, category: "Légumes" },
        { name: "Salade verte", season: Season.SPRING, category: "Légumes" },
        { name: "Haricots verts", season: Season.SUMMER, category: "Légumes" },
        { name: "Petits pois", season: Season.SPRING, category: "Légumes" },

        // Fruits
        { name: "Citron", category: "Fruits" },
        { name: "Pomme", season: Season.FALL, category: "Fruits" },
        { name: "Banane", category: "Fruits" },
        { name: "Fraise", season: Season.SPRING, category: "Fruits" },
        { name: "Framboise", season: Season.SUMMER, category: "Fruits" },
        { name: "Mangue", category: "Fruits" },
        { name: "Orange", season: Season.WINTER, category: "Fruits" },
        { name: "Poire", season: Season.FALL, category: "Fruits" },
        { name: "Pêche", season: Season.SUMMER, category: "Fruits" },
        { name: "Cerise", season: Season.SUMMER, category: "Fruits" },
        { name: "Raisin", season: Season.FALL, category: "Fruits" },
        { name: "Abricot", season: Season.SUMMER, category: "Fruits" },
        { name: "Ananas", category: "Fruits" },

        // Viandes & Poissons
        { name: "Filet de poulet", category: "Viandes & Poissons" },
        { name: "Cuisses de poulet", category: "Viandes & Poissons" },
        { name: "Bœuf haché", category: "Viandes & Poissons" },
        { name: "Steak de bœuf", category: "Viandes & Poissons" },
        { name: "Saumon", category: "Viandes & Poissons" },
        { name: "Thon en boîte", category: "Viandes & Poissons" },
        { name: "Crevettes", category: "Viandes & Poissons" },
        { name: "Lardons", category: "Viandes & Poissons" },
        { name: "Jambon blanc", category: "Viandes & Poissons" },
        { name: "Escalope de veau", category: "Viandes & Poissons" },
        { name: "Filet de cabillaud", category: "Viandes & Poissons" },
        { name: "Merguez", category: "Viandes & Poissons" },
        { name: "Côte de porc", category: "Viandes & Poissons" },

        // Produits laitiers & Œufs
        { name: "Lait entier", category: "Produits laitiers & Œufs" },
        { name: "Beurre", category: "Produits laitiers & Œufs" },
        { name: "Crème fraîche épaisse", category: "Produits laitiers & Œufs" },
        { name: "Crème liquide", category: "Produits laitiers & Œufs" },
        { name: "Emmental râpé", category: "Produits laitiers & Œufs" },
        { name: "Feta", category: "Produits laitiers & Œufs" },
        { name: "Parmesan", category: "Produits laitiers & Œufs" },
        { name: "Mozzarella", category: "Produits laitiers & Œufs" },
        { name: "Yaourt nature", category: "Produits laitiers & Œufs" },
        { name: "Œuf", category: "Produits laitiers & Œufs" },
        { name: "Fromage de chèvre", category: "Produits laitiers & Œufs" },
        { name: "Ricotta", category: "Produits laitiers & Œufs" },

        // Féculents & Céréales
        { name: "Farine de blé", category: "Féculents & Céréales" },
        { name: "Spaghetti", category: "Féculents & Céréales" },
        { name: "Penne", category: "Féculents & Céréales" },
        { name: "Riz basmati", category: "Féculents & Céréales" },
        { name: "Riz rond", category: "Féculents & Céréales" },
        { name: "Pain de mie", category: "Féculents & Céréales" },
        { name: "Quinoa", category: "Féculents & Céréales" },
        { name: "Couscous", category: "Féculents & Céréales" },
        { name: "Chapelure", category: "Féculents & Céréales" },
        { name: "Pain rassis", category: "Féculents & Céréales" },
        { name: "Biscuits secs", category: "Féculents & Céréales" },

        // Épices & Condiments
        { name: "Sel fin", category: "Épices & Condiments" },
        { name: "Poivre noir", category: "Épices & Condiments" },
        { name: "Cumin en poudre", category: "Épices & Condiments" },
        { name: "Paprika doux", category: "Épices & Condiments" },
        { name: "Curry en poudre", category: "Épices & Condiments" },
        { name: "Curcuma", category: "Épices & Condiments" },
        { name: "Cannelle", category: "Épices & Condiments" },
        { name: "Herbes de Provence", category: "Épices & Condiments" },
        { name: "Sauce soja", category: "Épices & Condiments" },
        { name: "Moutarde de Dijon", category: "Épices & Condiments" },
        { name: "Miel", category: "Épices & Condiments" },
        { name: "Vinaigre balsamique", category: "Épices & Condiments" },
        { name: "Concentré de tomate", category: "Épices & Condiments" },
        { name: "Sucre en poudre", category: "Épices & Condiments" },
        { name: "Levure chimique", category: "Épices & Condiments" },

        // Herbes aromatiques
        { name: "Basilic frais", season: Season.SUMMER, category: "Herbes aromatiques" },
        { name: "Thym", category: "Herbes aromatiques" },
        { name: "Laurier", category: "Herbes aromatiques" },
        { name: "Coriandre fraîche", category: "Herbes aromatiques" },
        { name: "Menthe fraîche", season: Season.SUMMER, category: "Herbes aromatiques" },
        { name: "Persil plat", category: "Herbes aromatiques" },
        { name: "Ciboulette", category: "Herbes aromatiques" },
        { name: "Estragon", category: "Herbes aromatiques" },
        { name: "Romarin", category: "Herbes aromatiques" },

        // Huiles & Graisses
        { name: "Huile d'olive", category: "Huiles & Graisses" },
        { name: "Huile de tournesol", category: "Huiles & Graisses" },
        { name: "Huile de sésame", category: "Huiles & Graisses" },

        // Légumineuses
        { name: "Lentilles vertes", season: Season.FALL, category: "Légumineuses" },
        { name: "Pois chiches", category: "Légumineuses" },
        { name: "Haricots rouges", category: "Légumineuses" },
        { name: "Flageolets", category: "Légumineuses" },
    ];

    const result: Record<string, string> = {};
    for (const ing of ingredients) {
        const item = await db.ingredient.upsert({
            where: { name: ing.name },
            update: {},
            create: {
                name: ing.name,
                season: ing.season ?? null,
                categoryIngredientId: catIds[ing.category],
            },
        });
        result[ing.name] = item.id;
    }
    return result;
}

// ─── CATÉGORIES & PRODUITS MÉNAGERS ──────────────────────────────────────────

async function seedHouseholdProducts() {
    console.log("Seeding produits ménagers…");

    const categoriesWithProducts: Record<string, string[]> = {
        "Entretien & Nettoyage": [
            "Liquide vaisselle",
            "Tablettes lave-vaisselle",
            "Éponges multi-usages",
            "Torchons",
            "Serpillère",
            "Désinfectant multi-surfaces",
            "Détartrant WC",
            "Nettoyant salle de bain",
            "Produit vitres",
            "Gants de ménage",
        ],
        "Lessive & Textile": [
            "Lessive liquide",
            "Lessive en poudre",
            "Adoucissant",
            "Détachant",
            "Filets à linge",
            "Lingettes anti-calcaire sèche-linge",
        ],
        "Hygiène & Beauté": [
            "Shampooing",
            "Après-shampooing",
            "Gel douche",
            "Savon liquide",
            "Dentifrice",
            "Brosse à dents",
            "Déodorant",
            "Cotons-tiges",
            "Cotons démaquillants",
            "Rasoir",
            "Crème hydratante",
        ],
        "Cuisine & Conservation": [
            "Film alimentaire",
            "Papier cuisson",
            "Papier aluminium",
            "Sacs congélation",
            "Boîtes hermétiques",
            "Essuie-tout",
            "Sacs poubelle",
        ],
        "Papeterie & Divers": [
            "Stylos bille",
            "Cahier",
            "Post-it",
            "Scotch",
            "Piles AA",
            "Ampoule LED",
        ],
        "Pharmacie & Premiers secours": [
            "Paracétamol",
            "Pansements assortis",
            "Désinfectant cutané",
            "Thermomètre",
            "Anti-moustiques",
        ],
    };

    for (const [catName, products] of Object.entries(categoriesWithProducts)) {
        const cat = await upsertCategoryHousehold(catName);
        for (const name of products) {
            await db.product.upsert({
                where: { name },
                update: {},
                create: { name, categoryHouseholdProductId: cat.id },
            });
        }
    }
}

// ─── CATÉGORIES & REPAS ───────────────────────────────────────────────────────

async function seedMeals(ingIds: Record<string, string>) {
    console.log("Seeding repas…");

    const mealCategories = ["Plat principal", "Entrée", "Dessert", "Petit-déjeuner", "Snack & Apéro", "Soupe & Velouté"];
    const catIds: Record<string, string> = {};
    for (const name of mealCategories) {
        const cat = await upsertCategoryMeal(name);
        catIds[name] = cat.id;
    }

    const meals = [
        // ── Plats principaux ──────────────────────────────────────────────────
        {
            name: "Poulet rôti aux herbes",
            description: "Un poulet rôti croustillant parfumé au thym et au romarin, accompagné de pommes de terre fondantes.",
            category: "Plat principal",
            prepTime: 15,
            cookTime: 70,
            compositions: [
                { name: "Cuisses de poulet", quantity: 4, unit: Unit.PIECE },
                { name: "Pomme de terre", quantity: 600, unit: Unit.GRAM },
                { name: "Ail", quantity: 4, unit: Unit.PIECE },
                { name: "Thym", quantity: 2, unit: Unit.TABLESPOON },
                { name: "Romarin", quantity: 1, unit: Unit.TABLESPOON },
                { name: "Huile d'olive", quantity: 3, unit: Unit.TABLESPOON },
                { name: "Sel fin", quantity: 1, unit: Unit.TEASPOON },
                { name: "Poivre noir", quantity: 1, unit: Unit.TEASPOON },
            ],
            steps: [
                "Préchauffer le four à 200°C. Éplucher et couper les pommes de terre en quartiers.",
                "Frotter les cuisses de poulet avec l'huile d'olive, l'ail écrasé, le thym, le romarin, le sel et le poivre.",
                "Disposer le poulet et les pommes de terre dans un plat allant au four.",
                "Enfourner 1h10 en retournant le poulet à mi-cuisson. Arroser régulièrement avec le jus de cuisson.",
                "Vérifier la cuisson : le jus doit être clair. Laisser reposer 5 min avant de servir.",
            ],
        },
        {
            name: "Spaghetti bolognaise",
            description: "Le classique italien : une sauce bolognaise mijotée longuement avec du bœuf haché et des tomates.",
            category: "Plat principal",
            prepTime: 10,
            cookTime: 40,
            compositions: [
                { name: "Spaghetti", quantity: 400, unit: Unit.GRAM },
                { name: "Bœuf haché", quantity: 400, unit: Unit.GRAM },
                { name: "Tomate", quantity: 400, unit: Unit.GRAM },
                { name: "Concentré de tomate", quantity: 2, unit: Unit.TABLESPOON },
                { name: "Oignon", quantity: 1, unit: Unit.PIECE },
                { name: "Ail", quantity: 2, unit: Unit.PIECE },
                { name: "Carotte", quantity: 1, unit: Unit.PIECE },
                { name: "Huile d'olive", quantity: 2, unit: Unit.TABLESPOON },
                { name: "Herbes de Provence", quantity: 1, unit: Unit.TEASPOON },
                { name: "Sel fin", quantity: 1, unit: Unit.TEASPOON },
                { name: "Parmesan", quantity: 50, unit: Unit.GRAM },
            ],
            steps: [
                "Émincer l'oignon, l'ail et la carotte. Les faire revenir dans l'huile d'olive à feu moyen.",
                "Ajouter le bœuf haché et faire dorer en émiettant la viande.",
                "Incorporer les tomates concassées, le concentré, les herbes, le sel et le poivre. Laisser mijoter 30 min à feu doux.",
                "Faire cuire les spaghetti al dente selon les instructions du paquet.",
                "Servir la bolognaise sur les pâtes, parsemée de parmesan râpé.",
            ],
        },
        {
            name: "Ratatouille provençale",
            description: "Un plat végétarien coloré du sud de la France, parfumé aux herbes de Provence.",
            category: "Plat principal",
            prepTime: 20,
            cookTime: 45,
            compositions: [
                { name: "Aubergine", quantity: 2, unit: Unit.PIECE },
                { name: "Courgette", quantity: 2, unit: Unit.PIECE },
                { name: "Poivron rouge", quantity: 1, unit: Unit.PIECE },
                { name: "Poivron vert", quantity: 1, unit: Unit.PIECE },
                { name: "Tomate", quantity: 3, unit: Unit.PIECE },
                { name: "Oignon", quantity: 1, unit: Unit.PIECE },
                { name: "Ail", quantity: 3, unit: Unit.PIECE },
                { name: "Huile d'olive", quantity: 4, unit: Unit.TABLESPOON },
                { name: "Herbes de Provence", quantity: 2, unit: Unit.TEASPOON },
                { name: "Basilic frais", quantity: 1, unit: Unit.BUNCH },
                { name: "Sel fin", quantity: 1, unit: Unit.TEASPOON },
            ],
            steps: [
                "Laver et couper tous les légumes en dés de taille similaire.",
                "Dans une grande poêle, faire revenir l'oignon et l'ail dans l'huile d'olive pendant 5 min.",
                "Ajouter les poivrons, cuire 5 min. Puis les aubergines et courgettes, cuire encore 10 min.",
                "Incorporer les tomates, les herbes de Provence, le sel. Couvrir et laisser mijoter 25 min.",
                "Ajuster l'assaisonnement et parsemer de basilic frais avant de servir.",
            ],
        },
        {
            name: "Saumon en papillote au citron",
            description: "Filets de saumon cuits à la vapeur dans leur papillote avec citron et herbes fraîches.",
            category: "Plat principal",
            prepTime: 10,
            cookTime: 20,
            compositions: [
                { name: "Saumon", quantity: 600, unit: Unit.GRAM },
                { name: "Citron", quantity: 2, unit: Unit.PIECE },
                { name: "Persil plat", quantity: 1, unit: Unit.BUNCH },
                { name: "Ail", quantity: 2, unit: Unit.PIECE },
                { name: "Huile d'olive", quantity: 2, unit: Unit.TABLESPOON },
                { name: "Sel fin", quantity: 1, unit: Unit.TEASPOON },
                { name: "Poivre noir", quantity: 1, unit: Unit.TEASPOON },
            ],
            steps: [
                "Préchauffer le four à 180°C. Préparer des feuilles de papier aluminium ou de cuisson.",
                "Poser un filet de saumon sur chaque feuille. Arroser d'huile d'olive.",
                "Déposer des rondelles de citron, de l'ail émincé et du persil sur chaque filet.",
                "Assaisonner sel et poivre, refermer hermétiquement les papillotes.",
                "Enfourner 18-20 min. Servir directement dans la papillote.",
            ],
        },
        {
            name: "Curry de poulet au lait de coco",
            description: "Un curry doux et parfumé avec du poulet fondant dans une sauce crémeuse au lait de coco.",
            category: "Plat principal",
            prepTime: 15,
            cookTime: 30,
            compositions: [
                { name: "Filet de poulet", quantity: 500, unit: Unit.GRAM },
                { name: "Oignon", quantity: 1, unit: Unit.PIECE },
                { name: "Ail", quantity: 2, unit: Unit.PIECE },
                { name: "Curry en poudre", quantity: 2, unit: Unit.TABLESPOON },
                { name: "Curcuma", quantity: 1, unit: Unit.TEASPOON },
                { name: "Concentré de tomate", quantity: 1, unit: Unit.TABLESPOON },
                { name: "Riz basmati", quantity: 300, unit: Unit.GRAM },
                { name: "Huile de tournesol", quantity: 2, unit: Unit.TABLESPOON },
                { name: "Sel fin", quantity: 1, unit: Unit.TEASPOON },
                { name: "Coriandre fraîche", quantity: 1, unit: Unit.BUNCH },
            ],
            steps: [
                "Couper le poulet en morceaux. Émincer l'oignon et l'ail.",
                "Faire revenir l'oignon dans l'huile jusqu'à dorure. Ajouter l'ail, le curry et le curcuma, mélanger 1 min.",
                "Ajouter le poulet et faire dorer sur toutes les faces.",
                "Incorporer le concentré de tomate et 20cl d'eau. Laisser mijoter 20 min à couvert.",
                "Cuire le riz basmati en parallèle. Servir le curry sur le riz, garni de coriandre fraîche.",
            ],
        },
        {
            name: "Omelette aux champignons et fines herbes",
            description: "Une omelette baveuse aux champignons sautés, parfumée à la ciboulette et au persil.",
            category: "Plat principal",
            prepTime: 10,
            cookTime: 10,
            compositions: [
                { name: "Œuf", quantity: 3, unit: Unit.PIECE },
                { name: "Champignon de Paris", quantity: 150, unit: Unit.GRAM },
                { name: "Beurre", quantity: 20, unit: Unit.GRAM },
                { name: "Ciboulette", quantity: 1, unit: Unit.TABLESPOON },
                { name: "Persil plat", quantity: 1, unit: Unit.TABLESPOON },
                { name: "Sel fin", quantity: 1, unit: Unit.PINCH },
                { name: "Poivre noir", quantity: 1, unit: Unit.PINCH },
                { name: "Crème fraîche épaisse", quantity: 1, unit: Unit.TABLESPOON },
            ],
            steps: [
                "Nettoyer et émincer les champignons. Les faire revenir dans la moitié du beurre jusqu'à évaporation de l'eau.",
                "Battre les œufs avec la crème, le sel, le poivre et les herbes.",
                "Dans une poêle antiadhésive, faire fondre le reste du beurre. Verser les œufs battus.",
                "Remuer doucement avec une spatule pour une omelette baveuse. Ajouter les champignons au centre.",
                "Plier l'omelette et servir aussitôt.",
            ],
        },
        {
            name: "Steak haché sauce champignons",
            description: "Des steaks hachés moelleux nappés d'une sauce crémeuse aux champignons.",
            category: "Plat principal",
            prepTime: 10,
            cookTime: 20,
            compositions: [
                { name: "Bœuf haché", quantity: 400, unit: Unit.GRAM },
                { name: "Champignon de Paris", quantity: 200, unit: Unit.GRAM },
                { name: "Crème fraîche épaisse", quantity: 150, unit: Unit.GRAM },
                { name: "Beurre", quantity: 30, unit: Unit.GRAM },
                { name: "Oignon", quantity: 1, unit: Unit.PIECE },
                { name: "Persil plat", quantity: 2, unit: Unit.TABLESPOON },
                { name: "Sel fin", quantity: 1, unit: Unit.TEASPOON },
                { name: "Poivre noir", quantity: 1, unit: Unit.TEASPOON },
            ],
            steps: [
                "Former 4 steaks hachés avec le bœuf. Assaisonner sel et poivre.",
                "Saisir les steaks dans une poêle bien chaude avec 15g de beurre, 3 min par face. Réserver.",
                "Dans la même poêle, faire fondre le reste du beurre. Faire revenir l'oignon émincé et les champignons.",
                "Ajouter la crème fraîche, mélanger et laisser réduire 5 min. Ajuster l'assaisonnement.",
                "Napper les steaks de sauce, parsemer de persil haché et servir.",
            ],
        },

        // ── Entrées ───────────────────────────────────────────────────────────
        {
            name: "Salade grecque",
            description: "La fraîcheur de la Méditerranée : tomates, concombre, feta, olives et oignon rouge.",
            category: "Entrée",
            prepTime: 15,
            cookTime: 0,
            compositions: [
                { name: "Tomate", quantity: 3, unit: Unit.PIECE },
                { name: "Concombre", quantity: 1, unit: Unit.PIECE },
                { name: "Feta", quantity: 150, unit: Unit.GRAM },
                { name: "Oignon", quantity: 1, unit: Unit.PIECE },
                { name: "Huile d'olive", quantity: 3, unit: Unit.TABLESPOON },
                { name: "Vinaigre balsamique", quantity: 1, unit: Unit.TABLESPOON },
                { name: "Herbes de Provence", quantity: 1, unit: Unit.TEASPOON },
                { name: "Sel fin", quantity: 1, unit: Unit.PINCH },
            ],
            steps: [
                "Couper les tomates en quartiers, le concombre en rondelles et l'oignon rouge en lamelles.",
                "Disposer les légumes dans un saladier. Émietter la feta par-dessus.",
                "Préparer la vinaigrette avec l'huile d'olive, le vinaigre, les herbes et le sel.",
                "Arroser la salade de vinaigrette, mélanger délicatement et servir frais.",
            ],
        },
        {
            name: "Velouté de carottes au gingembre",
            description: "Une soupe onctueuse aux carottes, légèrement épicée avec une touche de gingembre.",
            category: "Soupe & Velouté",
            prepTime: 10,
            cookTime: 25,
            compositions: [
                { name: "Carotte", quantity: 500, unit: Unit.GRAM },
                { name: "Oignon", quantity: 1, unit: Unit.PIECE },
                { name: "Ail", quantity: 1, unit: Unit.PIECE },
                { name: "Cumin en poudre", quantity: 1, unit: Unit.TEASPOON },
                { name: "Curcuma", quantity: 1, unit: Unit.TEASPOON },
                { name: "Huile d'olive", quantity: 2, unit: Unit.TABLESPOON },
                { name: "Crème liquide", quantity: 100, unit: Unit.MILLILITER },
                { name: "Sel fin", quantity: 1, unit: Unit.TEASPOON },
                { name: "Coriandre fraîche", quantity: 1, unit: Unit.BUNCH },
            ],
            steps: [
                "Éplucher et couper les carottes en rondelles, l'oignon en dés.",
                "Faire revenir l'oignon et l'ail dans l'huile d'olive. Ajouter le cumin et le curcuma, mélanger.",
                "Ajouter les carottes et couvrir d'eau à hauteur. Saler. Cuire 20 min à frémissement.",
                "Mixer finement et incorporer la crème liquide. Rectifier l'assaisonnement.",
                "Servir chaud garni de coriandre fraîche et d'un filet de crème.",
            ],
        },
        {
            name: "Salade de lentilles aux lardons",
            description: "Une salade tiède de lentilles vertes avec des lardons grillés et une vinaigrette moutardée.",
            category: "Entrée",
            prepTime: 10,
            cookTime: 25,
            compositions: [
                { name: "Lentilles vertes", quantity: 200, unit: Unit.GRAM },
                { name: "Lardons", quantity: 150, unit: Unit.GRAM },
                { name: "Oignon", quantity: 1, unit: Unit.PIECE },
                { name: "Carotte", quantity: 1, unit: Unit.PIECE },
                { name: "Laurier", quantity: 1, unit: Unit.PIECE },
                { name: "Moutarde de Dijon", quantity: 1, unit: Unit.TABLESPOON },
                { name: "Vinaigre balsamique", quantity: 2, unit: Unit.TABLESPOON },
                { name: "Huile de tournesol", quantity: 3, unit: Unit.TABLESPOON },
                { name: "Persil plat", quantity: 2, unit: Unit.TABLESPOON },
            ],
            steps: [
                "Rincer les lentilles. Les cuire dans de l'eau froide avec la carotte, l'oignon et le laurier pendant 20-25 min.",
                "Faire griller les lardons à sec dans une poêle.",
                "Préparer la vinaigrette : moutarde, vinaigre, huile, sel, poivre.",
                "Égoutter les lentilles encore chaudes, retirer le laurier. Mélanger avec la vinaigrette et les lardons.",
                "Parsemer de persil haché et servir tiède.",
            ],
        },

        // ── Desserts ──────────────────────────────────────────────────────────
        {
            name: "Tarte aux pommes maison",
            description: "Une tarte aux pommes classique avec une pâte brisée croustillante et des pommes fondantes.",
            category: "Dessert",
            prepTime: 30,
            cookTime: 35,
            compositions: [
                { name: "Pomme", quantity: 4, unit: Unit.PIECE },
                { name: "Farine de blé", quantity: 200, unit: Unit.GRAM },
                { name: "Beurre", quantity: 100, unit: Unit.GRAM },
                { name: "Sucre en poudre", quantity: 80, unit: Unit.GRAM },
                { name: "Œuf", quantity: 1, unit: Unit.PIECE },
                { name: "Cannelle", quantity: 1, unit: Unit.TEASPOON },
                { name: "Sel fin", quantity: 1, unit: Unit.PINCH },
                { name: "Citron", quantity: 1, unit: Unit.PIECE },
            ],
            steps: [
                "Préparer la pâte brisée : mélanger farine, beurre en dés, sel et une pincée de sucre. Sabler du bout des doigts. Ajouter l'œuf et former une boule. Réfrigérer 30 min.",
                "Éplucher et évider les pommes. Les couper en fines lamelles, les citronner.",
                "Étaler la pâte dans un moule. Piquer le fond avec une fourchette.",
                "Disposer les lamelles de pommes en rosace, saupoudrer de sucre et de cannelle.",
                "Enfourner à 180°C pendant 30-35 min jusqu'à dorure. Laisser refroidir avant de démouler.",
            ],
        },
        {
            name: "Crêpes sucrées",
            description: "Des crêpes fines et légères, parfaites avec du sucre, de la confiture ou du Nutella.",
            category: "Dessert",
            prepTime: 10,
            cookTime: 20,
            compositions: [
                { name: "Farine de blé", quantity: 250, unit: Unit.GRAM },
                { name: "Lait entier", quantity: 500, unit: Unit.MILLILITER },
                { name: "Œuf", quantity: 3, unit: Unit.PIECE },
                { name: "Beurre", quantity: 50, unit: Unit.GRAM },
                { name: "Sucre en poudre", quantity: 30, unit: Unit.GRAM },
                { name: "Sel fin", quantity: 1, unit: Unit.PINCH },
            ],
            steps: [
                "Mélanger la farine, le sucre et le sel dans un saladier. Creuser un puits.",
                "Ajouter les œufs battus, puis incorporer le lait progressivement en fouettant pour éviter les grumeaux.",
                "Ajouter le beurre fondu refroidi. Laisser reposer 30 min.",
                "Faire chauffer une poêle beurrée à feu moyen. Verser une louche de pâte, incliner pour répartir.",
                "Cuire 1-2 min par face jusqu'à légère dorure. Servir avec la garniture de votre choix.",
            ],
        },
        {
            name: "Mousse au chocolat",
            description: "Une mousse au chocolat aérienne et gourmande, fondante en bouche.",
            category: "Dessert",
            prepTime: 20,
            cookTime: 0,
            compositions: [
                { name: "Œuf", quantity: 4, unit: Unit.PIECE },
                { name: "Sucre en poudre", quantity: 50, unit: Unit.GRAM },
                { name: "Sel fin", quantity: 1, unit: Unit.PINCH },
            ],
            steps: [
                "Séparer les blancs des jaunes d'œufs. Battre les jaunes avec le sucre jusqu'à blanchissement.",
                "Faire fondre le chocolat au bain-marie. L'incorporer aux jaunes en mélangeant vivement.",
                "Monter les blancs en neige ferme avec une pincée de sel.",
                "Incorporer délicatement les blancs en neige au mélange chocolaté en trois fois, en soulevant la masse.",
                "Répartir dans des ramequins et réfrigérer au moins 2h avant de servir.",
            ],
        },

        // ── Soupes & Veloutés ─────────────────────────────────────────────────
        {
            name: "Soupe de légumes d'hiver",
            description: "Une soupe réconfortante aux légumes de saison, idéale pour les soirées froides.",
            category: "Soupe & Velouté",
            prepTime: 15,
            cookTime: 30,
            compositions: [
                { name: "Carotte", quantity: 3, unit: Unit.PIECE },
                { name: "Pomme de terre", quantity: 2, unit: Unit.PIECE },
                { name: "Poireau", quantity: 1, unit: Unit.PIECE },
                { name: "Céleri", quantity: 2, unit: Unit.PIECE },
                { name: "Oignon", quantity: 1, unit: Unit.PIECE },
                { name: "Beurre", quantity: 20, unit: Unit.GRAM },
                { name: "Herbes de Provence", quantity: 1, unit: Unit.TEASPOON },
                { name: "Sel fin", quantity: 1, unit: Unit.TEASPOON },
                { name: "Poivre noir", quantity: 1, unit: Unit.TEASPOON },
            ],
            steps: [
                "Éplucher et couper tous les légumes en morceaux de taille similaire.",
                "Faire revenir l'oignon et le poireau dans le beurre pendant 5 min.",
                "Ajouter les autres légumes, les herbes et couvrir d'eau. Saler et poivrer.",
                "Cuire à frémissement pendant 25 min jusqu'à ce que les légumes soient tendres.",
                "Mixer partiellement ou totalement selon la texture souhaitée. Rectifier l'assaisonnement.",
            ],
        },

        // ── Petit-déjeuner ────────────────────────────────────────────────────
        {
            name: "Pancakes moelleux",
            description: "Des pancakes épais et moelleux à l'américaine, parfaits pour un brunch gourmand.",
            category: "Petit-déjeuner",
            prepTime: 10,
            cookTime: 15,
            compositions: [
                { name: "Farine de blé", quantity: 200, unit: Unit.GRAM },
                { name: "Lait entier", quantity: 200, unit: Unit.MILLILITER },
                { name: "Œuf", quantity: 2, unit: Unit.PIECE },
                { name: "Sucre en poudre", quantity: 40, unit: Unit.GRAM },
                { name: "Levure chimique", quantity: 1, unit: Unit.TABLESPOON },
                { name: "Beurre", quantity: 30, unit: Unit.GRAM },
                { name: "Sel fin", quantity: 1, unit: Unit.PINCH },
                { name: "Miel", quantity: 2, unit: Unit.TABLESPOON },
            ],
            steps: [
                "Mélanger farine, sucre, levure et sel dans un bol.",
                "Dans un autre bol, battre les œufs avec le lait et le beurre fondu.",
                "Incorporer le mélange liquide aux poudres sans trop travailler la pâte (quelques grumeaux c'est normal).",
                "Laisser reposer 5 min. Faire chauffer une poêle beurrée à feu moyen.",
                "Verser des louches de pâte. Cuire 2-3 min jusqu'à l'apparition de bulles, retourner et cuire encore 1-2 min.",
                "Servir avec du miel et des fruits frais.",
            ],
        },

        // ── Snack & Apéro ─────────────────────────────────────────────────────
        {
            name: "Houmous maison",
            description: "Un houmous crémeux aux pois chiches, ail et citron, à déguster avec des crudités ou du pain pita.",
            category: "Snack & Apéro",
            prepTime: 15,
            cookTime: 0,
            compositions: [
                { name: "Pois chiches", quantity: 400, unit: Unit.GRAM },
                { name: "Ail", quantity: 2, unit: Unit.PIECE },
                { name: "Citron", quantity: 1, unit: Unit.PIECE },
                { name: "Huile d'olive", quantity: 3, unit: Unit.TABLESPOON },
                { name: "Cumin en poudre", quantity: 1, unit: Unit.TEASPOON },
                { name: "Sel fin", quantity: 1, unit: Unit.TEASPOON },
                { name: "Paprika doux", quantity: 1, unit: Unit.TEASPOON },
            ],
            steps: [
                "Égoutter et rincer les pois chiches. En réserver quelques-uns pour la décoration.",
                "Mixer les pois chiches avec l'ail, le jus de citron, l'huile d'olive, le cumin et le sel.",
                "Ajouter 2-3 cuillères d'eau froide et mixer jusqu'à obtenir une texture crémeuse.",
                "Dresser dans un bol, creuser un sillon, verser un filet d'huile d'olive et saupoudrer de paprika.",
                "Décorer avec les pois chiches réservés et servir avec des légumes crus ou du pain.",
            ],
        },
    ];

    for (const meal of meals) {
        const catId = catIds[meal.category];

        const created = await db.meal.upsert({
            where: { name: meal.name },
            update: {},
            create: {
                name: meal.name,
                description: meal.description,
                categoryMealId: catId,
            },
        });

        // Composition (ingrédients)
        for (const comp of meal.compositions) {
            const ingId = ingIds[comp.name];
            if (!ingId) {
                console.warn(`Ingrédient introuvable : "${comp.name}" pour "${meal.name}"`);
                continue;
            }
            const existingComp = await db.composition.findFirst({
                where: { ingredientId: ingId, mealId: created.id },
            });
            if (existingComp) {
                await db.composition.update({
                    where: { id: existingComp.id },
                    data: { quantity: comp.quantity, unit: comp.unit },
                });
            } else {
                await db.composition.create({
                    data: {
                        ingredientId: ingId,
                        mealId: created.id,
                        quantity: comp.quantity,
                        unit: comp.unit,
                    },
                });
            }
        }

        // Préparation + étapes
        if (meal.steps.length > 0) {
            const prep = await db.preparation.upsert({
                where: { mealId: created.id },
                update: { prepTime: meal.prepTime, cookTime: meal.cookTime },
                create: {
                    mealId: created.id,
                    prepTime: meal.prepTime,
                    cookTime: meal.cookTime ?? null,
                },
            });

            for (let i = 0; i < meal.steps.length; i++) {
                const existingStep = await db.step.findFirst({
                    where: { preparationId: prep.id, stepNumber: i + 1 },
                });
                if (existingStep) {
                    await db.step.update({
                        where: { id: existingStep.id },
                        data: { description: meal.steps[i] },
                    });
                } else {
                    await db.step.create({
                        data: {
                            preparationId: prep.id,
                            stepNumber: i + 1,
                            description: meal.steps[i],
                        },
                    });
                }
            }
        }
    }
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

async function main() {
    console.log("Démarrage du seed BigMeal…\n");

    const catIngIds = await seedCategoriesIngredients();
    const ingIds = await seedIngredients(catIngIds);
    await seedHouseholdProducts();
    await seedMeals(ingIds);

    console.log("\n✅ Seed terminé avec succès !");
    console.log(`   • ${Object.keys(catIngIds).length} catégories d'ingrédients`);
    console.log(`   • ${Object.keys(ingIds).length} ingrédients`);
    console.log("   • 6 catégories de produits ménagers");
    console.log("   • 13 repas avec compositions et étapes");
}

main()
    .catch((e) => {
        console.error("Erreur lors du seed :", e);
        process.exit(1);
    })
    .finally(() => db.$disconnect());
