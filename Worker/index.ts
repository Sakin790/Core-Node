import express from "express";

const app = express();

app.get("/nonBlocking", (req, res) => {
  res.status(200).json({
    MSG: "THIS IS NON BLOCKING I/O",
  });
});
app.get("/blocking", (req, res) => {
  let result: number = 0;
  for (let i = 0; i < 10000000000; i++) {
    result++;
  }
  res.status(200).send("The Result is" + result);
});
app.listen(8000, () => {
  console.info("Ok");
});
