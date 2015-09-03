/**
 * Precision timer for nanosecond differences
 *
 * @author Jason Mulligan <jason.mulligan@avoidwork.com>
 * @copyright 2015 Jason Mulligan <jason.mulligan@avoidwork.com>
 * @license BSD-3-Clause
 */

"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var hasStarted = "Timer has been started";
var hasStopped = "Timer has been stopped";
var notStarted = "Timer has not been started";
var notStopped = "Timer has not been stopped";

var Precise = (function () {
	function Precise() {
		_classCallCheck(this, Precise);

		this.started = [];
		this.stopped = [];
	}

	_createClass(Precise, [{
		key: "diff",
		value: function diff() {
			if (this.stopped.length === 0) {
				throw new Error(notStopped);
			}

			return this.stopped[0] * 1e9 + this.stopped[1];
		}
	}, {
		key: "start",
		value: function start() {
			if (this.started.length > 0) {
				throw new Error(hasStarted);
			}

			this.started = process.hrtime();

			return this;
		}
	}, {
		key: "stop",
		value: function stop() {
			if (this.started.length === 0) {
				throw new Error(notStarted);
			}

			if (this.stopped.length > 0) {
				throw new Error(hasStopped);
			}

			this.stopped = process.hrtime(this.started);

			return this;
		}
	}]);

	return Precise;
})();

function factory() {
	return new Precise();
}

module.exports = factory;
