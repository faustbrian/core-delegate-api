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
        const logger = container.resolvePlugin('logger')
        const server = await require('./server')(options)

        logger.info('[Delegate API] Let\'s Get It Started :fist:')

        return server
    },
    async deregister (container, options) {
        container.resolvePlugin('logger').info('[Delegate API] Stopping API :warning:')

        return container.resolvePlugin('arkx:delegate-api').stop()
    }
}
