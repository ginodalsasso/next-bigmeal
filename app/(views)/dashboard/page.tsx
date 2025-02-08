// "use-client";

// import { useSession } from "next-auth/react";
// import { signOut } from "next-auth/react";
// import Link from "next/link";

// export default function Dashboard() {
//     const { data: session } = useSession();

//     return (
//         <>
//             {session?.user ? (
//                 <div>
//                     <h1>Welcome {session.user.name}</h1>
//                     <button>
//                         <a onClick={() => signOut()}>Déconnexion</a>
//                     </button>
//                 </div>
//             ) : (
//                 <div>
//                     <h1>Sign in to continue</h1>
//                     <Link href="/login">
//                         <button>Connexion</button>d
//                     </Link>
//                 </div>
//             )}
//         </>
//     );
// }

"use client"; // Indique que ce composant est un composant client

import { useSession, signOut } from "next-auth/react";
import Link from "next/link"


export default function AuthComponent() {
    const { data: session } = useSession();


    if (session) {
        return (
            <>
                <h1>Welcome {session?.user?.role}</h1>
                <button onClick={() => signOut()}> 
                    Déconnexion
                </button>
            </>
        );
    }

    return (
        <>
            <p>Vous n&apos;êtes pas connecté</p>
            <Link href="/login">
                    <button>Connexion</button >
                </Link >      
        </>
    );
}
