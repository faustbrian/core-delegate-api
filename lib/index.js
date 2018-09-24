'use strict'

/**
 * This file is part of Ark Core - Delegate API.
 *
 * (c) ArkX <hello@arkx.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * The struct used by the plugin container.
 * @type {Object}
 */
exports.plugin = {
    pkg: require('../package.json'),
    defaults: require('./defaults'),
    alias: 'arkx:delegate-api',
    async register (container, options) {
        return require('./server')(options)
    },
    async deregister (container, options) {
        return container.resolvePlugin('arkx:delegate-api').stop()
    }
}
