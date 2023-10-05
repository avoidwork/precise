/**
 * precise
 *
 * @copyright 2023 Jason Mulligan <jason.mulligan@avoidwork.com>
 * @license BSD-3-Clause
 * @version 4.0.1
 */
'use strict';

var node_process = require('node:process');

const hasStarted = "Timer has been started";
const hasStopped = "Timer has been stopped";
const notStarted = "Timer has not been started";
const notStopped = "Timer has not been stopped";
const BIG_INT_NEG_1 = BigInt(-1);

class Precise {
	constructor () {
		this.started = BIG_INT_NEG_1;
		this.stopped = BIG_INT_NEG_1;
	}

	diff (ms = false) {
		if (this.started === BIG_INT_NEG_1) {
			throw new Error(notStarted);
		}

		if (this.stopped === BIG_INT_NEG_1) {
			throw new Error(notStopped);
		}

		let result = Number(this.stopped - this.started);

		if (ms) {
			result = parseInt(result / 1e6, 10);
		}

		return result;
	}

	reset () {
		this.started = BIG_INT_NEG_1;
		this.stopped = BIG_INT_NEG_1;

		return this;
	}

	start () {
		if (this.started > BIG_INT_NEG_1) {
			throw new Error(hasStarted);
		}

		this.started = node_process.hrtime.bigint();

		return this;
	}

	stop () {
		if (this.started === BIG_INT_NEG_1) {
			throw new Error(notStarted);
		}

		if (this.stopped > BIG_INT_NEG_1) {
			throw new Error(hasStopped);
		}

		this.stopped = node_process.hrtime.bigint();

		return this;
	}
}

function precise () {
	return new Precise();
}

exports.Precise = Precise;
exports.precise = precise;
