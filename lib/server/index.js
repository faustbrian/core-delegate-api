'use strict'

/**
 * This file is part of Ark Core - Delegate API.
 *
 * (c) ArkX <hello@arkx.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Hapi = require('hapi')
const logger = require('@arkecosystem/core-container').resolvePlugin('logger')

/**
 * Creates a new hapi.js server.
 * @param  {Object} options
 * @return {Hapi.Server}
 */
module.exports = async (options) => {
    const baseConfig = {
        host: options.server.host,
        port: options.server.port,
        routes: { cors: true }
    }

    const server = new Hapi.Server(baseConfig)

    await server.register({
        plugin: require('./plugins/whitelist'),
        options: options.plugins.whitelist
    })

    await server.register(require('./plugins/delegate-picker'))
    await server.register(require('./routes'))

    try {
        await server.start()

        logger.info(`[Delegate API] API listening on ${server.info.uri} :mountain:`)

        return server
    } catch (error) {
        logger.info(`[Delegate API] ${error.message} :interrobang:`)

        process.exit(1)
    }
}
