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
const Repository = require('./repository')

class BlockRepository extends Repository {
    async all (delegate, parameters) {
        const wrapQuery = query => {
            return query
                .where(this.query.generator_public_key.equals(delegate.publicKey))
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
          .where(this.query.generator_public_key.equals(delegate.publicKey))

        return this._find(query)
    }

    async ids (delegate) {
        const query = this.query
          .select(this.query.id)
          .from(this.query)
          .where(this.query.generator_public_key.equals(delegate.publicKey))

        const rows = await this._findMany(query)

        return rows.map(row => row.id)
    }

    async lastBlock (delegate) {
        const query = this.query
          .select()
          .from(this.query)
          .where(this.query.generator_public_key.equals(delegate.publicKey))
          .order(this.query.height.desc)

        return this._find(query)
    }

    getModel () {
      return database.models.block
    }
}

module.exports = new BlockRepository()
