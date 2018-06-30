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
const delegateService = require('./delegate')

class BlockService {
    async all (delegate) {
        delegate = delegateService.findById(delegate)

        return database.query
            .select('*')
            .from('blocks')
            .where('generatorPublicKey', delegate.publicKey)
            .all()
    }

    async findById (delegate, id) {
        delegate = delegateService.findById(delegate)

        return database.query
            .select('*')
            .from('blocks')
            .where('id', id)
            .where('generatorPublicKey', delegate.publicKey)
            .first()
    }

    async ids (delegate) {
        delegate = delegateService.findById(delegate)

        const rows = await database.query
            .select('id')
            .from('blocks')
            .where('generatorPublicKey', delegate.publicKey)
            .all()

        return rows.map(row => row.id)
    }
}

module.exports = new BlockService()
