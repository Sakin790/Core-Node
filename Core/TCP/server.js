import net from "node:net"

const server = net.createServer((socket) => {
  console.log('Client connected');
});