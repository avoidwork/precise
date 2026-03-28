/**
 * High-precision timer using process.hrtime.bigint()
 */
export class Precise {
	/**
	 * Nanosecond timestamp when started, or -1n if not started
	 */
	started: bigint;

	/**
	 * Nanosecond timestamp when stopped, or -1n if not stopped
	 */
	stopped: bigint;

	/**
	 * Creates a new Precise timer instance
	 */
	constructor();

	/**
	 * Returns the time delta between start() and stop()
	 * @param ms - If true, returns milliseconds instead of nanoseconds
	 * @returns Time delta in nanoseconds or milliseconds
	 * @throws Error if timer has not been started or stopped
	 */
	diff(ms?: boolean): number;

	/**
	 * Resets the timer to its initial state
	 * @returns this for chaining
	 */
	reset(): this;

	/**
	 * Starts the timer
	 * @returns this for chaining
	 * @throws Error if timer has already been started
	 */
	start(): this;

	/**
	 * Stops the timer
	 * @returns this for chaining
	 * @throws Error if timer has not been started or has already been stopped
	 */
	stop(): this;
}

/**
 * Factory function that creates a new Precise timer instance
 * @returns New Precise instance
 */
export function precise(): Precise;
