import { app } from "@arkecosystem/core-container";
import { Database } from "@arkecosystem/core-interfaces";

export class Repository {
    protected database = app.resolvePlugin<Database.IDatabaseService>("database");

    constructor() {
        // this.model = this.getModel();
        // this.query = this.model.query();
    }

    public async _find(query) {
        // return database.query.oneOrNone(query.toQuery());
    }

    public async _findMany(query) {
        // return database.query.manyOrNone(query.toQuery());
    }

    public async _findManyWithCount(selectQuery, countQuery, { limit, offset, orderBy }) {
        // const { count } = await this._find(countQuery);
        // selectQuery
        //     // .order(this.query[orderBy[0]][orderBy[1]])
        //     .offset(offset)
        //     .limit(limit);
        // return {
        //     rows: await this._findMany(selectQuery),
        //     count: +count,
        // };
    }

    public _makeCountQuery() {
        // return this.query.select("count(*) AS count").from(this.query);
    }
}
