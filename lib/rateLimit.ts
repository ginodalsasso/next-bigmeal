"server-only";

import { NextRequest, NextResponse } from 'next/server';

type RequestData = {
    count: number;
    firstRequest: number;
};

// Fonction pour extraire l'adresse IP du client
const getClientIp = (req: NextRequest): string => {
    const forwardedFor = req.headers.get("x-forwarded-for");
    if (forwardedFor) {
        return forwardedFor.split(",")[0].trim(); // Prend la première IP si plusieurs sont présentes
    }
    return req.headers.get("x-real-ip") || "unknown";
};

const rateLimit = (limit: number, interval: number) => {
    const requests = new Map<string, RequestData>();

    return (req: NextRequest, res: NextResponse, next: () => void) => {
        const ip = getClientIp(req); // Récupération de l'IP du client

        if (!requests.has(ip)) {
            requests.set(ip, { count: 0, firstRequest: Date.now() });
        }

        const data = requests.get(ip)!;
        if (Date.now() - data.firstRequest > interval) {
            data.count = 0;
            data.firstRequest = Date.now();
        }

        data.count += 1;

        if (data.count > limit) {
            return NextResponse.json(
                { message: "Too many requests, please try again later." },
                { status: 429 }
            );
        }

        requests.set(ip, data);
        next();
    };
};

export default rateLimit;
