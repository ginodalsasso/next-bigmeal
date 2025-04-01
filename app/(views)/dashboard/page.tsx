import { auth } from "@/lib/auth"; 
import UsersList from "./_component/UsersList";
import { getUsers } from "@/lib/services/data_fetcher";
import { unauthorized } from 'next/navigation'


export default async function Dashboard() {
    const session = await auth();
    
    // Récupération des utilisateurs
    const users = await getUsers();

    if(session?.user.role !== "ADMIN") {
        unauthorized();
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
