import assert from "node:assert";
import { test, beforeEach } from "node:test";
import { precise } from "../dist/precise.cjs";
import { BIG_INT_NEG_1 } from "../src/constants.js";

beforeEach(function () {
	this.timer = precise();
});

test("Testing starting state - It should be empty", function () {
	assert.strictEqual(this.timer.started, BIG_INT_NEG_1, "Should be '-1n'");
	assert.strictEqual(this.timer.stopped, BIG_INT_NEG_1, "Should be '-1n'");
});

test("Testing starting state - It shouldn't be empty", function () {
	const timer = this.timer.start();
	assert.notEqual(this.timer.started, BIG_INT_NEG_1, "Shouldn't be '-1n'");
	assert.strictEqual(this.timer.stopped, BIG_INT_NEG_1, "Should be '-1n'");
	assert.throws(
		function () {
			timer.start();
		},
		Error,
		"Should be an 'Error'",
	);
});

test("Testing stopping state - It shouldn't be empty", function () {
	const timer = this.timer;
	assert.throws(
		function () {
			timer.diff();
		},
		Error,
		"Should be an 'Error'",
	);
	assert.throws(
		function () {
			timer.stop();
		},
		Error,
		"Should be an 'Error'",
	);
	this.timer.start();
	assert.throws(
		function () {
			timer.diff();
		},
		Error,
		"Should be an 'Error'",
	);
	this.timer.stop();
	assert.notEqual(this.timer.started, BIG_INT_NEG_1, "Shouldn't be '-1n'");
	assert.notEqual(this.timer.started, BIG_INT_NEG_1, "Shouldn't be '-1n'");
	assert.throws(
		function () {
			timer.stop();
		},
		Error,
		"Should be an 'Error'",
	);
});

test("Testing difference - It should return an integer", function () {
	const timer = this.timer;
	assert.throws(
		function () {
			timer.diff();
		},
		Error,
		"Should be an 'Error'",
	);
	assert.throws(
		function () {
			timer.diff();
		},
		Error,
		"Should be an 'Error'",
	);
	this.timer.start().stop();
	assert.strictEqual(typeof this.timer.diff(), "number", "Should be 'number'");
	assert.strictEqual(typeof this.timer.diff(true), "number", "Should be 'number'");
	assert.strictEqual(this.timer.diff() > this.timer.diff(true), true, "Should be 'true'");
	assert.strictEqual(
		parseInt(this.timer.diff() / 1e6, 10),
		this.timer.diff(true),
		"Should be 'true'",
	);
});

test("Testing difference - It should have different values when started & stopped at different times", async function () {
	this.timer.start();
	await new Promise((resolve) => setTimeout(resolve, 250));
	this.timer.stop();
	assert.strictEqual(this.timer.stopped > this.timer.started, true, "Should be 'true'");
});

test("Testing chaining - It should be chainable", function () {
	const timer = this.timer;
	assert.strictEqual(timer.start(), timer, "Should be 'timer'");
	assert.strictEqual(timer.stop(), timer, "Should be 'timer'");
});

test("Testing invalid states - It should throw an error", function () {
	const timer = this.timer;
	assert.throws(
		function () {
			timer.stop();
		},
		Error,
		"Should be an 'Error'",
	);
	assert.throws(
		function () {
			timer.diff();
		},
		Error,
		"Should be an 'Error'",
	);
	this.timer.start();
	assert.throws(
		function () {
			timer.start();
		},
		Error,
		"Should be an 'Error'",
	);
	this.timer.stop();
	assert.throws(
		function () {
			timer.stop();
		},
		Error,
		"Should be an 'Error'",
	);
});

test("Testing precision - It should be precise", async function () {
	const timer = this.timer;
	timer.start();
	await new Promise((resolve) => setTimeout(resolve, 250));
	timer.stop();
	assert.strictEqual(timer.diff() > 0, true, "Should be 'true'");
	assert.strictEqual(timer.diff(true) > 0, true, "Should be 'true'");
});

test("Testing reset - It should reset", function () {
	const timer = this.timer;
	assert.strictEqual(timer.start(), timer, "Should be 'timer'");
	assert.strictEqual(timer.stop(), timer, "Should be 'timer'");
	assert.strictEqual(timer.reset(), timer, "Should be 'timer'");
	assert.strictEqual(timer.started, BIG_INT_NEG_1, "Should be '-1n'");
	assert.strictEqual(timer.stopped, BIG_INT_NEG_1, "Should be '-1n'");
});
