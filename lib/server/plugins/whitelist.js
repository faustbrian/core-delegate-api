'use strict'

/**
 * This file is part of Ark Core - Delegate API.
 *
 * (c) ArkX <hello@arkx.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Boom = require('boom')
const requestIp = require('request-ip')
const mm = require('micromatch')
const container = require('@arkecosystem/core-container')

/**
 * The register method used by hapi.js.
 * @param  {Hapi.Server} server
 * @param  {Object} options
 * @return {void}
 */
const register = async (server, options) => {
    server.ext({
        type: 'onRequest',
        method: async (request, h) => {
            const address = requestIp.getClientIp(request)

            for (let i = 0; i < options.whitelist.length; i++) {
                if (mm.isMatch(address, options.whitelist[i])) {
                    return h.continue
                }
            }

            container
                .resolvePlugin('logger')
                .warn(`[Delegate API] ${address} tried to access the API without being whitelisted`)

            return Boom.forbidden()
        }
    })
}

/**
 * The struct used by hapi.js.
 * @type {Object}
 */
exports.plugin = {
    name: 'core-delegate-api-whitelist',
    version: '0.1.0',
    register
}
