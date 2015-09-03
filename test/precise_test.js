var precise = require("../lib/precise");

exports["start"] = {
	setUp: function (done) {
		this.timer = precise();
		done();
	},
	tests: function (test) {
		test.expect(5);
		test.strictEqual(this.timer.started.length, 0, "Should be '0'");
		test.strictEqual(this.timer.stopped.length, 0, "Should be '0'");
		this.timer.start();
		test.notEqual(this.timer.started.length, 0, "Shouldn't be '0'");
		test.strictEqual(this.timer.stopped.length, 0, "Should be '0'");
		test.throws(function () { this.timer.start(); }, Error, "Should be an 'Error'");
		test.done();
	}
};

exports["stop"] = {
	setUp: function (done) {
		this.timer = precise();
		done();
	},
	tests: function (test) {
		test.expect(4);
		test.throws(function () { this.timer.stop(); }, Error, "Should be an 'Error'");
		this.timer.start().stop();
		test.notEqual(this.timer.started.length, 0, "Shouldn't be '0'");
		test.notEqual(this.timer.started.length, 0, "Shouldn't be '0'");
		test.throws(function () { this.timer.stop(); }, Error, "Should be an 'Error'");
		test.done();
	}
};

exports["diff"] = {
	setUp: function (done) {
		this.timer = precise();
		done();
	},
	tests: function (test) {
		test.expect(2);
		test.throws(function () { this.timer.diff(); }, Error, "Should be an 'Error'");
		this.timer.start().stop();
		test.equal(typeof this.timer.diff(), "number", "Shouldn't be 'number'");
		test.done();
	}
};
