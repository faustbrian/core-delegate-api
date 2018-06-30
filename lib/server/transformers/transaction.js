'use strict'

/**
 * This file is part of Ark Core - Delegate API.
 *
 * (c) ArkX <hello@arkx.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const { crypto, models } = require('@arkecosystem/crypto')

const container = require('@arkecosystem/core-container')
const blockchain = container.resolvePlugin('blockchain')
const config = container.resolvePlugin('config')
const database = container.resolvePlugin('database')

const formatTimestamp = require('./utils/format-timestamp')

module.exports = async transaction => {
    const data = models.Transaction.deserialize(transaction.serialized.toString('hex'))

    const block = await database.query
        .select('height')
        .from('blocks')
        .where('id', transaction.blockId)
        .first()

    return {
        id: data.id,
        blockId: transaction.blockId,
        type: Number(data.type),
        amount: Number(data.amount),
        fee: Number(data.fee),
        sender: crypto.getAddress(data.senderPublicKey, config.network.pubKeyHash),
        recipient: data.recipientId,
        signature: data.signature,
        vendorField: data.vendorField,
        asset: data.asset,
        confirmations: block ? blockchain.getLastBlock().data.height - block.height : 0,
        timestamp: formatTimestamp(data.timestamp),
        serialized: transaction.serialized.toString('hex')
    }
}
