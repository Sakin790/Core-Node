import fs from "fs";
import crypto from "crypto";

async function generateRandomTextFile(filePath, sizeInMB) {
  const sizeInBytes = sizeInMB * 1024 * 1024;
  const buffer = Buffer.alloc(sizeInBytes);

  // Fill the buffer with random data
  crypto.randomFillSync(buffer);

  // Convert buffer to a string (you can choose the encoding, here 'hex' is used for simplicity)
  const randomData = buffer.toString("hex");

  // Write the random data to a file
  await fs.promises.writeFile(filePath, randomData);

  console.log(`File ${filePath} created with size ${sizeInMB} MB`);
}

// Usage
generateRandomTextFile("index.txt", 10)
  .then(() => console.log("File created successfully"))
  .catch((err) => console.error("Error creating file:", err));
