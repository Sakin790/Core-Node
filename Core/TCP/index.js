import net from "net";
//net use to create TCP Connection
const server = net.createServer((socket) => {
  console.log("Client connected!");

  socket.on("data", (data) => {
    console.log("Received:", data.toString());
    socket.write("Hello from server!");
  });

  socket.on("end", () => {
    console.log("Client disconnected!");
  });
});

server.listen(3000, () => {
  console.log("TCP server running on port 3000");
});

/**
Practical Use Cases
Chat applications: Real-time communication between clients.
Remote shell interfaces: Providing command-line access to remote systems.
Data streaming: Real-time data transfer between systems.
 */
