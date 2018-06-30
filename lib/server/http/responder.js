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

module.exports = (data, transformer) => {
    if (!data) {
        return Boom.notFound()
    }

    const transform = require(`../transformers/${transformer}`)

    return Array.isArray(data)
        ? { data: data.map(item => transform(item)) }
        : { data: transform(data) }
}
