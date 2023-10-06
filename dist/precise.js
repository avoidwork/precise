/**
 * precise
 *
 * @copyright 2023 Jason Mulligan <jason.mulligan@avoidwork.com>
 * @license BSD-3-Clause
 * @version 4.0.2
 */
import {hrtime}from'node:process';const STARTED = "Timer has been started";
const STOPPED = "Timer has been stopped";
const NOT_STARTED = "Timer has not been started";
const NOT_STOPPED = "Timer has not been stopped";
const BIG_INT_NEG_1 = BigInt(-1);class Precise {
	constructor () {
		this.started = BIG_INT_NEG_1;
		this.stopped = BIG_INT_NEG_1;
	}

	diff (ms = false) {
		if (this.started === BIG_INT_NEG_1) {
			throw new Error(NOT_STARTED);
		}

		if (this.stopped === BIG_INT_NEG_1) {
			throw new Error(NOT_STOPPED);
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
			throw new Error(STARTED);
		}

		this.started = hrtime.bigint();

		return this;
	}

	stop () {
		if (this.started === BIG_INT_NEG_1) {
			throw new Error(NOT_STARTED);
		}

		if (this.stopped > BIG_INT_NEG_1) {
			throw new Error(STOPPED);
		}

		this.stopped = hrtime.bigint();

		return this;
	}
}

function precise () {
	return new Precise();
}export{Precise,precise};