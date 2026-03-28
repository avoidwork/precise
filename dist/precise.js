/**
 * precise
 *
 * @copyright 2026 Jason Mulligan <jason.mulligan@avoidwork.com>
 * @license BSD-3-Clause
 * @version 4.0.3
 */
import {hrtime}from'node:process';const STARTED = "Timer has been started";

/**
 * Error message: Timer has already been stopped
 */
const STOPPED = "Timer has been stopped";

/**
 * Error message: Timer has not been started
 */
const NOT_STARTED = "Timer has not been started";

/**
 * Error message: Timer has not been stopped
 */
const NOT_STOPPED = "Timer has not been stopped";

/**
 * Sentinel value indicating timer has not started/stopped
 */
const BIG_INT_NEG_1 = BigInt(-1);/**
 * High-precision timer using process.hrtime.bigint()
 * @class
 */
class Precise {
	#started;
	#stopped;
	#delta;

	/**
	 * Creates a new Precise timer instance
	 * @constructor
	 */
	constructor() {
		this.#started = BIG_INT_NEG_1;
		this.#stopped = BIG_INT_NEG_1;
		this.#delta = BIG_INT_NEG_1;
	}

	/**
	 * Returns the time delta between start() and stop()
	 * @param {boolean} [ms=false] - If true, returns milliseconds instead of nanoseconds
	 * @returns {number} Time delta in nanoseconds or milliseconds
	 * @throws {Error} If timer has not been started or stopped
	 */
	diff(ms = false) {
		if (this.#started === BIG_INT_NEG_1) {
			throw new Error(NOT_STARTED);
		}

		if (this.#stopped === BIG_INT_NEG_1) {
			throw new Error(NOT_STOPPED);
		}

		const result = this.#delta;

		return ms ? Number(result / 1000000n) : Number(result);
	}

	/**
	 * Returns the elapsed time since start() without stopping the timer
	 * @param {boolean} [ms=false] - If true, returns milliseconds instead of nanoseconds
	 * @returns {number} Elapsed time in nanoseconds or milliseconds
	 * @throws {Error} If timer has not been started
	 */
	elapsed(ms = false) {
		if (this.#started === BIG_INT_NEG_1) {
			throw new Error(NOT_STARTED);
		}

		const now = hrtime.bigint();
		const delta = now - this.#started;

		return ms ? Number(delta / 1000000n) : Number(delta);
	}

	/**
	 * Returns a human-readable string of the elapsed time
	 * @param {boolean} [ms=false] - If true, includes milliseconds in output
	 * @returns {string} Formatted time string (e.g., "1h 2m 3s 456ms")
	 * @throws {Error} If timer has not been started
	 */
	format(ms = false) {
		if (this.#started === BIG_INT_NEG_1) {
			throw new Error(NOT_STARTED);
		}

		const elapsedNs =
			this.#stopped !== BIG_INT_NEG_1 ? this.#delta : hrtime.bigint() - this.#started;

		const elapsedMs = Number(elapsedNs / 1000000n);
		const seconds = Math.floor(elapsedMs / 1000);
		const minutes = Math.floor(seconds / 60);
		const hours = Math.floor(minutes / 60);

		const s = seconds % 60;
		const m = minutes % 60;
		const h = hours;

		const parts = [];
		if (h > 0) parts.push(`${h}h`);
		if (m > 0 || h > 0) parts.push(`${m}m`);
		if (s > 0 || m > 0 || h > 0) parts.push(`${s}s`);
		if (ms) parts.push(`${elapsedMs % 1000}ms`);

		return parts.length > 0 ? parts.join(" ") : "0ms";
	}

	/**
	 * Resets the timer to its initial state
	 * @returns {Precise} Returns this for chaining
	 */
	reset() {
		this.#started = BIG_INT_NEG_1;
		this.#stopped = BIG_INT_NEG_1;
		this.#delta = BIG_INT_NEG_1;

		return this;
	}

	/**
	 * Starts the timer
	 * @returns {Precise} Returns this for chaining
	 * @throws {Error} If timer has already been started
	 */
	start() {
		if (this.#started > BIG_INT_NEG_1) {
			throw new Error(STARTED);
		}

		this.#started = hrtime.bigint();

		return this;
	}

	/**
	 * Stops the timer
	 * @returns {Precise} Returns this for chaining
	 * @throws {Error} If timer has not been started or has already been stopped
	 */
	stop() {
		if (this.#started === BIG_INT_NEG_1) {
			throw new Error(NOT_STARTED);
		}

		if (this.#stopped > BIG_INT_NEG_1) {
			throw new Error(STOPPED);
		}

		this.#stopped = hrtime.bigint();
		this.#delta = this.#stopped - this.#started;

		return this;
	}
}

/**
 * Factory function that creates a new Precise timer instance
 * @returns {Precise} New Precise instance
 */
function precise() {
	return new Precise();
}export{Precise,precise};