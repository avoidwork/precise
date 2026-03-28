# precise

Nanosecond timer for node.js

## Using the factory

```javascript
import {precise} from "precise";
const timer = precise().start();
setTimeout(() => console.log(timer.stop().diff()), 1000);
```

## Using the Class

```javascript
import {Precise} from "precise";
const timer = new Precise().start();
setTimeout(() => console.log(timer.stop().diff()), 1000);
```

```javascript
import {Precise} from "precise";
class MyTimer extends Precise {}
```

## Testing

Precise has 100% code coverage with its tests.

```console
ℹ start of coverage report
ℹ ----------------------------------------------------------
ℹ file      | line % | branch % | funcs % | uncovered lines
ℹ ----------------------------------------------------------
ℹ ----------------------------------------------------------
ℹ all files | 100.00 |   100.00 |  100.00 | 
ℹ ----------------------------------------------------------
ℹ end of coverage report
```

## API

### diff(ms = false)

Returns the time delta between `start()` & `stop()`; setting optional parameter to `true` will return the delta as milliseconds

### elapsed(ms = false)

Returns the elapsed time since `start()` without stopping the timer

### format(ms = false, delta)

Returns a human-readable string of the elapsed time. Optional `delta` parameter allows formatting a custom nanosecond value.

### reset()

Reset a timer

### start()

Starts a timer

### stop()

Stops a timer

## License

Copyright (c) 2026 Jason Mulligan
Licensed under the BSD-3 license
