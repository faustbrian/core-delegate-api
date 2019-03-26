import pick from "lodash.pick";
import { Repository } from "./repository";

class VoterRepository extends Repository {
	public all(delegate, parameters) {
		const voters = this.database.walletManager.allByAddress().filter(item => item.vote === delegate.publicKey);

		let rows = voters;
		if (parameters.offset && parameters.limit) {
			rows = rows.slice(parameters.offset, parameters.offset + parameters.limit);
		}

		return {
			rows,
			count: voters.length,
		};
	}

	public findById(delegate, id) {
		const voters = this.all(delegate, {});

		return voters.rows.find(item => {
			const keys = pick(item, "address", "publicKey", "username");

			return Object.values(keys).includes(id);
		});
	}
}

export const voterRepository = new VoterRepository();
