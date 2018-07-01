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
const delegateRepository = require('../../repositories/delegate')

/**
 * The register method used by hapi.js.
 * @param  {Hapi.Server} server
 * @param  {Object} options
 * @return {void}
 */
const register = async (server, options) => {
    server.ext({
        type: 'onPreAuth',
        async method (request, h) {
            const delegate = delegateRepository.findById(request.params.delegate)

            if (!delegate) {
                return Boom.notFound()
            }

            request.app.delegate = delegate

            return h.continue
        }
    })
}

/**
 * The struct used by hapi.js.
 * @type {Object}
 */
exports.plugin = {
    name: 'core-delegate-picker',
    version: '0.1.0',
    register
}
