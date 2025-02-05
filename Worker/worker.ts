import { parentPort } from "worker_threads";

let result: number = 0;
for (let i = 0; i < 10000000000; i++) {
  result++;
}

parentPort?.postMessage(result);
