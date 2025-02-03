import http2 from "http2";

// Create an HTTP/2 client session
const client = http2.connect("https://localhost:8443", {
  rejectUnauthorized: false, // For self-signed certificates
});

// Create a request
const req = client.request({ ":path": "/" });

// Handle the response
req.on("response", (headers, flags) => {
  console.log("Response headers:", headers);

  req.setEncoding("utf8");
  req.on("data", (chunk) => {
    console.log("Received:", chunk);
  });
  req.on("end", () => {
    console.log("Request ended");
    client.close();
  });
});

// End the request
req.end();
