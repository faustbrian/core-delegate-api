export const defaults = {
    server: {
        host: "0.0.0.0",
        port: 5002,
        whitelist: ["*"],
    },
    plugins: {
        whitelist: {
            allowed: ["*"],
        },
        rateLimit: {
            enabled: true,
            userLimit: 300,
            ipWhitelist: ["127.0.0.1"],
        },
        pagination: {
            meta: {
                baseUri: "",
            },
            results: {
                name: "data",
            },
            routes: {
                include: [
                    "/{delegate}/blocks",
                    "/{delegate}/blocks/{block}/transactions",
                    "/{delegate}/transactions",
                    "/{delegate}/voters",
                    "/{delegate}/voters/{voter}/transactions",
                ],
            },
        },
    },
};
