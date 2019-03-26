export function transform(entity) {
	return {
		address: entity.address,
		publicKey: entity.publicKey,
		balance: entity.balance,
		isDelegate: !!entity.username,
	};
}
