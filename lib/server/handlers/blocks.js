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
const blockService = require('../../services/block')
const transactionService = require('../../services/transaction')

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
        const data = await blockService.all(request.params.delegate)

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
        const data = await blockService.findById(request.params.delegate, request.params.block)

        if (!data) {
            return Boom.notFound()
        }

        return { data }
    },
    options: {
        validate: {
            params: {
                delegate: Joi.string(),
                block: Joi.string()
            }
        }
    }
}

/**
 * @type {Object}
 */
exports.transactions = {
    /**
     * @param  {Hapi.Request} request
     * @param  {Hapi.Toolkit} h
     * @return {Hapi.Response}
     */
    async handler (request, h) {
        const data = await transactionService.all(request.params.delegate, request.params.block)

        if (!data) {
            return Boom.notFound()
        }

        return { data }
    },
    options: {
        validate: {
            params: {
                delegate: Joi.string(),
                block: Joi.string()
            }
        }
    }
}
