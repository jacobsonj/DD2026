// server.mjs
import { createServer } from 'node:http';

const server = createServer((req, res) => {

    console.log(`Received request for ${req.url}`);

    function answerRequest(statusCode, message, response) {
        response.writeHead(statusCode, { 'Content-Type': 'text/plain' });
        response.end(message);
    }

    switch(req.url) {
        case '/':
            answerRequest(200, 'Welcome to the home page!\n', res);
            break;
        case '/about':
            answerRequest(200, 'This is the about page.\n', res);
            break;
        case '/contact':
            answerRequest(200, 'Contact us at example@example.com\n', res);
            break;
        case '/help':
            answerRequest(200, 'Help page: How can we assist you?\n', res);
            break;
        default:
            answerRequest(404, '404 Not Found\n', res);
            break;
    }

    // if(req.url === '/') {
    //     answerRequest(200, 'Welcome to the home page!\n', res);

    // }
    // else if(req.url === '/about') {
    //     answerRequest(200, 'This is the about page.\n', res);

    // }
    // else if(req.url === '/contact') {
    //     answerRequest(200, 'Contact us at example@example.com\n', res);
    // }
    // else if (req.url === '/help') {
    //     answerRequest(200, 'Help page: How can we assist you?\n', res);
    // }
    // else  {
    //     answerRequest(404, '404 Not Found\n', res);

    // }

    // res.writeHead(200, { 'Content-Type': 'text/plain' });
    // res.end('Hello World!\n');
});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});

// run with `node server.js`
// then visit http://127.0.0.1:3000
