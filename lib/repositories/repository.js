'use strict'

/**
 * This file is part of Ark Core - Delegate API.
 *
 * (c) ArkX <hello@arkx.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const container = require('@arkecosystem/core-container')
const database = container.resolvePlugin('database')

module.exports = class Repository {
  constructor () {
    this.model = this.getModel()
    this.query = this.model.query()
  }

  async _find (query) {
    return database.query.oneOrNone(query.toQuery())
  }

  async _findMany (query) {
    return database.query.manyOrNone(query.toQuery())
  }

  async _findManyWithCount (selectQuery, countQuery, { limit, offset, orderBy }) {
    const { count } = await this._find(countQuery)

    selectQuery
      // .order(this.query[orderBy[0]][orderBy[1]])
      .offset(offset)
      .limit(limit)

    return {
      rows: await this._findMany(selectQuery),
      count: +count
    }
  }

  _makeCountQuery () {
    return this.query
      .select('count(*) AS count')
      .from(this.query)
  }

  _makeEstimateQuery () {
    return this.query
      .select('count(*) AS count')
      .from(`${this.model.getTable()} TABLESAMPLE SYSTEM (100)`)
  }
}
