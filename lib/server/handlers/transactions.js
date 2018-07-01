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
const createPaginatedResponse = require('./helpers/paginated-responder')
const createPagination = require('./helpers/pagination')
const createResponse = require('./helpers/responder')
const transactionRepository = require('../../repositories/transaction')

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
        const data = await transactionRepository.all(request.app.delegate, createPagination(request))

        return createPaginatedResponse(data, 'transaction')
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
        const data = await transactionRepository.findById(request.app.delegate, request.params.transaction)

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
        const data = await transactionRepository.findBySender(request.app.delegate.publicKey, createPagination(request))

        return createPaginatedResponse(data, 'transaction')
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
        const data = await transactionRepository.findByRecipient(request.app.delegate.address, createPagination(request))

        return createPaginatedResponse(data, 'transaction')
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
exports.forged = {
    /**
     * @param  {Hapi.Request} request
     * @param  {Hapi.Toolkit} h
     * @return {Hapi.Response}
     */
    async handler (request, h) {
        const data = await transactionRepository.forged(request.app.delegate, createPagination(request))

        return createPaginatedResponse(data, 'transaction')
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
