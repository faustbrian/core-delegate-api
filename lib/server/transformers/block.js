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

module.exports = block => {
    const generator = delegateService.findById(block.generatorPublicKey)

    return {
        id: block.id,
        version: Number(block.version),
        height: Number(block.height),
        previous: block.previousBlock,
        forged: {
            reward: Number(block.reward),
            fee: Number(block.totalFee),
            total: Number(block.reward) + Number(block.totalFee)
        },
        payload: {
            hash: block.payloadHash,
            length: Number(block.payloadLength)
        },
        generator: {
            username: generator.username,
            address: generator.address,
            publicKey: generator.publicKey
        },
        signature: block.blockSignature,
        transactions: Number(block.numberOfTransactions),
        timestamp: formatTimestamp(block.timestamp)
    }
}
