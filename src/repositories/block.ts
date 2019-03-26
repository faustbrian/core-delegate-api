import { Repository } from "./repository";

class BlockRepository extends Repository {
    public async all(delegate, parameters) {
        parameters.generator_public_key = delegate.publicKey;

        return this.database.blocksBusinessRepository.findAll(parameters);
    }

    public async findById(delegate, id) {
        const blocks = await this.database.blocksBusinessRepository.findAll({
            generator_public_key: delegate.publicKey,
            id,
        });

        return blocks.rows[0];
    }

    public async ids(delegate) {
        const blocks = await this.database.blocksBusinessRepository.findAll({
            generator_public_key: delegate.publicKey,
        });

        return blocks.rows.map(row => row.id);
    }

    public async lastBlock(delegate) {
        const blocks = await this.database.blocksBusinessRepository.findAll({
            generator_public_key: delegate.publicKey,
            orderBy: "height:desc",
        });

        return blocks.rows[0];
    }
}

export const blockRepository = new BlockRepository();
