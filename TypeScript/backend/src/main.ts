import http from 'node:http';
import FindMyWay from 'find-my-way';
import { registerAppRoutes } from './routes/app.routes.js';

const router = FindMyWay({
  // কোনো রাউট না মিললে (404 Not Found Handler)
  defaultRoute: (req, res) => {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        success: false,
        message: 'Route not found',
      })
    );
  },
});






registerAppRoutes(router);

const server = http.createServer((req, res) => {
  router.lookup(req, res);
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📌 Test Endpoint: http://localhost:${PORT}/api/status`);
});