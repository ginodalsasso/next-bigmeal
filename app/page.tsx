import Link from "next/link";

const links = [
    { title: "ingredients", url: "/ingredients" },
    { title: "creer ingredient", url: "/ingredients/create" },
    { title: "catégorie ingrédient", url: "/categories-ingredient" },
    { title: "catégorie repas", url: "/categories-meal" },

];

export default function Home() {
    return (
        <div className="">
            <main className="">
                {links.map((link) =>
                    <Link key={link.title} href={link.url}>
                        <div className="mr-5 cursor-pointer hover:text-gray-900">
                            {link.title}
                        </div>
                    </Link>
                )}
            </main>
        </div>
    );
}
