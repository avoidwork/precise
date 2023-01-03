import * as assert from "assert";
import {precise} from "../dist/precise.esm.js";

describe("Testing starting state", function () {
	beforeEach(function () {
		this.timer = precise();
	});

	it("It should be empty", function () {
		assert.strictEqual(this.timer.started.length, 0, "Should be '0'");
		assert.equal(this.timer.stopped.length, 0, "Should be '0'");
	});

	it("It shouldn't be empty", function () {
		this.timer.start();
		assert.notEqual(this.timer.started.length, 0, "Shouldn't be '0'");
		assert.strictEqual(this.timer.stopped.length, 0, "Should be '0'");
		assert.throws(function () { this.timer.start(); }, Error, "Should be an 'Error'");
	});
});

describe("Testing stopping state", function () {
	beforeEach(function () {
		this.timer = precise();
	});

	it("It shouldn't be empty", function () {
		assert.throws(function () { this.timer.stop(); }, Error, "Should be an 'Error'");
		this.timer.start().stop();
		assert.notEqual(this.timer.started.length, 0, "Shouldn't be '0'");
		assert.notEqual(this.timer.started.length, 0, "Shouldn't be '0'");
		assert.throws(function () { this.timer.stop(); }, Error, "Should be an 'Error'");
	});
});

describe("Testing difference", function () {
	beforeEach(function () {
		this.timer = precise();
	});

	it("It should return an integer", function () {
		assert.throws(function () { this.timer.diff(); }, Error, "Should be an 'Error'");
		this.timer.start().stop();
		assert.equal(typeof this.timer.diff(), "number", "Should be 'number'");
		assert.equal(typeof this.timer.diff(true), "number", "Should be 'number'");
		assert.equal(this.timer.diff() > this.timer.diff(true), true, "Should be 'true'");
		assert.equal(parseInt(this.timer.diff() / 1e6, 10), this.timer.diff(true), "Should be 'true'");
	});
});
