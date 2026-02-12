// server.mjs
import { createServer } from 'node:http';

const server = createServer((req, res) => {

    console.log(`Received request for ${req.url}`);

    //create an array of objects to store our apps content

    const content = [
        { 
            title: "Welcomme to the home page!",
            body:  "Welcome Lorem ipsum dolor sit amet consectetur adipisicing elit. Non veniam facilis ratione quos molestias in aliquid iusto modi recusandae facere, unde, temporibus labore optio blanditiis.",
            url: "/"
        },
        {
            title: "Welcome the about page.",
            body:  "About Us Lorem ipsum dolor sit amet consectetur adipisicing elit. Non veniam facilis ratione quos molestias in aliquid iusto modi recusandae facere, unde, temporibus labore optio blanditiis.",
            url: "/about"
        },
        {
            title: "Welcome to the contact page",
            body:  "Contact Lorem ipsum dolor sit amet consectetur adipisicing elit. Non veniam facilis ratione quos molestias in aliquid iusto modi recusandae facere, unde, temporibus labore optio blanditiis.",
            url: "/contact"
        },
        {
            title: "Welcome to the help page",
            body:  "Help page: How can we assist you?",
            url: "/help"
        }
    ];

    const notFound = 
    {
        title: "404 Not Found", 
        body: "The requested page was not found."
    };


    function answerRequest(statusCode, contentObj, response) {

        let template = 
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <title>${contentObj.title}</title>
        </head>
        <body>
            <!-- Navigation -->
            <ul>
                <li>  <a href="/">Home</a>  </li>
                <li>  <a href="/about">About Us</a>  </li>
                <li>  <a href="/contact">Contact</a>  </li>
                <li>  <a href="/help">Support</a>  </li>
                <li>  <a href="/catalog">Catalog</a>  </li>
            </ul>
            
            <H1>${contentObj.title}</H1>

            <p>
                ${contentObj.body}
            </p>
        </body>
        </html>`;

        response.writeHead(statusCode, { 'Content-Type': 'text/html' });
        response.end(template);
    }

    const page = content.find(element => element.url === req.url);

    if (page) {
        answerRequest(200, page, res); 
    }
    else {
        answerRequest(404, notFound, res);
    }


    // switch(req.url) {
    //         case '/':
    //             answerRequest(200, page, res);
    //             break;
    //         case '/about':
    //             answerRequest(200, content.find(element => element.url === '/about'), res);
    //             break;
    //         case '/contact':
    //             answerRequest(200, content.find(element => element.url === '/contact'), res);
    //             break;
    //         case '/help':
    //             answerRequest(200, content.find(element => element.url === '/help'), res);
    //             break;
    //         default:
    //             answerRequest(404, '404 Not Found\n', res);
    //             break;
    //     }

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
  console.log('Listening on http://127.0.0.1:3000 to close use ctrl + c');
});

// run with `node server.js`
// then visit http://127.0.0.1:3000
