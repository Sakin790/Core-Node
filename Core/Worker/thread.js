// Import necessary modules
const { Worker, isMainThread, workerData, parentPort } = require('worker_threads');

// Function to create a worker
function createWorker() {
  return new Worker(__filename, {
    workerData: null
  });
}

// Main thread logic
if (isMainThread) {
  const numThreads = 4; // Number of worker threads to create
  const workers = [];

  for (let i = 0; i < numThreads; i++) {
    const worker = createWorker();
    workers.push(worker);
    console.log(`Worker ${i + 1} created with thread ID: ${worker.threadId}`);
  }

  // Listen for messages from workers
  workers.forEach(worker => {
    worker.on('message', (msg) => {
      console.log(`Message from worker ${worker.threadId}: ${msg}`);
    });

    worker.on('exit', (code) => {
      console.log(`Worker ${worker.threadId} exited with code: ${code}`);
    });
  });
} else {
  // Worker thread logic
  console.log(`Worker thread ID: ${threadId} is running`);
  parentPort.postMessage(`Hello from worker ${threadId}`);
}