'use strict'

/**
 * This file is part of Ark Core - Delegate API.
 *
 * (c) ArkX <hello@arkx.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

module.exports = voter => {
    return {
        address: voter.address,
        publicKey: voter.publicKey,
        balance: Number(voter.balance),
        isDelegate: !!voter.username
    }
}
