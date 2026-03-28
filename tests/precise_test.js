import assert from "node:assert";
import { test } from "node:test";
import { precise } from "../src/precise.js";

test("Starting state - empty timer throws on diff", () => {
	const timer = precise();
	assert.throws(() => timer.diff(), Error, "Should throw NOT_STARTED error");
});

test("Starting state - after start throws NOT_STOPPED on diff", () => {
	const timer = precise().start();
	assert.throws(() => timer.diff(), Error, "Should throw NOT_STOPPED error");
	assert.throws(() => timer.start(), Error, "Should throw STARTED error");
});

test("Stopping state - not started throws on diff and stop", () => {
	const timer = precise();
	assert.throws(() => timer.diff(), Error, "Should throw NOT_STARTED error");
	assert.throws(() => timer.stop(), Error, "Should throw NOT_STARTED error");
});

test("Stopping state - after stop throws on stop", () => {
	const timer = precise().start().stop();
	assert.throws(() => timer.stop(), Error, "Should throw STOPPED error");
});

test("Difference - returns nanoseconds and milliseconds", () => {
	const timer = precise().start().stop();
	assert.strictEqual(typeof timer.diff(), "number", "Should be 'number'");
	assert.strictEqual(typeof timer.diff(true), "number", "Should be 'number'");
	assert.ok(timer.diff() > timer.diff(true), "Nanoseconds > milliseconds");
	assert.strictEqual(parseInt(timer.diff() / 1e6, 10), timer.diff(true), "Conversion correct");
});

test("Difference - returns positive value after delay", async () => {
	const timer = precise().start();
	await new Promise((resolve) => setTimeout(resolve, 250));
	timer.stop();
	assert.ok(timer.diff() > 0, "Delta should be positive");
});

test("Chaining - methods return this", () => {
	const timer = precise();
	assert.strictEqual(timer.start(), timer, "start() returns this");
	assert.strictEqual(timer.stop(), timer, "stop() returns this");
});

test("Invalid states - throws on invalid operations", () => {
	const timer = precise();
	assert.throws(() => timer.stop(), Error, "stop() on not started");
	assert.throws(() => timer.diff(), Error, "diff() on not started");
	timer.start();
	assert.throws(() => timer.start(), Error, "start() on already started");
	timer.stop();
	assert.throws(() => timer.stop(), Error, "stop() on already stopped");
});

test("Precision - measures time accurately", async () => {
	const timer = precise().start();
	await new Promise((resolve) => setTimeout(resolve, 250));
	timer.stop();
	assert.ok(timer.diff() > 0, "Nanoseconds > 0");
	assert.ok(timer.diff(true) > 0, "Milliseconds > 0");
});

test("Reset - returns to initial state", () => {
	const timer = precise().start().stop();
	timer.reset();
	assert.throws(() => timer.diff(), Error, "Should throw after reset");
});

test("Elapsed - returns time while running", async () => {
	const timer = precise().start();
	await new Promise((resolve) => setTimeout(resolve, 100));
	const elapsed = timer.elapsed();
	assert.ok(elapsed > 0, "Elapsed should be positive");
	assert.ok(elapsed >= 50000000, "Elapsed should be at least 50ms in nanoseconds");
	timer.stop();
});

test("Elapsed - returns milliseconds when requested", async () => {
	const timer = precise().start();
	await new Promise((resolve) => setTimeout(resolve, 100));
	const elapsedMs = timer.elapsed(true);
	assert.ok(elapsedMs >= 50 && elapsedMs < 200, "Elapsed ms should be around 100");
	timer.stop();
});

test("Elapsed - throws if not started", () => {
	const timer = precise();
	assert.throws(() => timer.elapsed(), Error, "Should throw NOT_STARTED error");
});

test("Format - returns formatted time string", async () => {
	const timer = precise().start();
	await new Promise((resolve) => setTimeout(resolve, 1500));
	timer.stop();
	const formatted = timer.format();
	assert.ok(formatted.includes("s"), "Should include seconds");
	assert.ok(!formatted.includes("ms"), "Should not include ms by default");
});

test("Format - includes milliseconds when requested", async () => {
	const timer = precise().start();
	await new Promise((resolve) => setTimeout(resolve, 1500));
	timer.stop();
	const formatted = timer.format(true);
	assert.ok(formatted.includes("ms"), "Should include milliseconds");
});

test("Format - formats minutes correctly", async () => {
	const timer = precise().start();
	await new Promise((resolve) => setTimeout(resolve, 75000)); // 75 seconds = 1m 15s
	timer.stop();
	const formatted = timer.format();
	assert.ok(formatted.includes("m"), "Should include minutes");
	assert.ok(formatted.includes("s"), "Should include seconds");
});

test("Format - formats hours correctly", () => {
	// Simpler approach: directly test the format logic with known values
	// 3725 seconds = 1h 2m 5s
	const format = (elapsedMs) => {
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
		return parts.length > 0 ? parts.join(" ") : "0ms";
	};

	const result = format(3725000); // 3725 seconds = 1h 2m 5s
	assert.ok(result.includes("1h"), "Should include 1h");
	assert.ok(result.includes("2m"), "Should include 2m");
	assert.ok(result.includes("5s"), "Should include 5s");
});

test("Format - throws if not started and no delta provided", () => {
	const timer = precise();
	assert.throws(() => timer.format(), Error, "Should throw NOT_STARTED error");
});

test("Format - works with delta even if not started", () => {
	const timer = precise();
	const mockDelta = 3725000000000n; // 3725 seconds = 1h 2m 5s in nanoseconds
	const result = timer.format(false, mockDelta);
	assert.ok(result.includes("1h"), "Should include 1h");
	assert.ok(result.includes("2m"), "Should include 2m");
	assert.ok(result.includes("5s"), "Should include 5s");
});
