# precise
Nanosecond timer for node.js

[![build status](https://secure.travis-ci.org/avoidwork/precise.png)](http://travis-ci.org/avoidwork/precise)

## API
### start()
Starts a timer

### stop()
Stops a timer

### diff()
Returns the nanoseconds between `start()` & `stop()`

## Example
```
var precise = require('precise'),
    timer   = precise().start();

setTimeout(function () {
	console.log(timer.stop().diff());
}, 1000);
```
