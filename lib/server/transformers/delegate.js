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

module.exports = async data => {
    const lastBlock = await blockService.lastBlock(data)

    return {
        username: data.username,
        address: data.address,
        publicKey: data.publicKey,
        votes: Number(data.votebalance),
        rank: Number(data.rate),
        blocks: {
            produced: Number(data.producedBlocks),
            missed: Number(data.missedBlocks),
            last: transformBlock(lastBlock)
        },
        production: {
            approval: calculateApproval(data),
            productivity: calculateProductivity(data)
        }
    }
}
