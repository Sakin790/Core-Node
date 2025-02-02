import fs from "fs";
import zlib from "zlib";

// Create a readable stream from the compressed file
const readableStream = fs.createReadStream('input.txt.gz');

// Create a writable stream to the output file
const writableStream = fs.createWriteStream('output.txt');

// Create a gzip decompression stream
const gunzip = zlib.createGunzip();

// Pipe the streams together
readableStream.pipe(gunzip).pipe(writableStream);

writableStream.on('finish', () => {
  console.log('File successfully decompressed.');
});