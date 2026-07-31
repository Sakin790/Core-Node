const buf = Buffer.alloc(10);
console.log(buf); //<Buffer 00 00 00 00 00 00 00 00 00 00>

const buf2 = Buffer.allocUnsafe(10).fill(0);
console.log(buf2);

const bufferFromDate = Buffer.from("Hello");
console.log(bufferFromDate); //<Buffer 48 65 6c 6c 6f>
console.log(bufferFromDate.toString());//Hello


/**
 * 
 * buf.length: Returns the length of the buffer.
buf.copy: Copies data from one buffer to another.
buf.slice: Returns a new buffer that references the same memory as the original buffer.
buf.toString: Decodes the buffer into a string using a specified encoding.
 */