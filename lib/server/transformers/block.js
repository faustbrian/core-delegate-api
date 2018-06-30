'use strict'

/**
 * This file is part of Ark Core - Delegate API.
 *
 * (c) ArkX <hello@arkx.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const delegateService = require('../../services/delegate')
const formatTimestamp = require('./utils/format-timestamp')

module.exports = data => {
    const generator = delegateService.findById(data.generatorPublicKey)

    return {
        id: data.id,
        version: Number(data.version),
        height: Number(data.height),
        previous: data.previousBlock,
        forged: {
            reward: Number(data.reward),
            fee: Number(data.totalFee),
            total: Number(data.reward) + Number(data.totalFee)
        },
        payload: {
            hash: data.payloadHash,
            length: Number(data.payloadLength)
        },
        generator: {
            username: generator.username,
            address: generator.address,
            publicKey: generator.publicKey
        },
        signature: data.blockSignature,
        transactions: Number(data.numberOfTransactions),
        timestamp: formatTimestamp(data.timestamp)
    }
}
