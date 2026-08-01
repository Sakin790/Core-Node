import { AppService } from '../services/app.service.js';

export class AppController {
  // req, res-এর ওপর টাইপ ইনফার হতে দিলে কোনো Mismatch Error হবে না
  static getStatus = (req: any, res: any) => {
    try {
      const data = AppService.getSystemStatus();

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: true, data }));
    } catch (error) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: false, message: 'Internal Server Error' }));
    }
  };
}