'use strict'

/**
 * This file is part of Ark Core - Delegate API.
 *
 * (c) ArkX <hello@arkx.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const container = require('@arkecosystem/core-container')
const database = container.resolvePlugin('database')
const blockRepository = require('./block')
const Repository = require('./repository')
const voterRepository = require('./voter')

class TransactionRepository extends Repository {
    async all (delegate, parameters) {
        const wrapQuery = query => {
            return query
                .where(this.query.sender_public_key.equals(delegate.publicKey))
                .where(this.query.recipient_id.equals(delegate.address))
        }

        const selectQuery = wrapQuery(this.query.select().from(this.query))
        const countQuery = wrapQuery(this._makeEstimateQuery())

        return this._findManyWithCount(selectQuery, countQuery, parameters)
    }

    async findById (delegate, id) {
        const query = this.query
          .select()
          .from(this.query)
          .where(this.query.id.equals(id))
          .where(this.query.sender_public_key.equals(delegate.publicKey))
          .or(this.query.recipient_id.equals(delegate.address))

        return this._find(query)
    }

    async findByBlock (delegate, id, parameters) {
        const wrapQuery = query => {
            return query
                .where(this.query.block_id.equals(id))
                .where(this.query.sender_public_key.equals(delegate.publicKey))
                .where(this.query.recipient_id.equals(delegate.address))
        }

        const selectQuery = wrapQuery(this.query.select().from(this.query))
        const countQuery = wrapQuery(this._makeEstimateQuery())

        return this._findManyWithCount(selectQuery, countQuery, parameters)
    }

    async findByWallet (id, parameters) {
        const wallet = voterRepository.findById(id)

        const wrapQuery = query => {
            return query
                .where(this.query.sender_public_key.equals(wallet.publicKey))
                .where(this.query.recipient_id.equals(wallet.address))
        }

        const selectQuery = wrapQuery(this.query.select().from(this.query))
        const countQuery = wrapQuery(this._makeEstimateQuery())

        return this._findManyWithCount(selectQuery, countQuery, parameters)
    }

    async findBySender (id, parameters) {
        const wallet = voterRepository.findById(id)

        const wrapQuery = query => {
            return query
                .where(this.query.sender_public_key.equals(wallet.publicKey))
        }

        const selectQuery = wrapQuery(this.query.select().from(this.query))
        const countQuery = wrapQuery(this._makeEstimateQuery())

        return this._findManyWithCount(selectQuery, countQuery, parameters)
    }

    async findByRecipient (id, parameters) {
        const wallet = voterRepository.findById(id)

        const wrapQuery = query => {
            return query
                .where(this.query.recipient_id.equals(wallet.address))
        }

        const selectQuery = wrapQuery(this.query.select().from(this.query))
        const countQuery = wrapQuery(this._makeEstimateQuery())

        return this._findManyWithCount(selectQuery, countQuery, parameters)
    }

    async forged (delegate, parameters) {
        const ids = await blockRepository.ids(delegate.publicKey)

        const wrapQuery = query => {
            return query
                .where(this.query.block_id.in(ids))
        }

        const selectQuery = wrapQuery(this.query.select().from(this.query))
        const countQuery = wrapQuery(this._makeEstimateQuery())

        return this._findManyWithCount(selectQuery, countQuery, parameters)
    }

    getModel () {
      return database.models.transaction
    }
}

module.exports = new TransactionRepository()
