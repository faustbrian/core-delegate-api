import pick from "lodash.pick";
import { Repository } from "./repository";

class DelegateRepository extends Repository {
    public findById(id) {
        const delegates = this.database.walletManager.allByUsername();

        return delegates.find(item => {
            const keys = pick(item, "address", "publicKey", "username");

            return Object.values(keys).includes(id);
        });
    }
}

export const delegateRepository = new DelegateRepository();
