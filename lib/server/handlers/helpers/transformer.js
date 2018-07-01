'use strict'

/**
 * This file is part of Ark Core - Delegate API.
 *
 * (c) ArkX <hello@arkx.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

module.exports = async (data, transformer) => {
    const transform = require(`../../transformers/${transformer}`)

    if (Array.isArray(data)) {
        const transformed = []

        for (let i = 0; i < data.length; i++) {
            transformed.push(await transform(data[i]))
        }

        return transformed
    } else {
        return transform(data)
    }
}
