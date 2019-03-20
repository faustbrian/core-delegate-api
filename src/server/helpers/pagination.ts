module.exports = request => {
    return {
        offset: (request.query.page - 1) * request.query.limit,
        limit: request.query.limit
    }
}
