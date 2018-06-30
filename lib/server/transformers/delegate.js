'use strict'

/**
 * This file is part of Ark Core - Delegate API.
 *
 * (c) ArkX <hello@arkx.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const { calculateApproval, calculateProductivity } = require('./utils/calculator')
const blockService = require('../../services/block')
const transformBlock = require('./block')

module.exports = async delegate => {
    const lastBlock = await blockService.lastBlock(delegate)

    return {
        username: delegate.username,
        address: delegate.address,
        publicKey: delegate.publicKey,
        votes: Number(delegate.votebalance),
        rank: Number(delegate.rate),
        production: {
            approval: calculateApproval(delegate),
            productivity: calculateProductivity(delegate)
        },
        blocks: {
            produced: Number(delegate.producedBlocks),
            missed: Number(delegate.missedBlocks),
            last: transformBlock(lastBlock)
        }
    }
}
