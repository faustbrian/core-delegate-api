import pick from "lodash.pick";
import { Repository } from "./repository";

class VoterRepository extends Repository {
	public all(delegate, parameters?) {
		let voters = this.database.walletManager.allByAddress().filter(item => item.vote === delegate.publicKey);

		if (parameters && parameters.offset && parameters.limit) {
			voters = voters.slice(parameters.offset, parameters.offset + parameters.limit);
		}

		return {
			rows: voters,
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
