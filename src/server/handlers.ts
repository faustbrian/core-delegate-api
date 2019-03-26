import { app } from "@arkecosystem/core-container";
import { TransactionPool } from "@arkecosystem/core-transaction-pool";
import { Transaction } from "@arkecosystem/crypto";
import Boom from "boom"; // FIXME: why does this cause export const to fail if missing?
import Joi from "joi";
import { blockRepository } from "../repositories/block";
import { transactionRepository } from "../repositories/transaction";
import { voterRepository } from "../repositories/voter";
import { createPaginatedResponse, createPagination, createResponse } from "./helpers";

export const getDelegate = {
	method: "GET",
	path: "/{delegate}",
	async handler(request) {
		return createResponse(request.app.delegate, "delegate");
	},
	options: {
		validate: {
			params: {
				delegate: Joi.string(),
			},
		},
	},
};

export const getBlocks = {
	method: "GET",
	path: "/{delegate}/blocks",
	async handler(request) {
		const data = await blockRepository.all(request.app.delegate, createPagination(request));

		return createPaginatedResponse(data, "block");
	},
	options: {
		validate: {
			params: {
				delegate: Joi.string(),
			},
			query: {
				limit: Joi.number().integer(),
				page: Joi.number().integer(),
				pagination: Joi.boolean(),
			},
		},
	},
};

export const getLatestBlock = {
	method: "GET",
	path: "/{delegate}/blocks/latest",
	async handler(request) {
		const data = await blockRepository.lastBlock(request.app.delegate);

		return createResponse(data, "block");
	},
	options: {
		validate: {
			params: {
				delegate: Joi.string(),
			},
		},
	},
};

export const getBlock = {
	method: "GET",
	path: "/{delegate}/blocks/{block}",
	async handler(request) {
		const data = await blockRepository.findById(request.app.delegate, request.params.block);

		return createResponse(data, "block");
	},
	options: {
		validate: {
			params: {
				delegate: Joi.string(),
				block: Joi.string(),
			},
		},
	},
};

export const getBlockTransactions = {
	method: "GET",
	path: "/{delegate}/blocks/{block}/transactions",
	async handler(request) {
		const data = await transactionRepository.findByBlock(
			request.app.delegate,
			request.params.block,
			createPagination(request),
		);

		return createPaginatedResponse(data, "transaction");
	},
	options: {
		validate: {
			params: {
				delegate: Joi.string(),
				block: Joi.string(),
			},
			query: {
				limit: Joi.number().integer(),
				page: Joi.number().integer(),
				pagination: Joi.boolean(),
			},
		},
	},
};

export const postTransactions = {
	method: "POST",
	path: "/{delegate}/transactions",
	async handler(request, h) {
		const transactions = request.payload.transactions.map(transaction => Transaction.fromData(transaction));

		app.resolvePlugin<TransactionPool>("transaction-pool").addTransactions(transactions);

		return h.code(204);
	},
	options: {
		validate: {
			payload: {
				transactions: Joi.array(),
			},
		},
	},
};

export const getTransactions = {
	method: "GET",
	path: "/{delegate}/transactions",
	async handler(request) {
		const data = await transactionRepository.all(request.app.delegate, createPagination(request));

		return createPaginatedResponse(data, "transaction");
	},
	options: {
		validate: {
			params: {
				delegate: Joi.string(),
			},
			query: {
				limit: Joi.number().integer(),
				page: Joi.number().integer(),
				pagination: Joi.boolean(),
			},
		},
	},
};

export const getTransaction = {
	method: "GET",
	path: "/{delegate}/transactions/{transaction}",
	async handler(request) {
		const data = await transactionRepository.findById(request.app.delegate, request.params.transaction);

		return createResponse(data, "transaction");
	},
	options: {
		validate: {
			params: {
				delegate: Joi.string(),
				transaction: Joi.string(),
			},
		},
	},
};

