# doge-json

Less verbose and more reliable JSON reading and writing.

```typescript
import * as J from 'doge-json';

J.encode(obj) => string
J.decode(string) => obj
J.read(file) => obj
J.write(file, obj)
```

_why less verbose?_

```typescript
import * as J from 'doge-json';

const a = { foo: 'bar' };

const b = J.encode(A);
// b is now a formatted JSON string

const c = J.decode(b);
// c is a new object, shaped { foo: 'bar' }
```

```typescript
// native JSON needn't be imported

const a = { foo: 'bar' };

const b = JSON.stringify(A, null, 4);
// b is now a formatted JSON string

const c = JSON.parse(b);
// c is a new object, shaped { foo: 'bar' }
```

_why more reliable?_

```javascript
const J = require('doge-json');

const a = typeof window === 'object' ? window : global;
// the global object

const b = J.encode(a);
// b is now a formatted JSON string

const c = J.decode(b);
// c is a new object, though much was lost due to the conversion
```

```javascript
// native JSON needn't be imported

const a = typeof window === 'object' ? window : global;
// the global object

const b = JSON.stringify(a);
// throws a TypeError: Converting circular structure to JSON

const c = JSON.parse(b);
// this line is never reached, there is no JSON to parse
```

### read/write files

```typescript
import * as J from 'doge-json';

const pkg = J.read('package.json');
pkg.description = 'My awesome package!';
J.write('package.json', pkg);
```
