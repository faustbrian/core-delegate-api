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
const Joi = require('joi')
const delegateService = require('../../services/delegate')

/**
 * @type {Object}
 */
exports.show = {
    /**
     * @param  {Hapi.Request} request
     * @param  {Hapi.Toolkit} h
     * @return {Hapi.Response}
     */
    async handler (request, h) {
        const data = delegateService.findById(request.params.delegate)

        if (!data) {
            return Boom.notFound()
        }

        return { data }
    },
    options: {
        validate: {
            params: {
                delegate: Joi.string()
            }
        }
    }
}
