# precise
Nanosecond timer for node.js

## API
### start()
Starts a timer

### stop()
Stops a timer

### diff(ms = false)
Returns the time delta between `start()` & `stop()`; setting optional parameter to `true` will return the delta as milliseconds

## Example
```javascript
import {precise} from "precise";
const timer = precise().start();
setTimeout(() => console.log(timer.stop().diff()), 1000);
```

## License
Copyright (c) 2022 Jason Mulligan
Licensed under the BSD-3 license
