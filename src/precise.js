import {hasStarted, hasStopped, notStarted, notStopped} from "./constants.js";

export class Precise {
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

export function precise () {
	return new Precise();
}
