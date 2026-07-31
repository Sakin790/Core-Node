import fs from "fs";
import zlib from "zlib";

const readableStream = fs.createReadStream("input.txt");
const writableStream = fs.createWriteStream('input.txt.gz');
const gzip = zlib.createGzip();
readableStream.pipe(gzip).pipe(writableStream);
writableStream.on('finish', () => {
  console.log('File successfully compressed.');
});