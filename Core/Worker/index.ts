import express from "express";
import { Worker } from "worker_threads";

const app = express();

app.get("/nonBlocking", (req, res) => {
  res.status(200).json({
    MSG: "THIS IS NON BLOCKING I/O",
  });
});
app.get("/blocking", (req, res) => {
  const worker = new Worker("./worker.ts");

  worker.on("message", (result) => {
    res.status(200).send("The Result is" + result);
  });
  worker.on("error", (error) => {
    res.status(400).send("The error is" + error);
  });
});
app.listen(8000, () => {
  console.info("Ok");
});
