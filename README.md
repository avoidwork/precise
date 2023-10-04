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
-------------|---------|----------|---------|---------|-------------------
File         | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------|---------|----------|---------|---------|-------------------
All files    |     100 |      100 |     100 |     100 |                  
 precise.cjs |     100 |      100 |     100 |     100 |                  
-------------|---------|----------|---------|---------|-------------------
```

## API

### diff(ms = false)

Returns the time delta between `start()` & `stop()`; setting optional parameter to `true` will return the delta as milliseconds

### reset()

Reset a timer

### start()

Starts a timer

### stop()

Stops a timer

## License

Copyright (c) 2023 Jason Mulligan
Licensed under the BSD-3 license
