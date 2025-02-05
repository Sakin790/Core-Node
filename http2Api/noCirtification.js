const http2 = require('http2');

// Middleware to parse JSON bodies
const parseJsonBody = (req, callback) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    try {
      const parsed = JSON.parse(body);
      callback(null, parsed);
    } catch (err) {
      callback(err);
    }
  });
};

// Routes and handlers
const routes = {
  GET: {
    '/': (req, res) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Welcome to the HTTP/2 REST API!' }));
    },
    '/items': (req, res) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ items: ['item1', 'item2'] }));
    }
  },
  POST: {
    '/items': (req, res) => {
      parseJsonBody(req, (err, body) => {
        if (err) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid JSON' }));
        } else {
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Item created', item: body }));
        }
      });
    }
  }
};

// Create an unencrypted HTTP/2 server
const server = http2.createServer();

// Handle incoming requests
server.on('stream', (stream, headers) => {
  const method = headers[':method'];
  const path = headers[':path'];

  if (routes[method] && routes[method][path]) {
    routes[method][path](stream, headers);
  } else {
    stream.respond({ ':status': 404 });
    stream.end('Not Found');
  }
});




// Listen on port 8080
server.listen(8080, () => {
  console.log('HTTP/2 server running at http://localhost:8080/');
});