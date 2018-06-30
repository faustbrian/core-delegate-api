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
const voterService = require('../../services/voter')
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
        const data = voterService.all(request.app.delegate)

        return createResponse(data, 'voter')
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
        const data = voterService.findById(request.app.delegate, request.params.id)

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
        const data = transactionService.findByWallet(request.params.id)

        return createResponse(data, 'transaction')
    },
    options: {
        validate: {
            params: {
                id: Joi.string()
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
        const data = transactionService.findBySender(request.params.id)

        return createResponse(data, 'transaction')
    },
    options: {
        validate: {
            params: {
                id: Joi.string()
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
        const data = transactionService.findByRecipient(request.params.id)

        return createResponse(data, 'transaction')
    },
    options: {
        validate: {
            params: {
                id: Joi.string()
            }
        }
    }
}
