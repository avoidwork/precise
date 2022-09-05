/**
 * precise
 *
 * @copyright 2022 Jason Mulligan <jason.mulligan@avoidwork.com>
 * @license BSD-3-Clause
 * @version 2.0.0
 */
'use strict';Object.defineProperty(exports,'__esModule',{value:true});const hasStarted = "Timer has been started";
const hasStopped = "Timer has been stopped";
const notStarted = "Timer has not been started";
const notStopped = "Timer has not been stopped";class Precise {
	constructor () {
		this.started = [];
		this.stopped = [];
	}

	diff (ms = false) {
		if (this.stopped.length === 0) {
			throw new Error(notStopped);
		}

		let result = this.stopped[0] * 1e9 + this.stopped[1];

		if (ms) {
			result = parseInt(result / 1e6, 10);
		}

		return result;
	}

	start () {
		if (this.started.length > 0) {
			throw new Error(hasStarted);
		}

		this.started = process.hrtime();

		return this;
	}

	stop () {
		if (this.started.length === 0) {
			throw new Error(notStarted);
		}

		if (this.stopped.length > 0) {
			throw new Error(hasStopped);
		}

		this.stopped = process.hrtime(this.started);

		return this;
	}
}

function precise () {
	return new Precise();
}exports.precise=precise;