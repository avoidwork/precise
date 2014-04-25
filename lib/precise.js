/**
 * Precision timer for nanosecond differences
 *
 * @author Jason Mulligan <jason.mulligan@avoidwork.com>
 * @copyright 2014 Jason Mulligan
 * @license BSD-3 <https://raw.github.com/avoidwork/precise/master/LICENSE>
 * @link http://avoidwork.github.io/precise
 * @module precise
 * @version 1.0.1
 */

( function () {

"use strict";

/**
 * Precise
 *
 * @constructor
 */
function Precise () {
	this.started = null;
	this.stopped = null;
}

/**
 * Returns the nanoseconds from `start()` to `stop()`
 *
 * @method diff
 * @return {Number} Nanoseconds from `start()` to `stop()`
 */
Precise.prototype.diff = function diff () {
	if ( this.stopped === null ) {
		throw new Error( "Timer has not been stopped" );
	}

	return this.stopped[0] * 1e9 + this.stopped[1];
};

/**
 * Starts a timer
 *
 * @method start
 * @return {Object} Precise instance
 */
Precise.prototype.start = function start () {
	if ( this.started !== null ) {
		throw new Error( "Timer has been started" );
	}

	this.started = process.hrtime();

	return this;
};

/**
 * Stops a timer
 *
 * @method stop
 * @return {Object} Precise instance
 */
Precise.prototype.stop = function stop () {
	if ( this.started === null ) {
		throw new Error( "Timer has not been started" );
	}
	else if ( this.stopped !== null ) {
		throw new Error( "Timer has been stopped" );
	}

	this.stopped = process.hrtime( this.started );

	return this;
};

/**
 * Precise factory
 *
 * @method factory
 * @return {Object} {@link Precise}
 */
function factory () {
	return new Precise();
}

module.exports = factory;
} )();
