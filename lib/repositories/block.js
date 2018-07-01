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
                .where('generatorPublicKey', delegate.publicKey)
        }

        return {
            rows: await super.executeSelectQuery('*', 'blocks', parameters, wrapQuery),
            count: await super.executeCountQuery('blocks', wrapQuery)
        }
    }

    async findById (delegate, id) {
        return database.query
            .select('*')
            .from('blocks')
            .where('id', id)
            .where('generatorPublicKey', delegate.publicKey)
            .first()
    }

    async ids (delegate) {
        const rows = await database.query
            .select('id')
            .from('blocks')
            .where('generatorPublicKey', delegate.publicKey)
            .all()

        return rows.map(row => row.id)
    }

    async lastBlock (delegate) {
        return database.query
            .select('*')
            .from('blocks')
            .where('generatorPublicKey', delegate.publicKey)
            .orderBy('height', 'desc')
            .first()
    }
}

module.exports = new BlockRepository()
