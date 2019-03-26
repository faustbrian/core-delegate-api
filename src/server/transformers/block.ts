export function transform(entity) {
    return {
        id: entity.id,
        // version: Number(entity.version),
        // height: Number(entity.height),
        // previous: entity.previousentity,
        // forged: {
        //     reward: Number(entity.reward),
        //     fee: Number(entity.totalFee),
        //     total: Number(entity.reward) + Number(entity.totalFee),
        // },
        // payload: {
        //     hash: entity.payloadHash,
        //     length: Number(entity.payloadLength),
        // },
        // signature: entity.entitySignature,
        // transactions: Number(entity.numberOfTransactions),
        // timestamp: formatTimestamp(entity.timestamp),
    };
}
