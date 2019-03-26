import { Server } from "hapi";
import * as handlers from "./handlers";

export async function startServer(options): Promise<Server> {
	const server = new Server(options.server);

	await server.register({
		plugin: require("@faustbrian/hapi-whitelist"),
		options: options.plugins.whitelist,
	});

	await server.register({
		plugin: require("hapi-pagination"),
		options: options.plugins.pagination,
	});

	await server.register(require("./plugins/delegate-picker"));
	server.route(Object.values(handlers));

	await server.start();

	return server;
}
