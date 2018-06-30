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
const transactionService = require('../../services/transaction')
const createResponse = require('../http/responder')

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
        const data = await transactionService.all(request.app.delegate)

        return createResponse(data, 'transaction')
    },
    options: {
        validate: {
            params: {
                delegate: Joi.string()
            },
            query: {
                limit: Joi.number().integer(),
                page: Joi.number().integer(),
                pagination: Joi.boolean()
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
        const data = await transactionService.findById(request.app.delegate, request.params.transaction)

        return createResponse(data, 'transaction')
    },
    options: {
        validate: {
            params: {
                delegate: Joi.string(),
                transaction: Joi.string()
            }
        }
    }
}

/**
 * @type {Object}
 */
exports.sent = {
    /**
     * @param  {Hapi.Request} request
     * @param  {Hapi.Toolkit} h
     * @return {Hapi.Response}
     */
    async handler (request, h) {
        const data = await transactionService.findBySender(request.app.delegate.publicKey)

        return createResponse(data, 'transaction')
    },
    options: {
        validate: {
            params: {
                delegate: Joi.string()
            },
            query: {
                limit: Joi.number().integer(),
                page: Joi.number().integer(),
                pagination: Joi.boolean()
            }
        }
    }
}

/**
 * @type {Object}
 */
exports.received = {
    /**
     * @param  {Hapi.Request} request
     * @param  {Hapi.Toolkit} h
     * @return {Hapi.Response}
     */
    async handler (request, h) {
        const data = await transactionService.findByRecipient(request.app.delegate.address)

        return createResponse(data, 'transaction')
    },
    options: {
        validate: {
            params: {
                delegate: Joi.string()
            },
            query: {
                limit: Joi.number().integer(),
                page: Joi.number().integer(),
                pagination: Joi.boolean()
            }
        }
    }
}
