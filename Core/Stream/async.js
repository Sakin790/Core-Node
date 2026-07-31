const fs = require('fs');
const zlib = require('zlib');
const { promisify } = require('util');

// Promisify the necessary methods
const pipeline = promisify(require('stream').pipeline);

// Function to decompress a file asynchronously
async function decompressFile(inputPath, outputPath) {
  try {
    // Create a readable stream from the compressed file
    const readableStream = fs.createReadStream(inputPath);
    
    // Create a writable stream to the output file
    const writableStream = fs.createWriteStream(outputPath);
    
    // Create a gzip decompression stream
    const gunzip = zlib.createGunzip();
    
    // Use the promisified pipeline to pipe the streams together
    await pipeline(readableStream, gunzip, writableStream);
    
    console.log('File successfully decompressed.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Example usage
const inputPath = 'input.txt.gz';
const outputPath = 'output.txt';
decompressFile(inputPath, outputPath);