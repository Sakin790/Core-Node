import http from 'http';
import url from 'url';
import { StringDecoder } from 'string_decoder';

const server = http.createServer((req, res) => {
    // Parse the URL
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const headers = req.headers;

    // Get payload, if any
    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data', (chunk) => {
        buffer += chunk;
    });

    req.on('end', () => {
        buffer += decoder.end();

        // Choose the handler this request should go to
        const chosenHandler = router[path] || handlers.notFound;

        // Construct the data object to send to the handler
        const data = {
            path,
            queryStringObject,
            method,
            headers,
            payload: buffer
        };

        // Route the request to the handler
        chosenHandler(data, (statusCode = 200, payload = {}) => {
            const payloadString = JSON.stringify(payload);

            // Return the response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);

            // Log the request path
            console.log(`Returning response: ${statusCode}, ${payloadString}`);
        });
    });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

// Define the handlers
const handlers = {};

handlers.hello = (data, callback) => {
    const response = {
        message: 'Hello, welcome to our API!'
    };
    callback(200, response);
};

handlers.notFound = (data, callback) => {
    callback(404, { message: 'Not Found' });
};

// Define the request router
const router = {
    'hello': handlers.hello
};