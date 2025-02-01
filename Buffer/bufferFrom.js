const bufferArray = Buffer.from([12, 32, 42]);
console.log(bufferArray);

const alowcate = Buffer.alloc(100);
alowcate.write("hello");
console.log(alowcate.length);


const newBuf = alowcate.copy
console.log(newBuf.length);