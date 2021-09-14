# teeworlds-server-status

Typescript:
```ts
import { ServerHandler } from "teeworlds-server-status";

const server = new ServerHandler("0.0.0.0", 8303, false);

server.requestInfo().then(data => {
  // tslint:disable-next-line:no-console
  console.log(data);
});
```

Javascript:

```js
const tw = require("teeworlds-server-status");

const server = new tw.ServerHandler("95.172.92.151", 8303, false);

server.requestInfo().then(data => {
  // tslint:disable-next-line:no-console
  console.log(data);
});

```
