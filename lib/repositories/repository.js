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

module.exports = class Repository {
    async executeSelectQuery (columns, table, parameters, callback) {
        let query = database.query
            .select(columns)
            .from(table)

        query = callback(query)

        if (parameters.offset) {
            query = query.offset(parameters.offset)
        }

        if (parameters.limit) {
            query = query.limit(parameters.limit)
        }

        return query.all()
    }

    async executeCountQuery (table, callback) {
        const query = database.query
            .select()
            .count('id', 'count')
            .from(table)

        const { count } = await callback(query).first()

        return count
    }
}
