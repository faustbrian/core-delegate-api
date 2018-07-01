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
const voterRepository = require('../../repositories/voter')
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
        const data = voterRepository.all(request.app.delegate, createPagination(request))

        return createPaginatedResponse(data, 'voter')
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
        const data = voterRepository.findById(request.app.delegate, request.params.id)

        return createResponse(data, 'voter')
    },
    options: {
        validate: {
            params: {
                delegate: Joi.string(),
                id: Joi.string()
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
        const data = transactionRepository.findByWallet(request.params.id, createPagination(request))

        return createPaginatedResponse(data, 'transaction')
    },
    options: {
        validate: {
            params: {
                id: Joi.string()
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
exports.transactionsSent = {
    /**
     * @param  {Hapi.Request} request
     * @param  {Hapi.Toolkit} h
     * @return {Hapi.Response}
     */
    async handler (request, h) {
        const data = transactionRepository.findBySender(request.params.id, createPagination(request))

        return createPaginatedResponse(data, 'transaction')
    },
    options: {
        validate: {
            params: {
                id: Joi.string()
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
exports.transactionsReceived = {
    /**
     * @param  {Hapi.Request} request
     * @param  {Hapi.Toolkit} h
     * @return {Hapi.Response}
     */
    async handler (request, h) {
        const data = transactionRepository.findByRecipient(request.params.id, createPagination(request))

        return createPaginatedResponse(data, 'transaction')
    },
    options: {
        validate: {
            params: {
                id: Joi.string()
            },
            query: {
                limit: Joi.number().integer(),
                page: Joi.number().integer(),
                pagination: Joi.boolean()
            }
        }
    }
}
