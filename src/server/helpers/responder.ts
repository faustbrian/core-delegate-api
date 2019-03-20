import Boom from "boom";

module.exports = async (data, transformer) => {
    if (!data) {
        return Boom.notFound();
    }

    return {
        // data: await transformData(data, transformer),
    };
};
