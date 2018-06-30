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
        const data = await transactionService.all(request.params.delegate)

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
        const data = await transactionService.findById(request.params.delegate, request.params.transaction)

        if (!data) {
            return Boom.notFound()
        }

        return { data }
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
        const delegate = delegateService.findById(request.params.delegate)

        if (!delegate) {
            return Boom.notFound()
        }

        const data = await transactionService.findBySender(delegate.publicKey)

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
exports.received = {
    /**
     * @param  {Hapi.Request} request
     * @param  {Hapi.Toolkit} h
     * @return {Hapi.Response}
     */
    async handler (request, h) {
        const delegate = delegateService.findById(request.params.delegate)

        if (!delegate) {
            return Boom.notFound()
        }

        const data = await transactionService.findByRecipient(delegate.address)

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
