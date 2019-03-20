class BlockRepository extends Repository {
    public async all(delegate, parameters) {
        // const wrapQuery = query => {
        //     return query.where(this.query.generator_public_key.equals(delegate.publicKey));
        // };
        // const selectQuery = wrapQuery(this.query.select().from(this.query));
        // const countQuery = wrapQuery(this._makeEstimateQuery());
        // return this._findManyWithCount(selectQuery, countQuery, parameters);
    }

    public async findById(delegate, id) {
        // const query = this.query
        //     .select()
        //     .from(this.query)
        //     .where(this.query.id.equals(id))
        //     .where(this.query.generator_public_key.equals(delegate.publicKey));
        // return this._find(query);
    }

    public async ids(delegate) {
        // const query = this.query
        //     .select(this.query.id)
        //     .from(this.query)
        //     .where(this.query.generator_public_key.equals(delegate.publicKey));
        // const rows = await this._findMany(query);
        // return rows.map(row => row.id);
    }

    public async lastBlock(delegate) {
        // const query = this.query
        //     .select()
        //     .from(this.query)
        //     .where(this.query.generator_public_key.equals(delegate.publicKey))
        //     .order(this.query.height.desc);
        // return this._find(query);
    }
}

export const blockRepository = new BlockRepository();
