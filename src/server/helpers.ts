import Boom from "boom";

async function transformData(data, transformer) {
    const { transform } = require(`./transformers/${transformer}`);

    if (Array.isArray(data)) {
        const transformed = [];

        for (const item of data) {
            transformed.push(await transform(item));
        }

        return transformed;
    } else {
        return transform(data);
    }
}

export async function createResponse(data, transformer) {
    if (!data) {
        return Boom.notFound();
    }

    return {
        data: await transformData(data, transformer),
    };
}

export function createPagination(request) {
    return {
        offset: (request.query.page - 1) * request.query.limit,
        limit: request.query.limit,
    };
}

export async function createPaginatedResponse(data, transformer) {
    if (!data.rows || !data.count) {
        return Boom.notFound();
    }

    return {
        results: await transformData(data.rows, transformer),
        totalCount: data.count,
    };
}
