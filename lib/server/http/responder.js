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

module.exports = async (data, transformer) => {
    if (!data) {
        return Boom.notFound()
    }

    const transform = require(`../transformers/${transformer}`)

    let transformed
    if (Array.isArray(data)) {
        transformed = []

        for (let i = 0; i < data.length; i++) {
            transformed.push(await transform(data[i]))
        }
    } else {
        transformed = await transform(data)
    }

    return { data: transformed }
}
