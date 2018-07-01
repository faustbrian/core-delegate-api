'use strict'

/**
 * This file is part of Ark Core - Delegate API.
 *
 * (c) ArkX <hello@arkx.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const moment = require('moment')
const config = require('@arkecosystem/core-container').resolvePlugin('config')

module.exports = epoch => {
    const timestamp = moment(config.getConstants(1).epoch).utc().add(epoch, 'seconds')

    return timestamp.unix()
}
