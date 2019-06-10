# Ark Core - Delegate API

[![Latest Version](https://badgen.net/npm/v/@faustbrian/core-delegate-api)](https://www.npmjs.com/package/@faustbrian/core-delegate-api) [![Greenkeeper badge](https://badges.greenkeeper.io/arkx-dev/core-delegate-api.svg)](https://greenkeeper.io/)

## Installation

### Clone

```bash
yarn global add @faustbrian/core-delegate-api
```

## Endpoints

All endpoints use the same database repositories as the `@arkecosystem/core-api` package so most of the same parameters could be used if enabled in the validation schemas.

### `/{delegate}`

Retrieve wallet information about a delegate.

### `/{delegate}/blocks` (**Supports Pagination**)

Retrieve blocks forged by the given delegate.

### `/{delegate}/blocks/latest`

Retrieve the last forged block by the given delegate.

### `/{delegate}/blocks/{block}`

Retrieve a specific block forged by the given delegate.

### `/{delegate}/blocks/{block}/transactions` (**Supports Pagination**)

Retrieve transaction forged in a specific block by the given delegate.

### `/{delegate}/transactions` (**Supports Pagination**)

Retrieve transactions that were sent or received by the given delegate.

### `/{delegate}/transactions/{transaction}`

Retrieve a transaction that was sent or received by the given delegate.

### `/{delegate}/transactions/sent` (**Supports Pagination**)

Retrieve transactions that were sent by the given delegate.

### `/{delegate}/transactions/received` (**Supports Pagination**)

Retrieve transactions that were received by the given delegate.

### `/{delegate}/transactions/forged` (**Supports Pagination**)

Retrieve transactions that were forged by the given delegate.

### `/{delegate}/voters` (**Supports Pagination**)

Retrieve voters for the given delegate.

### `/{delegate}/voters/{voter}`

Retrieve a voter for the given delegate.

### `/{delegate}/voters/{voter}/transactions` (**Supports Pagination**)

Retrieve transactions that were sent or received by the voter of the given delegate.

### `/{delegate}/voters/{voter}/transactions/sent` (**Supports Pagination**)

Retrieve transactions that were sent by the voter of the given delegate.

### `/{delegate}/voters/{voter}/transactions/received` (**Supports Pagination**)

Retrieve transactions that were received by the voter of the given delegate.

### `/{delegate}/voters/balances/address`

Retrieve voters as key-value pairs of `address:balance` of the given delegate.

### `/{delegate}/voters/balances/public-key`

Retrieve voters as key-value pairs of `publicKey:balance` of the given delegate.

### `/transactions`

Push transactions to the transaction pool without additional validation.

## Pagination & Sorting

Endpoints that are marked as **Supports Pagination** can be sorted and paginated via `orderBy`, `offset` and `limit`.

## Security

If you discover a security vulnerability within this package, please send an e-mail to hello@basecode.sh. All security vulnerabilities will be promptly addressed.

## Credits

-   [Brian Faust](https://github.com/faustbrian)
-   [All Contributors](../../contributors)

## License

[MIT](LICENSE) © [Brian Faust](https://basecode.sh)
