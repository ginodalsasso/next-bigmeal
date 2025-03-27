import { auth } from "@/lib/auth"; 
import { redirect } from "next/navigation";
import Link from "next/link";
import UserList from "./_component/UserList";
import { getUsers } from "@/lib/services/data_fetcher";

export default async function Dashboard() {
    const session = await auth();
    
    // Récupération des utilisateurs
    const users = await getUsers();
    
    // Si l'utilisateur n'est pas connecté, redirection vers la page de connexion
    if (!session) {
        return redirect("/login");
    }
    
    // Si l'utilisateur est un administrateur
    if (session?.user.role === "ADMIN") {
        return (
            <div>
                <h1>Bienvenue, {session.user.role}</h1>
                <div>
                    <UserList fetchedUsers={users} />
                </div>

            </div>
        );
    }
    
    // Pour les utilisateurs non-admin
    return (
        <div>
            <h1>Accès refusé</h1>
            <p>Vous n&apos;avez pas les droits d&apos;accès à cette page.</p>
            <Link href="/">
                <button>Retour à l&apos;accueil</button>
            </Link>
        </div>
    );
}
