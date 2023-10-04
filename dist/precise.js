/**
 * precise
 *
 * @copyright 2023 Jason Mulligan <jason.mulligan@avoidwork.com>
 * @license BSD-3-Clause
 * @version 3.1.0
 */
import {hrtime}from'node:process';const hasStarted = "Timer has been started";
const hasStopped = "Timer has been stopped";
const notStarted = "Timer has not been started";
const notStopped = "Timer has not been stopped";
const BIG_INT_NEG_1 = BigInt(-1);class Precise {
	constructor () {
		this.started = BIG_INT_NEG_1;
		this.stopped = BIG_INT_NEG_1;
	}

	diff (ms = false) {
		if (this.stopped === BIG_INT_NEG_1) {
			throw new Error(notStopped);
		}

		let result = Number(this.stopped - this.started);

		if (ms) {
			result = parseInt(result / 1e6, 10);
		}

		return result;
	}

	start () {
		if (this.started > BIG_INT_NEG_1) {
			throw new Error(hasStarted);
		}

		this.started = hrtime.bigint();

		return this;
	}

	stop () {
		if (this.started === BIG_INT_NEG_1) {
			throw new Error(notStarted);
		}

		if (this.stopped > BIG_INT_NEG_1) {
			throw new Error(hasStopped);
		}

		this.stopped = hrtime.bigint();

		return this;
	}
}

function precise () {
	return new Precise();
}export{Precise,precise};