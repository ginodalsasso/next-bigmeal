import { auth } from "@/lib/auth"; 
import UsersList from "./_component/UsersList";
import { getUsers } from "@/lib/services/data_fetcher";
import { notFound, unauthorized } from 'next/navigation'


export default async function Dashboard() {
    const session = await auth();
    
    if(session?.user.role !== "ADMIN") {
        unauthorized();
    }

    if (!session) {
        return  notFound();
    }

    // Récupération des utilisateurs
    const users = await getUsers();
    if (!users) {
        return notFound();
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
