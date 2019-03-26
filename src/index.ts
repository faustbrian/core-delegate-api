import { Container } from "@arkecosystem/core-interfaces";
import { startServer } from "./server";

export const plugin: Container.PluginDescriptor = {
    pkg: require("../package.json"),
    defaults: {
        server: {
            host: "0.0.0.0",
            port: 4444,
        },
        plugins: {
            whitelist: {
                whitelist: ["127.0.0.1"],
            },
            pagination: {
                // meta: {
                //     baseUri: "",
                // },
                results: {
                    name: "data",
                },
                routes: {
                    include: [
                        "/{delegate}/blocks",
                        "/{delegate}/blocks/{block}/transactions",
                        "/{delegate}/transactions",
                        "/{delegate}/transactions/sent",
                        "/{delegate}/transactions/received",
                        "/{delegate}/transactions/forged",
                        "/{delegate}/voters",
                        "/{delegate}/voters/{voter}/transactions",
                        "/{delegate}/voters/{voter}/transactions/sent",
                        "/{delegate}/voters/{voter}/transactions/received",
                    ],
                },
            },
        },
    },
    alias: "delegate-api",
    async register(container: Container.IContainer, options) {
        return startServer(options);
    },
    async deregister(container: Container.IContainer) {
        await container.resolvePlugin("delegate-api").stop();
    },
};
