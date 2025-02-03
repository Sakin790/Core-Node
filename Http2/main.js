const http2 = require('http2');
const fs = require('fs');

// Read SSL certificate and key
const serverOptions = {
  key: fs.readFileSync('server-key.pem'),
  cert: fs.readFileSync('server-cert.pem')
};

// Create an HTTP/2 server
const server = http2.createSecureServer(serverOptions, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, HTTP/2!\n');
});

// Listen on port 8443
server.listen(8443, () => {
  console.log('HTTP/2 server running at https://localhost:8443/');
});