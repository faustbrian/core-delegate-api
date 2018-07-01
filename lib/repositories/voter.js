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
const { _ } = require('lodash')

class VoterRepository {
    all (delegate, parameters) {
        const voters = database.walletManager.getLocalWallets().filter(item => {
            return item.vote === delegate.publicKey
        })

        return {
            rows: _(voters)
                .slice(parameters.offset)
                .take(parameters.limit)
                .value(),
            count: voters.length
        }
    }

    findById (delegate, id) {
        const voters = this.all(delegate)

        return voters.find(item => {
            const keys = _.pick(item, 'address', 'publicKey', 'username')

            return Object.values(keys).includes(id)
        })
    }
}

module.exports = new VoterRepository()
