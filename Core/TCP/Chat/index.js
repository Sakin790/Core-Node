import net from "node:net";

const server = net.createServer((socket) => {

    console.info("Client connected to the TCP Server");
});

server.listen(1337,() => {
    console.info("TCP Server is running on port 1337");
})