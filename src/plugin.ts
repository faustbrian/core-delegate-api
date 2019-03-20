import { Container } from "@arkecosystem/core-interfaces";
import { defaults } from "./defaults";
import { startServer } from "./server";

export const plugin: Container.PluginDescriptor = {
    pkg: require("../package.json"),
    defaults,
    alias: "delegate-api",
    async register(container: Container.IContainer, options) {
        return startServer(options);
    },
    async deregister(container: Container.IContainer) {
        await container.resolvePlugin("delegate-api").stop();
    },
};
