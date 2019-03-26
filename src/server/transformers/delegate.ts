export function transform(entity) {
    return {
        username: entity.username,
        address: entity.address,
        publicKey: entity.publicKey,
        votes: entity.voteBalance,
        rank: entity.rate,
    };
}
