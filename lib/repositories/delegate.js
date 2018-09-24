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
const { pick } = require('lodash')

class DelegateRepository {
    findById (id) {
        let delegates = database.walletManager.allByUsername()

        return delegates.find(item => {
            const keys = pick(item, 'address', 'publicKey', 'username')

            return Object.values(keys).includes(id)
        })
    }
}

module.exports = new DelegateRepository()
