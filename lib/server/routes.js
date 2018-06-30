'use strict'

/**
 * This file is part of Ark Core - Delegate API.
 *
 * (c) ArkX <hello@arkx.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const blocks = require('./handlers/blocks')
const transactions = require('./handlers/transactions')
const voters = require('./handlers/voters')

/**
 * Register search routes.
 * @param  {Hapi.Server} server
 * @param  {Object} options
 * @return {void}
 */
const register = async (server, options) => {
    const routes = [
        { method: 'GET', path: '/{delegate}/blocks', ...blocks.index },
        { method: 'GET', path: '/{delegate}/blocks/{block}', ...blocks.show },
        { method: 'GET', path: '/{delegate}/blocks/{block}/transactions', ...blocks.transactions },

        { method: 'GET', path: '/{delegate}/transactions', ...transactions.index },
        { method: 'GET', path: '/{delegate}/transactions/{transaction}', ...transactions.show },

        { method: 'GET', path: '/{delegate}/voters', ...voters.index },
        { method: 'GET', path: '/{delegate}/voters/{voter}', ...voters.show },
        { method: 'GET', path: '/{delegate}/voters/{voter}/transactions', ...voters.transactions }
    ]

    server.route(routes)
}

/**
 * The struct used by hapi.js.
 * @type {Object}
 */
exports.plugin = {
    name: 'Delegate API Routes',
    version: '0.1.0',
    register
}
