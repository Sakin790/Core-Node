import FindMyWay from 'find-my-way';
import { AppController } from '../controllers/app.controller.js';

// find-my-way এর রিটার্ন টাইপ সরাসরি নেওয়া হলো
type RouterInstance = ReturnType<typeof FindMyWay>;

export const registerAppRoutes = (router: RouterInstance) => {
  router.get('/api/status', AppController.getStatus);
};