import EventEmitter from "events";

// Step 1: Create a PubSub class that extends EventEmitter
class PubSub extends EventEmitter {
  // Step 2: Method to subscribe to an event
  subscribe(event, listener) {
    this.on(event, listener);
  }

  // Step 3: Method to publish an event
  publish(event, data) {
    this.emit(event, data);
  }
}

// Example usage:
const pubSub = new PubSub();

// Subscriber 1
pubSub.subscribe("message", (data) => {
  console.log(`Subscriber 1 received: ${data}`);
});

// Subscriber 2
pubSub.subscribe("message", (data) => {
  console.log(`Subscriber 2 received: ${data}`);
});

// Publishing the event
pubSub.publish("message", "Hello, World!");
pubSub.publish("message", "This is a PubSub system using Node.js events.");
