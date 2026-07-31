import EventEmitter from "events";

const eventEmitter = new EventEmitter();

eventEmitter.on("Welcome", (msg) => {
  console.log(`Welcome ${msg}`);
});
eventEmitter.on("greet", (name) => {
  console.log(`greet ${name}`);
});

eventEmitter.emit("Welcome", "sakin");
