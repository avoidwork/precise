import {hrtime} from "node:process";
import {hasStarted, hasStopped, notStarted, notStopped, BIG_INT_NEG_1} from "./constants.js";

export class Precise {
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

	reset () {
		this.started = BIG_INT_NEG_1;
		this.stopped = BIG_INT_NEG_1;

		return this;
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

export function precise () {
	return new Precise();
}
