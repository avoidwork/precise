import { hrtime } from "node:process";
import { BIG_INT_NEG_1, NOT_STARTED, NOT_STOPPED, STARTED, STOPPED } from "./constants.js";

/**
 * High-precision timer using process.hrtime.bigint()
 * @class
 */
export class Precise {
	/**
	 * Creates a new Precise timer instance
	 * @constructor
	 */
	constructor() {
		this.started = BIG_INT_NEG_1;
		this.stopped = BIG_INT_NEG_1;
	}

	/**
	 * Returns the time delta between start() and stop()
	 * @param {boolean} [ms=false] - If true, returns milliseconds instead of nanoseconds
	 * @returns {number} Time delta in nanoseconds or milliseconds
	 * @throws {Error} If timer has not been started or stopped
	 */
	diff(ms = false) {
		if (this.started === BIG_INT_NEG_1) {
			throw new Error(NOT_STARTED);
		}

		if (this.stopped === BIG_INT_NEG_1) {
			throw new Error(NOT_STOPPED);
		}

		let result = Number(this.stopped - this.started);

		if (ms) {
			result = Number((this.stopped - this.started) / 1000000n);
		}

		return result;
	}

	/**
	 * Resets the timer to its initial state
	 * @returns {Precise} Returns this for chaining
	 */
	reset() {
		this.started = BIG_INT_NEG_1;
		this.stopped = BIG_INT_NEG_1;

		return this;
	}

	/**
	 * Starts the timer
	 * @returns {Precise} Returns this for chaining
	 * @throws {Error} If timer has already been started
	 */
	start() {
		if (this.started > BIG_INT_NEG_1) {
			throw new Error(STARTED);
		}

		this.started = hrtime.bigint();

		return this;
	}

	/**
	 * Stops the timer
	 * @returns {Precise} Returns this for chaining
	 * @throws {Error} If timer has not been started or has already been stopped
	 */
	stop() {
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

/**
 * Factory function that creates a new Precise timer instance
 * @returns {Precise} New Precise instance
 */
export function precise() {
	return new Precise();
}
