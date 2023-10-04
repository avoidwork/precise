import assert from "node:assert";
import {precise} from "../dist/precise.cjs";
import {BIG_INT_NEG_1} from "../src/constants.js";

describe("Testing starting state", function () {
	beforeEach(function () {
		this.timer = precise();
	});

	it("It should be empty", function () {
		assert.strictEqual(this.timer.started, BIG_INT_NEG_1, "Should be '-1n'");
		assert.strictEqual(this.timer.stopped, BIG_INT_NEG_1, "Should be '-1n'");
	});

	it("It shouldn't be empty", function () {
		const timer = this.timer.start();
		assert.notEqual(this.timer.started, BIG_INT_NEG_1, "Shouldn't be '-1n'");
		assert.strictEqual(this.timer.stopped, BIG_INT_NEG_1, "Should be '-1n'");
		assert.throws(function () { timer.start(); }, Error, "Should be an 'Error'");
	});
});

describe("Testing stopping state", function () {
	beforeEach(function () {
		this.timer = precise();
	});

	it("It shouldn't be empty", function () {
		const timer = this.timer;
		assert.throws(function () { timer.diff(); }, Error, "Should be an 'Error'");
		assert.throws(function () { timer.stop(); }, Error, "Should be an 'Error'");
		this.timer.start().stop();
		assert.notEqual(this.timer.started, BIG_INT_NEG_1, "Shouldn't be '-1n'");
		assert.notEqual(this.timer.started, BIG_INT_NEG_1, "Shouldn't be '-1n'");
		assert.throws(function () { timer.stop(); }, Error, "Should be an 'Error'");
	});
});

describe("Testing difference", function () {
	beforeEach(function () {
		this.timer = precise();
	});

	it("It should return an integer", function () {
		const timer = this.timer;
		assert.throws(function () { timer.diff(); }, Error, "Should be an 'Error'");
		assert.throws(function () { timer.diff(); }, Error, "Should be an 'Error'");
		this.timer.start().stop();
		assert.strictEqual(typeof this.timer.diff(), "number", "Should be 'number'");
		assert.strictEqual(typeof this.timer.diff(true), "number", "Should be 'number'");
		assert.strictEqual(this.timer.diff() > this.timer.diff(true), true, "Should be 'true'");
		assert.strictEqual(parseInt(this.timer.diff() / 1e6, 10), this.timer.diff(true), "Should be 'true'");
	});

	it("It should have different values when started & stopped at different times", function (done) {
		this.timer.start();
		setTimeout(() => {
			this.timer.stop();
			assert.strictEqual(this.timer.stopped > this.timer.started, true, "Should be 'true'");
			done();
		}, 250);
	});
});
