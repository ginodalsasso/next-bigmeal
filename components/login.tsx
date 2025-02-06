'use-client';

import { signIn } from 'next-auth/react';

const Login = () => {
    return (
        <div>
            <button onClick={() => signIn("github", { redirectTo: "/dashboard"})}>
                Se connecter avec github
            </button>
            <button onClick={() => signIn("google", { redirectTo: "/dashboard"})}>
                Se connecter avec google
            </button>
        </div>

    );
};

export default Login;
