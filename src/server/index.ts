import { Server } from "hapi";
import * as handlers from "./handlers";

export async function startServer(options): Promise<Server> {
    const server = new Server({
        host: options.server.host,
        port: options.server.port,
        routes: { cors: true },
    });

    // await server.register({
    //     plugin: require("@faustbrian/hapi-whitelist"),
    //     options: options.plugins.whitelist,
    // });

    // await server.register({
    //     plugin: require("hapi-pagination"),
    //     options: options.plugins.pagination,
    // });

    // await server.register({
    //     plugin: require("hapi-rate-limit"),
    //     options: options.plugins.rateLimit,
    // });

    await server.register(require("./plugins/delegate-picker"));
    console.log(Object.values(handlers));
    server.route(Object.values(handlers));

    await server.start();

    return server;
}
