import { promises as fs } from "fs";

async function checkFileSize(filePath) {
  try {
    const stats = await fs.stat(filePath);
    const fileSizeInBytes = stats.size;
    const fileSizeInMB = fileSizeInBytes / (1024 * 1024);

    if (fileSizeInMB > 1) {
      throw new Error(
        `File size is ${fileSizeInMB.toFixed(2)} MB, which is larger than 1 MB`
      );
    } else {
      console.log(
        `File size is ${fileSizeInMB.toFixed(2)} MB, which is within the limit`
      );
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

const filePath = "index.txt";
checkFileSize(filePath);
