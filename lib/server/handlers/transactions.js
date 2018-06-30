'use strict'

/**
 * This file is part of Ark Core - Delegate API.
 *
 * (c) ArkX <hello@arkx.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Joi = require('joi')

/**
 * @type {Object}
 */
exports.index = {
    /**
     * @param  {Hapi.Request} request
     * @param  {Hapi.Toolkit} h
     * @return {Hapi.Response}
     */
    async handler (request, h) {
        return {
            data: {}
        }
    },
    options: {
        validate: {
            query: {
                delegate: Joi.string()
            }
        }
    }
}

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
        return {
            data: {}
        }
    },
    options: {
        validate: {
            query: {
                delegate: Joi.string()
            }
        }
    }
}
