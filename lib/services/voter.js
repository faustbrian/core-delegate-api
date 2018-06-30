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
const { pick } = require('lodash')

class VoterService {
    all (delegate) {
        delegate = delegateService.findById(delegate)

        return database.walletManager.getLocalWallets().filter(item => {
            return item.vote === delegate.publicKey
        })
    }

    findById (delegate, id) {
        const voters = this.all(delegate)

        return voters.find(item => {
            const keys = pick(item, 'address', 'publicKey', 'username')

            return Object.values(keys).includes(id)
        })
    }
}

module.exports = new VoterService()
