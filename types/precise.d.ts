/**
 * High-precision timer using process.hrtime.bigint()
 */
export class Precise {
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
	 * Returns the elapsed time since start() without stopping the timer
	 * @param ms - If true, returns milliseconds instead of nanoseconds
	 * @returns Elapsed time in nanoseconds or milliseconds
	 * @throws Error if timer has not been started
	 */
	elapsed(ms?: boolean): number;

	/**
	 * Returns a human-readable string of the elapsed time
	 * @param ms - If true, includes milliseconds in output
	 * @param delta - Optional delta in nanoseconds (defaults to internal #delta)
	 * @returns Formatted time string (e.g., "1h 2m 3s 456ms")
	 * @throws Error if timer has not been started and delta not provided
	 */
	format(ms?: boolean, delta?: bigint): string;

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
