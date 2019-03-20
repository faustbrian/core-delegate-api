import Boom from "boom";

module.exports = async (data, transformer) => {
    if (!data.rows || !data.count) {
        return Boom.notFound();
    }

    return {
        // results: await transformData(data.rows, transformer),
        totalCount: data.count,
    };
};
