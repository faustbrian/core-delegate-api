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
const blockchain = container.resolvePlugin('blockchain')
const config = container.resolvePlugin('config')

exports.calculateApproval = delegate => {
    const height = blockchain.getLastBlock().data.height

    const constants = config.getConstants(height)
    const totalSupply = config.genesisBlock.totalAmount + (height - constants.height) * constants.reward

    return ((delegate.balance / totalSupply) * 100).toFixed(2)
}

exports.calculateProductivity = delegate => {
    if (!delegate.missedBlocks && !delegate.producedBlocks) {
        return 0
    }

    return (100 - (delegate.missedBlocks / ((delegate.producedBlocks + delegate.missedBlocks) / 100))).toFixed(2)
}
