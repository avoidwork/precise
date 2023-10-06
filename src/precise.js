import {hrtime} from "node:process";
import {BIG_INT_NEG_1, NOT_STARTED, NOT_STOPPED, STARTED, STOPPED} from "./constants.js";

export class Precise {
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

export function precise () {
	return new Precise();
}