export const getTransactionsSent = {
	method: "GET",
	path: "/{delegate}/transactions/sent",
	async handler(request) {
		const data = await transactionRepository.findBySender(
			request.app.delegate.publicKey,
			createPagination(request),
		);

		return createPaginatedResponse(data, "transaction");
	},
	options: {
		validate: {
			params: {
				delegate: Joi.string(),
			},
			query: {
				limit: Joi.number().integer(),
				page: Joi.number().integer(),
				pagination: Joi.boolean(),
			},
		},
	},
};

export const getTransactionsReceived = {
	method: "GET",
	path: "/{delegate}/transactions/received",
	async handler(request) {
		const data = await transactionRepository.findByRecipient(
			request.app.delegate.address,
			createPagination(request),
		);

		return createPaginatedResponse(data, "transaction");
	},
	options: {
		validate: {
			params: {
				delegate: Joi.string(),
			},
			query: {
				limit: Joi.number().integer(),
				page: Joi.number().integer(),
				pagination: Joi.boolean(),
			},
		},
	},
};

export const getTransactionsForged = {
	method: "GET",
	path: "/{delegate}/transactions/forged",
	async handler(request) {
		const data = await transactionRepository.forged(request.app.delegate, createPagination(request));

		return createPaginatedResponse(data, "transaction");
	},
	options: {
		validate: {
			params: {
				delegate: Joi.string(),
			},
			query: {
				limit: Joi.number().integer(),
				page: Joi.number().integer(),
				pagination: Joi.boolean(),
			},
		},
	},
};

export const getVoters = {
	method: "GET",
	path: "/{delegate}/voters",
	async handler(request) {
		const data = voterRepository.all(request.app.delegate, createPagination(request));

		return createPaginatedResponse(data, "voter");
	},
	options: {
		validate: {
			params: {
				delegate: Joi.string(),
			},
		},
	},
};

export const getVoter = {
	method: "GET",
	path: "/{delegate}/voters/{voter}",
	async handler(request) {
		const data = voterRepository.findById(request.app.delegate, request.params.voter);

		return createResponse(data, "voter");
	},
	options: {
		validate: {
			params: {
				delegate: Joi.string(),
				voter: Joi.string(),
			},
		},
	},
};

export const getVoterTransactions = {
	method: "GET",
	path: "/{delegate}/voters/{voter}/transactions",
	async handler(request) {
		const data = await transactionRepository.findByWallet(
			request.app.delegate,
			request.params.voter,
			createPagination(request),
		);

		return createPaginatedResponse(data, "transaction");
	},
	options: {
		validate: {
			params: {
				delegate: Joi.string(),
				voter: Joi.string(),
			},
			query: {
				limit: Joi.number().integer(),
				page: Joi.number().integer(),
				pagination: Joi.boolean(),
			},
		},
	},
};

export const getVoterTransactionsSent = {
	method: "GET",
	path: "/{delegate}/voters/{voter}/transactions/sent",
	async handler(request) {
		const data = await transactionRepository.findBySender(request.params.voter, createPagination(request));

		return createPaginatedResponse(data, "transaction");
	},
	options: {
		validate: {
			params: {
				delegate: Joi.string(),
				voter: Joi.string(),
			},
			query: {
				limit: Joi.number().integer(),
				page: Joi.number().integer(),
				pagination: Joi.boolean(),
			},
		},
	},
};

export const getVoterTransactionsReceived = {
	method: "GET",
	path: "/{delegate}/voters/{voter}/transactions/received",
	async handler(request) {
		const data = await transactionRepository.findByRecipient(request.params.voter, createPagination(request));

		return createPaginatedResponse(data, "transaction");
	},
	options: {
		validate: {
			params: {
				delegate: Joi.string(),
				voter: Joi.string(),
			},
			query: {
				limit: Joi.number().integer(),
				page: Joi.number().integer(),
				pagination: Joi.boolean(),
			},
		},
	},
};
