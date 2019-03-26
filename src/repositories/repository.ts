import { app } from "@arkecosystem/core-container";
import { Database } from "@arkecosystem/core-interfaces";

export class Repository {
	protected database = app.resolvePlugin<Database.IDatabaseService>("database");
}
