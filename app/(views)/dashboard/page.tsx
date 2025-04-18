import { auth } from "@/lib/auth"; 
import UsersList from "./_component/UsersList";
import { getUsers } from "@/lib/services/data_fetcher";
import { unauthorized } from 'next/navigation'


export default async function Dashboard() {
    const session = await auth();
    
    if(session?.user.role !== "ADMIN") {
        unauthorized();
    }

    // Récupération des utilisateurs
    const users = await getUsers();
    if (!users) {
        return <div>Erreur lors de la récupération des utilisateurs</div>;
    }
    
    return (
        <div>
            <h1>Bienvenue, {session.user.role}</h1>
            <div>
                <UsersList fetchedUsers={users} />
            </div>

        </div>
    );
}
