const hasStarted = "Timer has been started";
const hasStopped = "Timer has been stopped";
const notStarted = "Timer has not been started";
const notStopped = "Timer has not been stopped";

class Precise {
	constructor () {
		this.started = [];
		this.stopped = [];
	}

	diff () {
		if (this.stopped.length === 0) {
			throw new Error(notStopped);
		}

		return this.stopped[0] * 1e9 + this.stopped[1];
	}

	start () {
		if (this.started.length > 0) {
			throw new Error(hasStarted);
		}

		this.started = process.hrtime();

		return this;
	}

	stop () {
		if (this.started.length === 0) {
			throw new Error(notStarted);
		}

		if (this.stopped.length > 0) {
			throw new Error(hasStopped);
		}

		this.stopped = process.hrtime(this.started);

		return this;
	}
}

function factory () {
	return new Precise();
}

module.exports = factory;
