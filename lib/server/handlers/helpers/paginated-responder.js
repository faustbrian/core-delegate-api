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
const transformData = require('./transformer')

module.exports = async (data, transformer) => {
    if (!data.rows || !data.count) {
        return Boom.notFound()
    }

    return {
        results: await transformData(data.rows, transformer),
        totalCount: data.count
    }
}
