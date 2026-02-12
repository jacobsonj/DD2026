// index.js
import { createServer } from 'node:http';

const server = createServer((req, res) => {
    // console.log(req);
    console.log(req.url);
    console.log(req.method);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World!\n you are trying to access ' + req.url + ' with method ' + req.method);
});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000. Press Ctrl+C to stop the server.');
});

// run with `node index.js` and visit http://127.0.0.1:3000 in your browser to see the result
