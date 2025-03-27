import { UserType } from "@/lib/types/schemas_interfaces";

export default function UserList({ fetchedUsers }: { fetchedUsers: UserType[] }) {
    if (!fetchedUsers) {
        return <div>Chargement des utilisateurs...</div>;
    }
    
    return (
        <div>
            <h2>Liste des utilisateurs</h2>
            <ul>
                {fetchedUsers.map(user => (
                    <li key={user.id}>
                        {user.email}
                        {user.role}
                        {user.status}
                        {new Date(user.createdAt).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}
