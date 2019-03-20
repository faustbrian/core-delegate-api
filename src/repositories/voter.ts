class VoterRepository {
    public all(delegate, parameters) {
        // const voters = database.walletManager.getLocalWallets().filter(item => {
        //     return item.vote === delegate.publicKey;
        // });
        // return {
        //     rows: _(voters)
        //         .slice(parameters.offset)
        //         .take(parameters.limit)
        //         .value(),
        //     count: voters.length,
        // };
    }

    public findById(delegate, id) {
        // const voters = this.all(delegate);
        // return voters.find(item => {
        //     const keys = _.pick(item, "address", "publicKey", "username");
        //     return Object.values(keys).includes(id);
        // });
    }
}

export const voterRepository = new VoterRepository();
