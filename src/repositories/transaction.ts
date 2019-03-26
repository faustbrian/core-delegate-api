import { blockRepository } from "./block";
import { Repository } from "./repository";
import { voterRepository } from "./voter";

class TransactionRepository extends Repository {
    public async all(delegate, parameters) {
        parameters.sender_public_key = delegate.publicKey;
        parameters.recipient_id = delegate.address;

        return this.database.transactionsBusinessRepository.findAll(parameters);
    }

    public async findById(delegate, id) {
        const transactions = await this.database.transactionsBusinessRepository.findAll({
            id,
            sender_public_key: delegate.publicKey,
            recipient_id: delegate.address,
        });

        return transactions.rows[0];
    }

    public async findByBlock(delegate, id, parameters) {
        return this.database.transactionsBusinessRepository.findAll({
            block_id: id,
            sender_public_key: delegate.publicKey,
            recipient_id: delegate.address,
            ...parameters,
        });
    }

    public async findByWallet(delegate, id, parameters) {
        const wallet = voterRepository.findById(delegate, id);

        return this.database.transactionsBusinessRepository.findAll({
            sender_public_key: wallet.publicKey,
            recipient_id: wallet.address,
            ...parameters,
        });
    }

    public async findBySender(publicKey, parameters) {
        return this.database.transactionsBusinessRepository.findAll({
            sender_public_key: publicKey,
            ...parameters,
        });
    }

    public async findByRecipient(address, parameters) {
        return this.database.transactionsBusinessRepository.findAll({
            recipient_id: address,
            ...parameters,
        });
    }

    public async forged(delegate, parameters) {
        const ids = await blockRepository.ids(delegate.publicKey);

        const transactions = await this.database.transactionsBusinessRepository.findAll({
            block_id: ids,
            ...parameters,
        });

        return transactions;
    }
}

export const transactionRepository = new TransactionRepository();
