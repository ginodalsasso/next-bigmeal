"server only";

import { NextRequest } from 'next/server';

type RequestData = {
    count: number;
    firstRequest: number;
};

const requests = new Map<string, RequestData>();


const getClientIp = (req: NextRequest): string => {
    const forwardedFor = req.headers.get("x-forwarded-for");
    if (forwardedFor) {
        return forwardedFor.split(",")[0].trim(); // Prend la première IP si plusieurs sont présentes
    }
    return req.headers.get("x-real-ip") || "unknown";
};

const rateLimit = (req: NextRequest, limit: number, interval: number): void => {
    const ip = getClientIp(req);

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
        throw new Error("Trop de requêtes. Réessayez plus tard.");
    }

    requests.set(ip, data);
    // return null;
};

export default rateLimit;
