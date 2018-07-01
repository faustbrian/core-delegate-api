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
const blockRepository = require('../../repositories/block')
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
        const data = await blockRepository.all(request.app.delegate, createPagination(request))

        return createPaginatedResponse(data, 'block')
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
exports.latest = {
    /**
     * @param  {Hapi.Request} request
     * @param  {Hapi.Toolkit} h
     * @return {Hapi.Response}
     */
    async handler (request, h) {
        const data = await blockRepository.latest(request.app.delegate)

        return createResponse(data, 'block')
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
        const data = await blockRepository.findById(request.app.delegate, request.params.block)

        return createResponse(data, 'block')
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
        const data = await transactionRepository.all(request.app.delegate, request.params.block, createPagination(request))

        return createPaginatedResponse(data, 'transaction')
    },
    options: {
        validate: {
            params: {
                delegate: Joi.string(),
                block: Joi.string()
            },
            query: {
                limit: Joi.number().integer(),
                page: Joi.number().integer(),
                pagination: Joi.boolean()
            }
        }
    }
}
