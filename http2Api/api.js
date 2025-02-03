const http2 = require('http2');
const fs = require('fs');

// Read SSL certificate and key
const serverOptions = {
  key: fs.readFileSync('server-key.pem'),
  cert: fs.readFileSync('server-cert.pem')
};

// Create an HTTP/2 server
const server = http2.createSecureServer(serverOptions);

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

// Listen on port 8443
server.listen(8443, () => {
  console.log('HTTP/2 server running at https://localhost:8443/');
});