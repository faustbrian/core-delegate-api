import { crypto, Transaction } from "@arkecosystem/crypto";

// const container = require('@arkecosystem/core-container')
// const blockchain = container.resolvePlugin('blockchain')
// const config = container.resolvePlugin('config')

// const blockRepository = require('../../repositories/block')
// const formatTimestamp = require('./helpers/format-timestamp')

export function transform(entity) {
	const { data } = Transaction.fromHex(entity.serialized.toString("hex"));

	// const block = await blockRepository._find(blockRepository.query
	//     .select()
	//     .from(blockRepository.query)
	//     .where(blockRepository.query.id.equals(entity.blockId)))

	return {
		id: data.id,
		blockId: entity.blockId,
		// type: Number(data.type),
		// amount: Number(data.amount),
		// fee: Number(data.fee),
		// sender: crypto.getAddress(data.senderPublicKey, config.network.pubKeyHash),
		// recipient: data.recipientId,
		// signature: data.signature,
		// vendorField: data.vendorField,
		// asset: data.asset,
		// confirmations: block ? blockchain.getLastBlock().data.height - block.height : 0,
		// timestamp: formatTimestamp(data.timestamp),
		// serialized: entity.serialized.toString('hex')
	};
}
