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
                .where('senderPublicKey', delegate.publicKey)
                .orWhere('recipientId', delegate.address)
        }

        return {
            rows: await super.executeSelectQuery('*', 'transactions', parameters, wrapQuery),
            count: await super.executeCountQuery('transactions', wrapQuery)
        }
    }

    async findById (delegate, id) {
        return database.query
            .select('*')
            .from('transactions')
            .where('id', id)
            .where('senderPublicKey', delegate.publicKey)
            .orWhere('recipientId', delegate.address)
            .first()
    }

    async findByBlock (delegate, id, parameters) {
        const wrapQuery = query => {
            return query
                .where('blockId', id)
                .andWhere('senderPublicKey', delegate.publicKey)
                .orWhere('recipientId', delegate.address)
        }

        return {
            rows: await super.executeSelectQuery('*', 'transactions', parameters, wrapQuery),
            count: await super.executeCountQuery('transactions', wrapQuery)
        }
    }

    async findByWallet (id, parameters) {
        const wallet = voterRepository.findById(id)

        const wrapQuery = query => {
            return query
                .where('senderPublicKey', wallet.publicKey)
                .orWhere('recipientId', wallet.address)
        }

        return {
            rows: await super.executeSelectQuery('*', 'transactions', parameters, wrapQuery),
            count: await super.executeCountQuery('transactions', wrapQuery)
        }
    }

    async findBySender (id, parameters) {
        const wallet = voterRepository.findById(id)

        const wrapQuery = query => {
            return query.where('senderPublicKey', wallet.publicKey)
        }

        return {
            rows: await super.executeSelectQuery('*', 'transactions', parameters, wrapQuery),
            count: await super.executeCountQuery('transactions', wrapQuery)
        }
    }

    async findByRecipient (id, parameters) {
        const wallet = voterRepository.findById(id)

        const wrapQuery = query => {
            return query.where('recipientId', wallet.address)
        }

        return {
            rows: await super.executeSelectQuery('*', 'transactions', parameters, wrapQuery),
            count: await super.executeCountQuery('transactions', wrapQuery)
        }
    }

    async forged (delegate, parameters) {
        const ids = await blockRepository.ids(delegate.publicKey)

        const wrapQuery = query => {
            return query.whereIn('blockId', ids)
        }

        return {
            rows: await super.executeSelectQuery('*', 'transactions', parameters, wrapQuery),
            count: await super.executeCountQuery('transactions', wrapQuery)
        }
    }
}

module.exports = new TransactionRepository()
