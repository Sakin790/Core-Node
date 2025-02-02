import EventEmitter from "events";

class PubSub extends EventEmitter {
  subscribe(event, listener) {
    this.on(event, listener);
  }

  publish(event, data) {
    this.emit(event, data);
  }
}

// Create instance
const pubSub = new PubSub();

// Sample event handler
pubSub.subscribe("test", () => {});

// Benchmark
const iterations = 1000000;
console.time("PubSub Performance");

for (let i = 0; i < iterations; i++) {
  pubSub.publish("test", "Benchmark event");
}

console.timeEnd("PubSub Performance");
