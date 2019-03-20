class DelegateRepository {
    public findById(id) {
        // const delegates = database.walletManager.allByUsername();
        // return delegates.find(item => {
        //     const keys = pick(item, "address", "publicKey", "username");
        //     return Object.values(keys).includes(id);
        // });

        return {};
    }
}

export const delegateRepository = new DelegateRepository();
