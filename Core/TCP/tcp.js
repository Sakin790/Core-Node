import net from "net";

// Create a client instance
const client = net.createConnection({ port: 8080 }, () => {
  console.log('Connected to server');
  client.write('Hello from client');
});

// Handle incoming data from the server
client.on('data', (data) => {
  console.log('Received from server:', data.toString());
  client.end(); // Close the connection
});

// Handle client disconnection
client.on('end', () => {
  console.log('Disconnected from server');
});