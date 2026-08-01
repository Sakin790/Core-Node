import http, { IncomingMessage, ServerResponse } from 'node:http';
import FindMyWay from 'find-my-way';

const router = FindMyWay({
  defaultRoute: (req: IncomingMessage, res: ServerResponse) => {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: false, message: 'Route not found' }));
  }
});

// ১. Body Parser-এ Type Annotation
const parseBody = <T>(req: IncomingMessage): Promise<T> => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk: Buffer) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : ({} as T));
      } catch (err) {
        reject(err);
      }
    });

    req.on('error', (err: Error) => reject(err));
  });
};

// Interface definations
interface User {
  id: string;
  name: string;
  role: string;
}

interface CreateUserBody {
  name: string;
  role: string;
}

const users: User[] = [
  { id: '1', name: 'Sakin', role: 'Developer' },
  { id: '2', name: 'John', role: 'Designer' }
];

// --- ROUTES ---

// GET /api/users/:id
router.get('/api/users/:id', (req: IncomingMessage, res: ServerResponse, params) => {
  // params-এর টাইপ find-my-way অটোমেটিক হ্যান্ডেল করে (params.id)
  const userId = params.id;
  const user = users.find((u) => u.id === userId);

  if (!user) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ success: false, message: 'User not found' }));
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ success: true, data: user }));
});

// POST /api/users
router.post('/api/users', async (req: IncomingMessage, res: ServerResponse) => {
  try {
    // Generics দিয়ে parseBody-র রিটার্ন টাইপ ঠিক করা
    const body = await parseBody<CreateUserBody>(req);

    if (!body.name || !body.role) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ success: false, message: 'Name and role are required' }));
    }

    const newUser: User = {
      id: String(users.length + 1),
      name: body.name,
      role: body.role
    };

    users.push(newUser);

    res.statusCode = 201;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: true, data: newUser }));
  } catch (error) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: false, message: 'Invalid JSON Body' }));
  }
});

// HTTP Server
const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  router.lookup(req, res);
});

server.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});