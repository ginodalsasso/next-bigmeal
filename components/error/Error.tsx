"use client";

import { useEffect, useState } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error | null;
    reset: () => void;
}) {
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (error) {
            setMessage(error.message);
            console.error(error);
        }
    }, [error]);

    return (
        <div>
            <h2>{message}</h2>
            <button onClick={reset}>Try again</button>
        </div>
    );
}
