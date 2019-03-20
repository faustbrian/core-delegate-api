const container = require("@arkecosystem/core-container");
const database = container.resolvePlugin("database");
const blockRepository = require("./block");
const Repository = require("./repository");
const voterRepository = require("./voter");

class TransactionRepository extends Repository {
    public async all(delegate, parameters) {
        // const wrapQuery = query => {
        //     return query
        //         .where(this.query.sender_public_key.equals(delegate.publicKey))
        //         .where(this.query.recipient_id.equals(delegate.address));
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
        //     .where(this.query.sender_public_key.equals(delegate.publicKey))
        //     .or(this.query.recipient_id.equals(delegate.address));
        // return this._find(query);
    }

    public async findByBlock(delegate, id, parameters) {
        // const wrapQuery = query => {
        //     return query
        //         .where(this.query.block_id.equals(id))
        //         .where(this.query.sender_public_key.equals(delegate.publicKey))
        //         .where(this.query.recipient_id.equals(delegate.address));
        // };
        // const selectQuery = wrapQuery(this.query.select().from(this.query));
        // const countQuery = wrapQuery(this._makeEstimateQuery());
        // return this._findManyWithCount(selectQuery, countQuery, parameters);
    }

    public async findByWallet(id, parameters) {
        // const wallet = voterRepository.findById(id);
        // const wrapQuery = query => {
        //     return query
        //         .where(this.query.sender_public_key.equals(wallet.publicKey))
        //         .where(this.query.recipient_id.equals(wallet.address));
        // };
        // const selectQuery = wrapQuery(this.query.select().from(this.query));
        // const countQuery = wrapQuery(this._makeEstimateQuery());
        // return this._findManyWithCount(selectQuery, countQuery, parameters);
    }

    public async findBySender(id, parameters) {
        // const wallet = voterRepository.findById(id);
        // const wrapQuery = query => {
        //     return query.where(this.query.sender_public_key.equals(wallet.publicKey));
        // };
        // const selectQuery = wrapQuery(this.query.select().from(this.query));
        // const countQuery = wrapQuery(this._makeEstimateQuery());
        // return this._findManyWithCount(selectQuery, countQuery, parameters);
    }

    public async findByRecipient(id, parameters) {
        // const wallet = voterRepository.findById(id);
        // const wrapQuery = query => {
        //     return query.where(this.query.recipient_id.equals(wallet.address));
        // };
        // const selectQuery = wrapQuery(this.query.select().from(this.query));
        // const countQuery = wrapQuery(this._makeEstimateQuery());
        // return this._findManyWithCount(selectQuery, countQuery, parameters);
    }

    public async forged(delegate, parameters) {
        // const ids = await blockRepository.ids(delegate.publicKey);
        // const wrapQuery = query => {
        //     return query.where(this.query.block_id.in(ids));
        // };
        // const selectQuery = wrapQuery(this.query.select().from(this.query));
        // const countQuery = wrapQuery(this._makeEstimateQuery());
        // return this._findManyWithCount(selectQuery, countQuery, parameters);
    }
}

module.exports = new TransactionRepository();
